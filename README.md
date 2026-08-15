# mapa del tarot (San)

Prompt para Lovable — Mapa del Tarot MVP

Quiero crear una web app responsive y mobile-first llamada “Mapa del Tarot”, dirigida principalmente a personas principiantes que ya tienen un mazo de Tarot y quieren aprender a interpretarlo desde cero.

La aplicación debe transformar el contenido de mis guías PDF en una experiencia visual, sencilla e interactiva. NO quiero un visor de PDFs ni una web con páginas llenas de texto.

Objetivo del MVP

Construir únicamente estos 3 módulos:

🃏 Explorar las 78 Cartas

🔮 Mi Primera Tirada

✨ Practicar Interpretación

Además debe existir:

Login de usuarios.

Favoritos.

Progreso básico.

Acceso privado para clientes.

Panel administrativo sencillo para activar/desactivar usuarios.

NO desarrollar todavía:

Libro completo de tiradas.

Cuidado y conexión con el Tarot.

IA.

Pagos.

Suscripciones.

Comunidad.

Chat.

Funciones adicionales.

DISEÑO GENERAL

Quiero una estética inspirada en mis PDFs:

Mística pero elegante.

Moderna y limpia.

Nada demasiado oscuro ni esotérico.

Fondo crema/blanco cálido.

Azul petróleo / teal como color principal.

Dorado como color secundario.

Detalles suaves de estrellas, lunas y elementos del Tarot.

Cards con bordes redondeados.

Tipografía elegante para títulos y muy legible para textos.

Mucho espacio en blanco.

Debe sentirse como una app educativa premium, no como un ebook.

Optimizar especialmente para celular.

LOGIN

Pantalla inicial:

Logo / nombre:

Mapa del Tarot

Texto:

Aprende a leer el Tarot desde cero, paso a paso.

Campos:

Email
Contraseña

Botón:

Entrar

Todos los módulos deben estar protegidos y disponibles únicamente para usuarios con acceso activo.

Preparar la base de datos para que un usuario pueda tener:

nombre

email

password/auth

access_active

role

created_at

Roles:

user

admin

HOME

Después del login mostrar:

Hola, [Nombre] ✨

Título:

¿Qué quieres hacer hoy?

Mostrar 3 cards grandes.

Card 1

🃏

Explorar las 78 cartas

Consulta significados, símbolos y características de cada carta.

Botón:

Explorar cartas

Card 2

🔮

Haz tu primera tirada

Aprende paso a paso cómo preparar, realizar e interpretar tu primera lectura.

Botón:

Comenzar tirada

Card 3

✨

Practica tu interpretación

Entrena tu intuición aprendiendo a observar, sentir e interpretar cada carta.

Botón:

Practicar

Debajo añadir:

❤️ Mis cartas favoritas

y un pequeño indicador:

Tu progreso

Por ejemplo:

12 de 78 cartas exploradas

No desarrollar todavía sistemas complejos de gamificación.

MÓDULO 1 — LAS 78 CARTAS

Este debe ser el módulo principal de la aplicación.

Título:

Explora las 78 cartas

Añadir buscador:

🔎 Buscar una carta...

Filtros:

Todas | Arcanos Mayores | Bastos | Copas | Espadas | Oros

Mostrar las cartas mediante un grid visual.

Cada elemento debe mostrar:

Imagen de la carta.

Nombre.

Número cuando corresponda.

Categoría/palo.

Icono de favorito.

Ejemplo:

XVII

La Estrella

Arcano Mayor

♡ Favorito

Al pulsar una carta abrir su ficha.

FICHA DE UNA CARTA

Diseñar una pantalla bonita, fácil de consultar y que NO muestre toda la información de golpe.

Parte superior:

Imagen grande de la carta.

XVII — LA ESTRELLA

Arcano Mayor

♡ Guardar en favoritos

Después dividir la información en secciones visuales.

Significado general

Texto de la explicación.

Elementos y asociaciones

Mostrar mediante pequeños chips o cards:

Elemento

Planeta / signo

Tiempo

Sí / No

Simbolismo

Mostrar cada símbolo acompañado de su explicación.

Luz ☀️

Interpretación positiva.

Sombra 🌑

Interpretación desafiante.

Carta invertida ↕️

Significado de la carta invertida.

Combinaciones

Mostrar combinaciones importantes con otras cartas.

Consejo ✨

Mostrar el impulso o mensaje práctico de la carta.

La estructura debe permitir que posteriormente pueda cargar las 78 cartas desde una base de datos.

Crear inicialmente varias cartas de ejemplo para poder probar toda la interfaz.

MÓDULO 2 — MI PRIMERA TIRADA

Este módulo debe sentirse como una experiencia guiada.

Título:

🔮 Mi Primera Tirada

