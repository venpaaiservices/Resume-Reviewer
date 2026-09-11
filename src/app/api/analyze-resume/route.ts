import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import mammoth from "mammoth";

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "dummy-key");

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("resume") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No resume file provided" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    let extractedText = "";

    // 1. Extract Text
    if (file.type === "application/pdf") {
      try {
        const pdfParse = require("pdf-parse");
        const pdfData = await pdfParse(buffer);
        extractedText = pdfData.text;
      } catch (err) {
        console.error("PDF Parsing Error:", err);
        return NextResponse.json({ error: "Failed to parse PDF document." }, { status: 500 });
      }
    } else if (
      file.type === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.name.endsWith(".docx")
    ) {
      try {
        const result = await mammoth.extractRawText({ buffer });
        extractedText = result.value;
      } catch (err) {
        console.error("DOCX Parsing Error:", err);
        return NextResponse.json({ error: "Failed to parse DOCX document." }, { status: 500 });
      }
    } else {
      return NextResponse.json({ error: "Unsupported file type. Please upload a PDF or DOCX." }, { status: 400 });
    }

    if (!extractedText || extractedText.trim() === "") {
      return NextResponse.json({ error: "Could not extract any text from the document. It might be an image-based PDF or empty." }, { status: 400 });
    }

    // Check for dummy key to avoid real API call failure if key isn't set yet for testing
    if (process.env.GEMINI_API_KEY === undefined) {
      // Mock response for demonstration if no API key is set
      console.warn("GEMINI_API_KEY is not set. Returning mock data.");
      await new Promise(resolve => setTimeout(resolve, 2000));
      return NextResponse.json({
        score: 75,
        summary: "This is a mock summary because GEMINI_API_KEY is missing. Please add it to your .env file.",
        strengths: ["Strong technical background", "Clear formatting"],
        weaknesses: ["Missing measurable achievements", "Generic objective statement"],
        recommendations: [
          { category: "Impact", tip: "Quantify your achievements with numbers." },
          { category: "Keywords", tip: "Add more relevant industry keywords to pass ATS." }
        ]
      });
    }

    // 2. AI Analysis
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    
    const prompt = `
      You are an expert technical recruiter and resume reviewer. 
      Analyze the following resume text and provide a structured JSON response evaluating its quality for ATS systems and hiring managers.
      
      Respond strictly with a valid JSON object matching this schema:
      {
        "score": number (0-100),
        "summary": "A 2-3 sentence overall evaluation",
        "strengths": ["list", "of", "3-5", "strengths"],
        "weaknesses": ["list", "of", "2-4", "areas", "to", "improve"],
        "recommendations": [
          {
            "category": "e.g., Formatting, Impact, Keywords, Clarity",
            "tip": "Specific, actionable advice"
          }
        ]
      }

      Do not include any markdown formatting like \`\`\`json. Just the raw JSON object.
      Make sure to return exactly 3-5 recommendations.
      
      Resume Text:
      ---
      ${extractedText.substring(0, 30000)} // limit to avoid massive token usage
      ---
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    let text = response.text();
    
    // Clean up potential markdown formatting from Gemini
    text = text.replace(/```json/g, "").replace(/```/g, "").trim();

    let jsonResponse;
    try {
      jsonResponse = JSON.parse(text);
    } catch (parseError) {
      console.error("Failed to parse Gemini response as JSON:", text);
      return NextResponse.json({ error: "AI response was not valid JSON." }, { status: 500 });
    }

    return NextResponse.json(jsonResponse);
  } catch (error: any) {
    console.error("Resume Analysis Error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred during analysis." },
      { status: 500 }
    );
  }
}
