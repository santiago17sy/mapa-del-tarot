CREATE TYPE public.app_role AS ENUM ('user','admin');

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users ON DELETE CASCADE,
  name TEXT NOT NULL DEFAULT '',
  email TEXT NOT NULL DEFAULT '',
  role public.app_role NOT NULL DEFAULT 'user',
  access_active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.profiles WHERE id = _user_id AND role = _role);
$$;

CREATE POLICY "profiles_select_own" ON public.profiles FOR SELECT TO authenticated USING (id = auth.uid());
CREATE POLICY "profiles_select_admin" ON public.profiles FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "profiles_update_own" ON public.profiles FOR UPDATE TO authenticated USING (id = auth.uid()) WITH CHECK (id = auth.uid() AND role = 'user');
CREATE POLICY "profiles_update_admin" ON public.profiles FOR UPDATE TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE first_user BOOLEAN;
BEGIN
  SELECT NOT EXISTS (SELECT 1 FROM public.profiles) INTO first_user;
  INSERT INTO public.profiles (id, name, email, role, access_active)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'name', split_part(NEW.email,'@',1)),
    COALESCE(NEW.email,''),
    CASE WHEN first_user THEN 'admin'::public.app_role ELSE 'user'::public.app_role END,
    first_user
  );
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TABLE public.tarot_cards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  number TEXT,
  category TEXT NOT NULL,
  suit TEXT,
  image TEXT,
  general_meaning TEXT,
  element TEXT,
  planet_or_sign TEXT,
  timing TEXT,
  yes_no TEXT,
  symbolism JSONB NOT NULL DEFAULT '[]'::jsonb,
  light TEXT,
  shadow TEXT,
  reversed_meaning TEXT,
  combinations JSONB NOT NULL DEFAULT '[]'::jsonb,
  advice TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT ON public.tarot_cards TO authenticated;
GRANT ALL ON public.tarot_cards TO service_role;
ALTER TABLE public.tarot_cards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "cards_select_authenticated" ON public.tarot_cards FOR SELECT TO authenticated USING (true);

CREATE TABLE public.favorites (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  tarot_card_id UUID NOT NULL REFERENCES public.tarot_cards ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, tarot_card_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.favorites TO authenticated;
GRANT ALL ON public.favorites TO service_role;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "favorites_own" ON public.favorites FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE TABLE public.user_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  tarot_card_id UUID NOT NULL REFERENCES public.tarot_cards ON DELETE CASCADE,
  viewed_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, tarot_card_id)
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.user_progress TO authenticated;
GRANT ALL ON public.user_progress TO service_role;
ALTER TABLE public.user_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "progress_own" ON public.user_progress FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE TABLE public.readings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users ON DELETE CASCADE,
  question TEXT,
  card_1 UUID REFERENCES public.tarot_cards ON DELETE SET NULL,
  card_2 UUID REFERENCES public.tarot_cards ON DELETE SET NULL,
  card_3 UUID REFERENCES public.tarot_cards ON DELETE SET NULL,
  user_interpretation TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.readings TO authenticated;
GRANT ALL ON public.readings TO service_role;
ALTER TABLE public.readings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "readings_own" ON public.readings FOR ALL TO authenticated USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

