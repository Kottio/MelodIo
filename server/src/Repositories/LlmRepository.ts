import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

// let LLMresults = {};

const postOpenAI = async function (prompt: string) {
  const key = process.env.OpenAIkey;
  const openaiClient = new OpenAI({ apiKey: key });

  const response = await openaiClient.chat.completions.create({
    model: "gpt-4.1-mini",
    store: true,
    messages: [
      { role: "system", content: prompt },
      // { role: "user", content: userPrompt },
    ],
  });
  let results = response.choices[0].message?.content;
  if (results) {
    results = cleanJSONResponse(results);
    console.log(results);
    return results;
  }
};

function cleanJSONResponse(raw: string): string {
  return raw
    .replace(/^```json\s*/i, "") // Remove starting ```json
    .replace(/^```\s*/i, "") // Or just ```
    .replace(/\s*```$/, ""); // Remove ending ```
}

const llmCalls = {
  harmonize: async function (melody: string[], style: string, level: string) {
    const promptHarmonize = `
You are a highly experienced Music Composer and Teacher specializing in ${style} harmony. Your students are ${level} music theory students with ${
      level === "beginner"
        ? "a basic understanding of chords"
        : level === "intermdiate"
        ? "a solid grasp of diatonic harmony"
        : "a strong understanding of jazz harmony and voice leading"
    }.
Your task is to harmonize the following melody:  [${melody.join(
      ", "
    )}] in the style of ${style}.

Specifically:

1.  **Provide a complete harmonic analysis in JSON format.** Each melodic note should be paired with a suitable chord in the specified style.
2.  **Include commentary for each melodic note and its corresponding chord.** Explain your harmonic choices, voice leading considerations (appropriate for the student's level), and how the chosen chord contributes to the specified style. **Also, indicate the Roman numeral (degree) of the chosen chord within the implied key or progression.**
3.  **Suggest potential chord extensions for each chord.** Offer at least one relevant extension that could add color and sophistication (appropriate for the student's level), explaining why it works within the specified style. **Additionally, suggest at least one potential scale that could be used for improvisation or further melodic development over the chosen chord.**
4.  **Offer at least 3 specific and actionable pieces of advice for developing harmony skills in the specified style.** Each piece of advice should include a contextual musical example (represented as a simplified chord progression or voicing) to illustrate the concept, keeping the student's level in mind.

The JSON output should strictly adhere to the following format:
{
  "harmony": [
    {
      "note": "...",
      "chord": "...",
      "romanNumeral": "...",
      "commentary": "...",
      "extensions": ["..."],
      "potentialScales": ["..."]
    },
    // ... more notes as needed ...
  ],
  "advices": [
    {
      "advice": "...",
      "example": "..."
    },
    {
      "advice": "...",
      "example": "..."
    },
    {
      "advice": "...",
      "example": "..."
    }
  ]
}
  
`;
    const result = await postOpenAI(promptHarmonize);
    if (result) {
      return result;
    } else {
      console.log("An error occured in the repository");
    }
  },
};
export default llmCalls;
