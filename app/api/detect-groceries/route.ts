import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { imageBase64 } = await req.json();

    if (!imageBase64) {
      return NextResponse.json({ error: "No image provided" }, { status: 400 });
    }

    // Strip the "data:image/jpeg;base64," prefix if present
    const base64Data = imageBase64.split(",").pop();
    const mimeMatch = imageBase64.match(/^data:(image\/\w+);base64,/);
    const mimeType = mimeMatch ? mimeMatch[1] : "image/jpeg";

const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

    const prompt = `You are a grocery detection assistant for an Indian grocery-tracking app.
Look at this photo of groceries (could be a grocery bag, kitchen counter, receipt, or pantry shelf) and identify every distinct food item visible.

For each item, estimate:
- item_name: the common name (e.g. "Basmati Rice", "Toor Dal", "Onions", "Amul Butter")
- quantity: your best estimate as a short string (e.g. "1 kg", "500 g", "6 pieces", "2 packets")
- category: one of exactly these values: "grain", "dairy", "vegetable", "spice", "other"
- expiry_date: your best estimate in YYYY-MM-DD format based on typical shelf life for that item type, assuming today's purchase date is ${new Date().toISOString().split("T")[0]}

Respond ONLY with a valid JSON array, no other text, no markdown code fences. Example format:
[
  {"item_name": "Onions", "quantity": "1 kg", "category": "vegetable", "expiry_date": "2026-08-05"},
  {"item_name": "Toor Dal", "quantity": "500 g", "category": "grain", "expiry_date": "2027-01-15"}
]

If you cannot clearly identify any food items in the image, respond with an empty array: []`;

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          data: base64Data,
          mimeType,
        },
      },
    ]);

    const responseText = result.response.text().trim();

    // Strip markdown code fences if Gemini adds them despite instructions
    const cleaned = responseText
      .replace(/^```json\s*/i, "")
      .replace(/^```\s*/i, "")
      .replace(/```\s*$/i, "")
      .trim();

    let items;
    try {
      items = JSON.parse(cleaned);
    } catch {
      console.error("Failed to parse Gemini response:", cleaned);
      return NextResponse.json({ error: "AI response could not be parsed" }, { status: 502 });
    }

    if (!Array.isArray(items)) {
      return NextResponse.json({ error: "Unexpected AI response format" }, { status: 502 });
    }

    return NextResponse.json({ items });
  } catch (err) {
    console.error("Detection error:", err);
    return NextResponse.json({ error: "Detection failed" }, { status: 500 });
  }
}