INSERT INTO public.tarot_cards (slug,name,number,category,suit,general_meaning,element,planet_or_sign,timing,yes_no,symbolism,light,shadow,reversed_meaning,combinations,advice,sort_order) VALUES
('el-loco','El Loco','0','Arcano Mayor',NULL,'Representa el inicio de un camino, la inocencia y la confianza en lo desconocido. Invita a dar el primer paso aunque no tengas todas las respuestas.','Aire','Urano','Inicios inmediatos, primeros días','Sí','[{"symbol":"El hatillo","meaning":"Lo esencial que llevas contigo: tu experiencia previa."},{"symbol":"El acantilado","meaning":"El salto de fe, el riesgo necesario para avanzar."},{"symbol":"El perro blanco","meaning":"Tu instinto que te acompaña y te advierte."}]'::jsonb,'Libertad, espontaneidad, apertura a nuevas experiencias.','Imprudencia, falta de plan, evitar responsabilidades.','Miedo a comenzar, decisiones impulsivas o estancamiento por inseguridad.','[{"card":"El Mago","meaning":"Una idea nueva lista para materializarse."},{"card":"La Torre","meaning":"Un cambio repentino que obliga a empezar de cero."}]'::jsonb,'Da el primer paso hoy, aunque sea pequeño. La claridad llega caminando.',0),
('el-mago','El Mago','I','Arcano Mayor',NULL,'Habla del poder personal, la comunicación y la capacidad de convertir una idea en algo real. Tienes las herramientas necesarias.','Aire','Mercurio','Una semana','Sí','[{"symbol":"La mesa con los cuatro palos","meaning":"Todos los recursos disponibles: acción, emoción, mente y materia."},{"symbol":"El infinito","meaning":"Potencial ilimitado y ciclos que se renuevan."}]'::jsonb,'Enfoque, talento, iniciativa creativa.','Manipulación, promesas vacías, dispersión.','Falta de confianza en tus capacidades o uso poco honesto de tu influencia.','[{"card":"La Estrella","meaning":"Inspiración que se vuelve proyecto concreto."}]'::jsonb,'Ordena tus recursos y comunica con claridad lo que quieres crear.',1),
('la-sacerdotisa','La Sacerdotisa','II','Arcano Mayor',NULL,'Es la carta de la intuición, el silencio y el conocimiento interno. Aún no es momento de actuar, sino de escuchar.','Agua','Luna','Un ciclo lunar','Quizá','[{"symbol":"El velo","meaning":"Aquello que todavía no se revela."},{"symbol":"La luna a sus pies","meaning":"Dominio de los ciclos emocionales."}]'::jsonb,'Sabiduría interior, calma, secretos que se comprenden.','Autoengaño, guardar demasiado silencio, desconexión.','Ignorar tu intuición o dejarte llevar por rumores externos.','[{"card":"La Luna","meaning":"Sueños y mensajes del inconsciente muy activos."}]'::jsonb,'Antes de decidir, guarda silencio y escucha lo que ya sabes.',2),
('la-emperatriz','La Emperatriz','III','Arcano Mayor',NULL,'Fertilidad, abundancia y cuidado. Algo está creciendo en tu vida y necesita tiempo y ternura.','Tierra','Venus','Tres meses','Sí','[{"symbol":"El trigo","meaning":"Cosecha y frutos de lo sembrado."},{"symbol":"La corona de estrellas","meaning":"Conexión entre lo material y lo espiritual."}]'::jsonb,'Creatividad, disfrute, prosperidad, maternidad.','Sobreprotección, comodidad excesiva, dependencia.','Bloqueo creativo o descuido de ti misma por atender a otros.','[{"card":"Los Enamorados","meaning":"Una relación que florece y se estabiliza."}]'::jsonb,'Cuida lo que ya está creciendo en lugar de empezar algo nuevo.',3),
('los-enamorados','Los Enamorados','VI','Arcano Mayor',NULL,'Habla de vínculos, elecciones importantes y de alinear tu decisión con tus valores.','Aire','Géminis','Dos meses','Sí','[{"symbol":"El ángel","meaning":"Guía superior sobre la decisión."},{"symbol":"Las dos figuras","meaning":"Unión, complementariedad, acuerdo."}]'::jsonb,'Amor consciente, alianzas, decisiones desde el corazón.','Indecisión, elegir por miedo, relaciones desequilibradas.','Dudas persistentes, falta de compromiso o valores en conflicto.','[{"card":"El Carro","meaning":"Una decisión que impulsa un avance firme."}]'::jsonb,'Elige lo que te haga sentir íntegra, no solo lo que sea cómodo.',5),
('el-carro','El Carro','VII','Arcano Mayor',NULL,'Victoria, avance y determinación. Es momento de tomar el control y dirigir tu energía hacia una meta.','Agua','Cáncer','Siete semanas','Sí','[{"symbol":"Las dos esfinges","meaning":"Fuerzas opuestas que debes conducir."},{"symbol":"La armadura","meaning":"Protección y disciplina."}]'::jsonb,'Triunfo, foco, movimiento, viajes.','Prisa, autoritarismo, avanzar sin rumbo.','Pérdida de dirección, obstáculos o falta de voluntad.','[{"card":"El Mago","meaning":"Un proyecto que arranca con fuerza."}]'::jsonb,'Toma las riendas: define una sola meta y avanza sin desviarte.',6),
('la-estrella','La Estrella','XVII','Arcano Mayor',NULL,'Después de la dificultad llega la calma. Es la carta de la esperanza, la inspiración y la sanación suave.','Aire','Acuario','Tiempo largo pero seguro','Sí','[{"symbol":"Las ocho estrellas","meaning":"Guía, propósito y protección espiritual."},{"symbol":"El agua que se vierte","meaning":"Emociones que fluyen y limpian."},{"symbol":"La figura desnuda","meaning":"Autenticidad y vulnerabilidad sanadora."}]'::jsonb,'Esperanza, fe renovada, inspiración creativa, paz interior.','Idealizar demasiado, esperar sin actuar, desilusión.','Desesperanza temporal, desconexión de tu propósito, falta de fe.','[{"card":"La Luna","meaning":"Un proceso de sanación profunda del inconsciente."},{"card":"El Sol","meaning":"Claridad y éxito después de un tiempo difícil."}]'::jsonb,'Confía en el proceso y sigue cuidando tu luz: lo peor ya pasó.',16),
('la-luna','La Luna','XVIII','Arcano Mayor',NULL,'Habla de lo que aún no ves con claridad: emociones, miedos y sueños. Invita a caminar despacio.','Agua','Piscis','Un mes','Quizá','[{"symbol":"El sendero","meaning":"Un camino que se recorre sin verlo completo."},{"symbol":"El cangrejo","meaning":"Contenidos del inconsciente que emergen."}]'::jsonb,'Intuición fuerte, imaginación, mensajes de los sueños.','Confusión, ansiedad, autoengaño.','La niebla se disipa y comienzas a ver la verdad.','[{"card":"La Sacerdotisa","meaning":"Intuición muy despierta, escucha tus sueños."}]'::jsonb,'No decidas desde el miedo; espera a que la niebla se aclare.',17),
('el-sol','El Sol','XIX','Arcano Mayor',NULL,'Alegría, claridad y éxito. Todo se ilumina y lo que estaba oculto se comprende.','Fuego','Sol','Verano, pronto','Sí','[{"symbol":"El niño","meaning":"Alegría genuina y libertad."},{"symbol":"Los girasoles","meaning":"Vitalidad y crecimiento hacia la luz."}]'::jsonb,'Éxito, vitalidad, verdad, celebración.','Ego, exceso de optimismo, presumir.','Alegría contenida, falta de energía o dudas sobre tu valor.','[{"card":"La Estrella","meaning":"Sanación seguida de un éxito visible."}]'::jsonb,'Muéstrate tal como eres: es tu momento de brillar.',18),
('as-de-copas','As de Copas','As','Arcano Menor','Copas','Un nuevo comienzo emocional: amor, amistad o una emoción que se abre.','Agua','Agua','Semanas','Sí','[{"symbol":"La copa desbordante","meaning":"Emociones que abundan y se comparten."},{"symbol":"La paloma","meaning":"Bendición y mensaje amoroso."}]'::jsonb,'Amor nuevo, apertura del corazón, compasión.','Sensibilidad excesiva, idealizar un vínculo.','Emociones bloqueadas o un amor que aún no se expresa.','[{"card":"Los Enamorados","meaning":"Un vínculo que se profundiza."}]'::jsonb,'Permítete sentir sin defensas: algo bueno está naciendo.',30),
('tres-de-bastos','Tres de Bastos','3','Arcano Menor','Bastos','Expansión y planes que empiezan a dar resultados. Mirar más lejos.','Fuego','Fuego','Tres meses','Sí','[{"symbol":"Los barcos","meaning":"Proyectos en camino y oportunidades lejanas."},{"symbol":"El horizonte","meaning":"Visión a futuro."}]'::jsonb,'Crecimiento, viajes, colaboración.','Impaciencia, expectativas poco realistas.','Retrasos o planes que necesitan revisión.','[{"card":"El Carro","meaning":"Avance decidido hacia una meta grande."}]'::jsonb,'Amplía tu mirada: la oportunidad está fuera de lo conocido.',45),
('cinco-de-espadas','Cinco de Espadas','5','Arcano Menor','Espadas','Conflictos, tensión y victorias que dejan un costo. Invita a elegir tus batallas.','Aire','Aire','Días','No','[{"symbol":"Las espadas recogidas","meaning":"Ganar a costa de otros."},{"symbol":"El cielo revuelto","meaning":"Ambiente tenso y palabras hirientes."}]'::jsonb,'Aprender a poner límites, reconocer lo que no vale la pena.','Discusiones, orgullo, ambiente hostil.','Reconciliación posible o soltar una discusión que ya no sirve.','[{"card":"La Torre","meaning":"Un conflicto que provoca una ruptura necesaria."}]'::jsonb,'Pregúntate si esta batalla merece tu energía.',60),
('diez-de-oros','Diez de Oros','10','Arcano Menor','Oros','Estabilidad material, familia y logros que perduran en el tiempo.','Tierra','Tierra','Un año','Sí','[{"symbol":"La familia","meaning":"Herencia, raíces y apoyo."},{"symbol":"El arco","meaning":"Estructura sólida ya construida."}]'::jsonb,'Seguridad, prosperidad duradera, legado.','Apego al dinero, rutina sin alma.','Inestabilidad económica o tensiones familiares.','[{"card":"La Emperatriz","meaning":"Abundancia que se disfruta y se comparte."}]'::jsonb,'Construye pensando en el largo plazo, no en el impulso.',77);
