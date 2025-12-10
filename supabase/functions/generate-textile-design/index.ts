import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { 
      material, 
      clothType, 
      usage, 
      color, 
      pattern,
      clothDetail,
      blendColor,
      clothAdjustment
    } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    // Construct a detailed prompt for textile design on actual clothing shape
    const detailText = clothDetail ? ` with ${clothDetail.replace("-", " ")}` : "";
    const adjustmentText = clothAdjustment && clothAdjustment !== 'none' ? ` with ${clothAdjustment} design modification` : "";
    const patternText = pattern === "solid" ? "solid color" : `${pattern} pattern`;
    
    // Enhanced color description for better blend visibility
    let colorDescription = `${color} color`;
    let colorInstructions = "";
    if (blendColor && blendColor !== '#000000') {
      colorDescription = `dual-tone color scheme combining ${color} and ${blendColor}`;
      colorInstructions = `CRITICAL COLOR REQUIREMENT: The fabric MUST show BOTH ${color} AND ${blendColor} colors integrated throughout. Use techniques like ombre gradient, color blocking, or interwoven color patterns to ensure BOTH colors are prominently visible. Do NOT make it predominantly one color - both colors must be equally represented and clearly distinguishable.`;
    }
    
    // Enhanced adjustment instructions
    let adjustmentInstructions = "";
    if (clothAdjustment && clothAdjustment !== 'none') {
      adjustmentInstructions = `
CRITICAL STRUCTURAL REQUIREMENT: The ${clothType} MUST feature "${clothAdjustment}" as its PRIMARY design element.
- This is NOT optional - the ${clothAdjustment} MUST be the defining characteristic of this garment
- Show the ${clothAdjustment} clearly and prominently in the front view
- The ${clothAdjustment} should be immediately noticeable and accurately depicted
- Ensure proper proportions and realistic construction of the ${clothAdjustment}
Example: If it's "Mandarin collar", show a clear stand-up collar without lapels. If it's "Bishop sleeves", show dramatically full, gathered sleeves.`;
    }
    
    const prompt = `Create a ultra-realistic, high-quality photograph of a ${clothType}${detailText}${adjustmentText}.

SPECIFICATIONS:
- Garment Type: ${clothType}${detailText}
- Fabric Material: ${material} with visible texture
- Pattern Style: ${patternText}
- Color Scheme: ${colorDescription}
- Usage Context: ${usage}

${colorInstructions}

${adjustmentInstructions}

PRESENTATION REQUIREMENTS:
- Show the complete ${clothType} flat laid or on an invisible mannequin
- Ensure the entire garment fits within the frame - no parts cut off
- Center the garment in the composition
- Use professional fashion photography lighting
- Clean white or light neutral background
- High resolution, sharp focus throughout
- The ${patternText} should be clearly visible across the entire garment
- Professional product photography quality

CRITICAL: Ensure the full ${clothType} is visible and properly framed without any parts extending beyond the image boundaries.`;

    console.log("Generating textile design with prompt:", prompt);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: prompt
          }
        ],
        modalities: ["image", "text"]
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI Gateway response received:", JSON.stringify(data).substring(0, 200));

    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    
    if (!imageUrl) {
      throw new Error("No image URL in response");
    }

    return new Response(
      JSON.stringify({ imageUrl }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200 
      }
    );

  } catch (error) {
    console.error("Error in generate-textile-design:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500 
      }
    );
  }
});
