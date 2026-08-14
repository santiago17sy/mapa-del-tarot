export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.15"
  }
  public: {
    Tables: {
      favorites: {
        Row: {
          created_at: string
          id: string
          tarot_card_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          tarot_card_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          tarot_card_id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "favorites_tarot_card_id_fkey"
            columns: ["tarot_card_id"]
            isOneToOne: false
            referencedRelation: "tarot_cards"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          access_active: boolean
          created_at: string
          email: string
          id: string
          name: string
          role: Database["public"]["Enums"]["app_role"]
        }
        Insert: {
          access_active?: boolean
          created_at?: string
          email?: string
          id: string
          name?: string
          role?: Database["public"]["Enums"]["app_role"]
        }
        Update: {
          access_active?: boolean
          created_at?: string
          email?: string
          id?: string
          name?: string
          role?: Database["public"]["Enums"]["app_role"]
        }
        Relationships: []
      }
      readings: {
        Row: {
          card_1: string | null
          card_2: string | null
          card_3: string | null
          created_at: string
          id: string
          question: string | null
          user_id: string
          user_interpretation: string | null
        }
        Insert: {
          card_1?: string | null
          card_2?: string | null
          card_3?: string | null
          created_at?: string
          id?: string
          question?: string | null
          user_id: string
          user_interpretation?: string | null
        }
        Update: {
          card_1?: string | null
          card_2?: string | null
          card_3?: string | null
          created_at?: string
          id?: string
          question?: string | null
          user_id?: string
          user_interpretation?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "readings_card_1_fkey"
            columns: ["card_1"]
            isOneToOne: false
            referencedRelation: "tarot_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "readings_card_2_fkey"
            columns: ["card_2"]
            isOneToOne: false
            referencedRelation: "tarot_cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "readings_card_3_fkey"
            columns: ["card_3"]
            isOneToOne: false
            referencedRelation: "tarot_cards"
            referencedColumns: ["id"]
          },
        ]
      }
      tarot_cards: {
        Row: {
          advice: string | null
          category: string
          combinations: Json
          created_at: string
          element: string | null
          general_meaning: string | null
          id: string
          image: string | null
          light: string | null
          name: string
          number: string | null
          planet_or_sign: string | null
          reversed_meaning: string | null
          shadow: string | null
          slug: string
          sort_order: number
          suit: string | null
          symbolism: Json
          timing: string | null
          yes_no: string | null
        }
        Insert: {
          advice?: string | null
          category: string
          combinations?: Json
          created_at?: string
          element?: string | null
          general_meaning?: string | null
          id?: string
          image?: string | null
          light?: string | null
          name: string
          number?: string | null
          planet_or_sign?: string | null
          reversed_meaning?: string | null
          shadow?: string | null
          slug: string
          sort_order?: number
          suit?: string | null
          symbolism?: Json
          timing?: string | null
          yes_no?: string | null
        }
        Update: {
          advice?: string | null
          category?: string
          combinations?: Json
          created_at?: string
          element?: string | null
          general_meaning?: string | null
          id?: string
          image?: string | null
          light?: string | null
          name?: string
          number?: string | null
          planet_or_sign?: string | null
          reversed_meaning?: string | null
          shadow?: string | null
          slug?: string
          sort_order?: number
          suit?: string | null
          symbolism?: Json
          timing?: string | null
          yes_no?: string | null
        }
        Relationships: []
      }
      user_progress: {
        Row: {
          id: string
          tarot_card_id: string
          user_id: string
          viewed_at: string
        }
        Insert: {
          id?: string
          tarot_card_id: string
          user_id: string
          viewed_at?: string
        }
        Update: {
          id?: string
          tarot_card_id?: string
          user_id?: string
          viewed_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_progress_tarot_card_id_fkey"
            columns: ["tarot_card_id"]
            isOneToOne: false
            referencedRelation: "tarot_cards"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "user" | "admin"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["user", "admin"],
    },
  },
} as const
