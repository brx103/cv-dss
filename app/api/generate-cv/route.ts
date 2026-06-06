import { NextRequest, NextResponse } from "next/server";
import Groq from "groq-sdk";
import { CVData } from "@/types/cv";

export async function POST(request: NextRequest) {
  try {
    const client = new Groq({
      apiKey: process.env.GROQ_API_KEY,
    });
    const cvData: CVData = await request.json();

    const prompt = `Tu es un expert en rédaction de CV professionnels. Enrichis les éléments suivants du CV en français, de manière concise et percutante.

Données du CV :
${JSON.stringify(cvData, null, 2)}

Ta tâche :
1. Enrichir le "resume" (résumé professionnel) : s'il est vide ou court, génère un résumé accrocheur de 2-3 phrases mettant en valeur le profil. S'il existe déjà, reformule-le pour le rendre plus percutant.
2. Pour chaque expérience dans "experiences" : enrichis le champ "description" pour qu'il soit orienté résultats et impact, avec des verbes d'action forts. Si la description est vide, génère-en une à partir du poste et de l'entreprise.

Réponds UNIQUEMENT avec un objet JSON valide ayant exactement cette structure :
{
  "resume": "résumé enrichi",
  "experiences": [
    { "id": "id_original", "description": "description enrichie" }
  ]
}

Ne modifie aucun autre champ. N'ajoute aucun texte en dehors du JSON.`;

    const message = await client.chat.completions.create({
      model: "llama-3.1-8b-instant",
      max_tokens: 2048,
      response_format: { type: "json_object" },
      messages: [{ role: "user", content: prompt }],
    });

    const responseText = message.choices[0]?.message?.content ?? "";
    console.log("[generate-cv] réponse brute OpenAI :", responseText);

    if (!responseText) {
      throw new Error("Réponse vide");
    }

    const enriched = JSON.parse(responseText) as {
      resume: string;
      experiences: { id: string; description: string }[];
    };

    const enrichedCV: CVData = {
      ...cvData,
      resume: enriched.resume ?? cvData.resume,
      experiences: cvData.experiences.map((exp) => {
        const enrichedExp = enriched.experiences?.find((e) => e.id === exp.id);
        return enrichedExp ? { ...exp, description: enrichedExp.description } : exp;
      }),
    };

    return NextResponse.json(enrichedCV);
  } catch (error) {
    console.error("Erreur generate-cv:", error);
    const message = error instanceof Error ? error.message : "Erreur inconnue";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
