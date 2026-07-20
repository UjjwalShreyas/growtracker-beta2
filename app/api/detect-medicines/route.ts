import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.MEDICINE_GEMINI_API_KEY || process.env.GEMINI_API_KEY || "");

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

    // Use Gemini 1.5 Pro for highly accurate text extraction
// Use the current stable Flash model — "latest" alias avoids breaking
    // again when Google deprecates/renames specific version numbers
    const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
const prompt = `You are an expert pharmacist AI assistant. Your ONLY job is to extract exact information by READING the text printed on medicine strips, bottles, or boxes.

CRITICAL INSTRUCTION: You must visually scan the image for printed expiry dates. Look for text like "EXP", "EXP.", "Expiry Date", "Use By". 
For example, if the box says "EXP.MAY 2025", you MUST extract "2025-05-01". Do NOT guess the expiry date based on generic shelf life. You must act as an OCR engine to read the date.

For each medicine item visible, extract:
- item_name: the brand or generic name (e.g., "Dolo-650", "Paracetamol")
- quantity: a short string describing the amount (e.g., "480 tablets", "15 tablets", "1 strip")
- category: MUST be one of: "medicine", "pill", "syrup", "firstaid"
- expiry_date: the exact expiry date YOU READ FROM THE PACKAGING in YYYY-MM-DD format (if only month and year are printed like May 2025, use "2025-05-01"). If and ONLY if there is absolutely no printed date visible, fallback to "${new Date().toISOString().split("T")[0]}". But you MUST try to read it first!

Respond ONLY with a valid JSON array, no other text, no markdown code fences. Example format:
[
  {"item_name": "Dolo-650", "quantity": "15 tablets", "category": "pill", "expiry_date": "2025-05-01"},
  {"item_name": "Cough Syrup", "quantity": "1 bottle", "category": "syrup", "expiry_date": "2026-12-01"}
]

If you cannot identify any medicines, respond with: []`;

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
