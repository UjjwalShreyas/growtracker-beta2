import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: NextRequest) {
  try {
    const { imageBase64 } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    const base64Data = imageBase64.split(",").pop();
    const mimeMatch = imageBase64.match(/^data:(image\/\w+);base64,/);
    const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";

const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `You are a nutrition estimation assistant for an Indian food-tracking app.
Look at this photo of a meal/plate of food and identify what dish it is, then estimate its nutrition.

Respond ONLY with a valid JSON object, no other text, no markdown code fences, in exactly this format:
{
  "mealName": "short dish name, e.g. Palak Paneer",
  "macros": { "calories": 340, "protein": 14, "carbs": 30, "fat": 12 },
  "ingredients": [
    {"item_name": "Paneer", "quantity": 150, "unit": "g"},
    {"item_name": "Spinach", "quantity": 200, "unit": "g"}
  ]
}

Estimates should be reasonable for a single typical serving. If the dish is unclear, make your best reasonable guess rather than refusing. Calories/protein/carbs/fat are per-serving numbers for the whole plate, not per ingredient.`;

    const generateWithRetry = async (retries = 2): Promise<import("@google/generative-ai").GenerateContentResult> => {
      try {
        return await model.generateContent([
          prompt,
          {
            inlineData: {
              data: base64Data,
              mimeType,
            },
          },
        ]);
      } catch (err: unknown) {
        const status = (err as { status?: number })?.status;
        if (status === 429 && retries > 0) {
          // Wait a few seconds and try again
          await new Promise((resolve) => setTimeout(resolve, 5000));
          return generateWithRetry(retries - 1);
        }
        throw err;
      }
    };

    const result = await generateWithRetry();

    const responseText = result.response.text().trim();
    const cleaned = responseText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    let parsed;
    try {
      parsed = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse Gemini meal response:", cleaned);
      return NextResponse.json({ error: "AI response could not be parsed" }, { status: 502 });
    }

    return NextResponse.json(parsed);
  } catch (err) {
    console.error("Meal detection error:", err);
    return NextResponse.json({ error: "Detection failed" }, { status: 500 });
  }
}