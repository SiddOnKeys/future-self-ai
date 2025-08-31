import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

// Database types
export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          onboarding_data: any;
          current_goals: string[];
          values: string[];
          communication_style: any;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          onboarding_data?: any;
          current_goals?: string[];
          values?: string[];
          communication_style?: any;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          onboarding_data?: any;
          current_goals?: string[];
          values?: string[];
          communication_style?: any;
          created_at?: string;
          updated_at?: string;
        };
      };
      personas: {
        Row: {
          id: string;
          user_id: string;
          timeframe: string;
          system_prompt: string;
          personality_summary: string;
          communication_style: any;
          achievements: string[];
          created_at: string;
          last_updated: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          timeframe: string;
          system_prompt: string;
          personality_summary: string;
          communication_style?: any;
          achievements?: string[];
          created_at?: string;
          last_updated?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          timeframe?: string;
          system_prompt?: string;
          personality_summary?: string;
          communication_style?: any;
          achievements?: string[];
          created_at?: string;
          last_updated?: string;
        };
      };
      conversations: {
        Row: {
          id: string;
          user_id: string;
          persona_id: string;
          title: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          persona_id: string;
          title?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          persona_id?: string;
          title?: string;
          created_at?: string;
          updated_at?: string;
        };
      };
      messages: {
        Row: {
          id: string;
          conversation_id: string;
          content: string;
          role: "user" | "assistant";
          metadata: any;
          created_at: string;
        };
        Insert: {
          id?: string;
          conversation_id: string;
          content: string;
          role: "user" | "assistant";
          metadata?: any;
          created_at?: string;
        };
        Update: {
          id?: string;
          conversation_id?: string;
          content?: string;
          role?: "user" | "assistant";
          metadata?: any;
          created_at?: string;
        };
      };
    };
    Views: {
      conversation_summaries: {
        Row: {
          conversation_id: string;
          title: string;
          created_at: string;
          updated_at: string;
          personality_summary: string | null;
          timeframe: string | null;
          message_count: number;
          last_message_at: string | null;
        };
      };
    };
    Functions: {
      get_conversation_context: {
        Args: {
          conversation_uuid: string;
          limit_count?: number;
        };
        Returns: {
          role: string;
          content: string;
          created_at: string;
        }[];
      };
      get_user_persona_summary: {
        Args: {
          user_uuid: string;
        };
        Returns: {
          id: string;
          timeframe: string;
          personality_summary: string;
          communication_style: any;
          achievements: string[];
        }[];
      };
      get_user_stats: {
        Args: {
          user_uuid: string;
        };
        Returns: {
          total_conversations: number;
          total_messages: number;
          active_personas: number;
          last_activity: string;
        }[];
      };
    };
  };
}

// Type-safe Supabase client
export type SupabaseClient = typeof supabase;

// Edge function types
export interface GeneratePersonaRequest {
  userId: string;
  timeframe: string;
  goals: string[];
  values: string[];
  communicationStyle: any;
}

export interface GeneratePersonaResponse {
  persona: Database["public"]["Tables"]["personas"]["Row"];
}

// Utility functions for edge functions
export const callEdgeFunction = async <T = any>(
  functionName: string,
  body: any,
  options?: RequestInit
): Promise<T> => {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    throw new Error("No active session");
  }

  const response = await fetch(`${supabaseUrl}/functions/v1/${functionName}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session.access_token}`,
      ...options?.headers,
    },
    body: JSON.stringify(body),
    ...options,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || "Edge function call failed");
  }

  return response.json();
};

// Call the generate-persona edge function
export const generatePersona = async (
  request: GeneratePersonaRequest
): Promise<GeneratePersonaResponse> => {
  return callEdgeFunction<GeneratePersonaResponse>("generate-persona", request);
};
