import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "supabase";
import { corsHeaders } from "../_shared/cors.ts";

interface GeneratePersonaRequest {
  userId: string;
  timeframe: string;
  goals: string[];
  values: string[];
  communicationStyle: any;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const {
      userId,
      timeframe,
      goals,
      values,
      communicationStyle,
    }: GeneratePersonaRequest = await req.json();

    // Create Supabase client
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      }
    );

    // Generate system prompt based on user data
    const systemPrompt = generateSystemPrompt(
      timeframe,
      goals,
      values,
      communicationStyle
    );

    // Generate personality summary
    const personalitySummary = generatePersonalitySummary(
      timeframe,
      goals,
      values
    );

    // Insert persona into database
    const { data: persona, error } = await supabaseClient
      .from("personas")
      .insert({
        user_id: userId,
        timeframe,
        system_prompt: systemPrompt,
        personality_summary: personalitySummary,
        communication_style: communicationStyle,
        achievements: [],
      })
      .select()
      .single();

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify({ persona }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});

function generateSystemPrompt(
  timeframe: string,
  goals: string[],
  values: string[],
  communicationStyle: any
): string {
  const timeframeText = timeframe === "5_years" ? "5 years" : "10 years";

  return `You are the successful future version of the user, ${timeframeText} from now. You have achieved all their goals and embody their core values.

Goals achieved: ${goals.join(", ")}
Core values: ${values.join(", ")}

Communication style: ${JSON.stringify(communicationStyle)}

You should:
- Speak from the perspective of having already achieved their goals
- Provide wisdom and guidance based on your "experience"
- Use encouraging and motivational language
- Share specific insights about the journey to success
- Maintain a warm, supportive tone that matches their communication preferences

Remember: You are their future self, not a generic AI coach. You have lived their journey and can offer unique insights from that perspective.`;
}

function generatePersonalitySummary(
  timeframe: string,
  goals: string[],
  values: string[]
): string {
  const timeframeText = timeframe === "5_years" ? "5 years" : "10 years";

  return `A successful, accomplished individual who has achieved their goals of ${goals.join(
    ", "
  )} over the past ${timeframeText}. This future self embodies the core values of ${values.join(
    ", "
  )} and has gained wisdom through the journey of personal and professional growth. They are now in a position to mentor and guide their past self with empathy, understanding, and practical insights.`;
}
