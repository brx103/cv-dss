import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { CVData } from "@/types/cv";

export async function POST(request: NextRequest) {
  try {
    const client = new Groq({ apiKey: process.env.GROQ_API_KEY });
    const cvData: CVData = await request.json();

    const expLines = cvData.experiences
      .map(e => `  {"id":"${e.id}","description":${JSON.stringify(e.description)}}`)
      .join(",\n");
    const formLines = cvData.formations
      .map(f => `  {"id":"${f.id}","description":${JSON.stringify(f.description)}}`)
      .join(",\n");

    const prompt = `You are a professional CV translator. Translate ALL the French text below into professional British English.

IMPORTANT RULES:
1. You MUST include EVERY experience and formation in the response — ${cvData.experiences.length} experiences and ${cvData.formations.length} formations total.
2. If a description is empty (""), return it empty ("") — do not invent content.
3. Keep names, company names, school names, cities, dates, email addresses, phone numbers, and IDs exactly as-is.
4. Technical terms (software, programming languages, tools) stay in their standard English form.
5. Use a professional, formal tone.

--- DATA TO TRANSLATE ---

TITRE: ${JSON.stringify(cvData.titre)}

RESUME: ${JSON.stringify(cvData.resume)}

COMPETENCES (${cvData.competences.length} items): ${JSON.stringify(cvData.competences)}

EXPERIENCES (${cvData.experiences.length} items — translate ALL):
[
${expLines}
]

FORMATIONS (${cvData.formations.length} items — translate ALL):
[
${formLines}
]

--- REQUIRED JSON OUTPUT FORMAT ---
Return ONLY this JSON, no extra text:
{
  "titre": "...",
  "resume": "...",
  "competences": [...],
  "experiences": [
${cvData.experiences.map(e => `    {"id":"${e.id}","description":"..."}`).join(",\n")}
  ],
  "formations": [
${cvData.formations.map(f => `    {"id":"${f.id}","description":"..."}`).join(",\n")}
  ]
}`;

    const message = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      max_tokens: 4096,
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }],
    });

    const responseText = message.choices[0]?.message?.content ?? "";
    if (!responseText) throw new Error("Empty AI response");

    const translated = JSON.parse(responseText) as {
      titre: string;
      resume: string;
      experiences: { id: string; description: string }[];
      formations:  { id: string; description: string }[];
      competences: string[];
    };

    const translatedCV: CVData = {
      ...cvData,
      titre:      translated.titre      ?? cvData.titre,
      resume:     translated.resume     ?? cvData.resume,
      competences: translated.competences ?? cvData.competences,
      experiences: cvData.experiences.map(exp => {
        const t = translated.experiences?.find(e => e.id === exp.id);
        return t ? { ...exp, description: t.description } : exp;
      }),
      formations: cvData.formations.map(f => {
        const t = translated.formations?.find(e => e.id === f.id);
        return t ? { ...f, description: t.description } : f;
      }),
    };

    return NextResponse.json(translatedCV);
  } catch (error) {
    console.error("Erreur translate-cv:", error);
    const msg = error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