Subtítulo:

Te acompañaremos paso a paso. No necesitas memorizar todas las cartas para comenzar.

Mostrar un flujo paso a paso.

Paso 1

Prepara tu espacio

Explicar brevemente cómo prepararse antes de realizar la tirada.

Botón:

Estoy lista →

Paso 2

Formula tu pregunta

Campo:

¿Qué te gustaría consultar?

Mostrar una recomendación para realizar preguntas claras y abiertas.

Botón:

Continuar

Paso 3

Baraja y corta tu mazo

Dar instrucciones sencillas.

Botón:

Ya lo hice

Paso 4

Elige 3 cartas

La persona utilizará SU PROPIO MAZO físico.

Mostrar tres espacios:

Carta 1

Selector de las 78 cartas.

Carta 2

Selector de las 78 cartas.

Carta 3

Selector de las 78 cartas.

Paso 5

Observa tus cartas

Mostrar las tres cartas seleccionadas visualmente.

No interpretar automáticamente todavía.

Invitar a observar:

símbolos

colores

personajes

dirección

sensaciones

Paso 6

Interpreta tu tirada

Permitir consultar cada una de las tres cartas mediante:

Ver significado

Y permitir escribir:

Mi interpretación

Textarea.

Botón:

Finalizar tirada

Por ahora no implementar interpretación mediante IA.

MÓDULO 3 — PRACTICA TU INTERPRETACIÓN

Este módulo debe transformar el aprendizaje del Tarot en una actividad.

Título:

✨ Entrena tu intuición

Subtítulo:

No se trata solo de memorizar. Primero observa, luego siente y finalmente interpreta.

Seleccionar aleatoriamente una carta.

Mostrarla grande sin enseñar inicialmente su significado.

PASO 1 — OBSERVA 👁️

Pregunta:

¿Qué fue lo primero que llamó tu atención?

Textarea.

Ayuda:

Observa colores, personajes, objetos, símbolos y dirección.

Botón:

Continuar

PASO 2 — SIENTE ❤️

Pregunta:

¿Qué emoción te transmite esta carta?

Textarea.

Botón:

Continuar

PASO 3 — INTERPRETA ✨

Pregunta:

¿Qué mensaje crees que intenta comunicarte?

Textarea.

Botón:

Ver significado

Después revelar:

Interpretación de la carta

significado general

simbolismo

luz

sombra

consejo

Y mostrar:

Tu interpretación

junto con lo que escribió anteriormente.

Botones:

Practicar con otra carta

❤️ Guardar carta

FAVORITOS

Crear una pantalla sencilla:

❤️ Mis cartas favoritas

Mostrar todas las cartas guardadas por el usuario.

Permitir entrar directamente a la ficha de cada carta.

NAVEGACIÓN MOBILE

Usar barra inferior en celulares.

🏠 Inicio
🃏 Cartas
🔮 Tirada
✨ Practicar
👤 Perfil

En desktop puede utilizarse sidebar o navegación superior.

PANEL ADMINISTRATIVO

Crear una sección protegida únicamente para role = admin.

Pantalla:

Usuarios

Mostrar:

Nombre
Email
Fecha de registro
Estado

Estados:

🟢 Activo
🔴 Sin acceso

Acciones:

Activar acceso

Desactivar acceso

El administrador debe poder crear manualmente un usuario o activar su acceso después de comprobar que realizó el pago externamente por WhatsApp/Yape.

NO implementar pasarela de pago todavía.

BASE DE DATOS

Preparar una estructura limpia para posteriormente ampliar la aplicación.

Entidades principales:

users / profiles

id

name

email

role

access_active

tarot_cards

id

name

number

category

suit

image

general_meaning

element

planet_or_sign

timing

yes_no

symbolism

light

shadow

reversed_meaning

combinations

advice

favorites

id

user_id

tarot_card_id

user_progress

user_id

tarot_card_id

viewed_at

readings

id

user_id

question

card_1

card_2

card_3

user_interpretation

created_at

Usar Supabase para autenticación y base de datos si está disponible en el proyecto.

IMPORTANTE

La primera versión debe ser SIMPLE.

Priorizar:

Excelente experiencia móvil.

Navegación muy sencilla.

Diseño premium.

Las cartas como protagonistas.

Interacciones fáciles para principiantes.

Que la aplicación se sienta diferente y más útil que leer un PDF.

NO inventar módulos adicionales.

NO llenar la aplicación de funcionalidades que todavía no hemos solicitado.

Crear primero una versión funcional y visual de este MVP utilizando contenido de ejemplo. Después cargaremos el contenido definitivo de los PDFs y las 78 cartas.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://mapa-del-tarot.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/01e21f0f-5a2e-46ba-8658-d0edfc7d89e4).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
