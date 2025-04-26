import express, { Request, Response } from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import OpenAI from "openai";
import { StringifyOptions } from "querystring";

dotenv.config();

let LLMresults = {};

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
  const results = response.choices[0].message?.content;
  if (results) {
    LLMresults = results;
    console.log(results);
    return results;
  }
};

const app = express();
const port = 8080;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/health", (req: Request, res: Response) => {
  res.send("OK.");
});

app.post("/llmAnalyze", async (req: Request, res: Response) => {
  // TODO: add zod to parse the input

  const { melody, style, level } = req.body;
  // const systemPrompt = `You are a Music Composer and Teacher, Harmonize the following Melody in the following style: ${style}, return the results in JSON.`;
  // const userPrompt = `The Melody : [${melody.join(", ")}]`;

  console.log(melody, style, level);
  const prompt = `
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
  const result = await postOpenAI(prompt);
  // const result = {
  //   harmony: [
  //     {
  //       note: "C",
  //       chord: "Cmaj7",
  //       romanNumeral: "I",
  //       commentary:
  //         "The melody starts on C, so harmonizing with a tonic major 7th chord (Cmaj7) establishes the home key (assuming C major or related tonality). The choice of Cmaj7 adds a smooth, mellow character typical of Bossa Nova. The chord voice-leads naturally from root to 7th (B) in subsequent chords.",
  //       extensions: ["9 (D)"],
  //       potentialScales: ["C major scale", "Lydian mode (if adding #4)"],
  //     },
  //     {
  //       note: "F",
  //       chord: "F6/9",
  //       romanNumeral: "IV",
  //       commentary:
  //         "F functions as the subdominant (IV). Using F6/9 enriches the harmony with colorful extensions commonly found in Bossa Nova, providing a smooth, sophisticated sound and creating a gentle movement away from the tonic.",
  //       extensions: ["13 (D#arguable, but optional)"],
  //       potentialScales: [
  //         "F major scale",
  //         "Lydian mode (B flat Lydian for color)",
  //       ],
  //     },
  //     {
  //       note: "B",
  //       chord: "E7b9",
  //       romanNumeral: "V7b9 / V7 (secondary dominant)",
  //       commentary:
  //         "B is not diatonic to C major but functions here as a leading tone to G. E7b9 (E–G#–B–D–F) creates a strong V7b9 dominant to resolve to G, typical in jazz-inflected Bossa Nova. The altered extension adds tension and color.",
  //       extensions: ["b9 (F)"],
  //       potentialScales: ["E altered scale", "Whole-tone scale starting on E"],
  //     },
  //     {
  //       note: "E#",
  //       chord: "G7#5",
  //       romanNumeral: "V7#5 (secondary dominant for Am or leading to A)",
  //       commentary:
  //         "E# is enharmonically F, implying a chord with altered tones. G7#5 adds chromatic color and tension, suitable for a passing modulation or to add complexity in voice leading. In Bossa Nova, such altered chords provide a nuanced, sophisticated harmonic palette.",
  //       extensions: ["#9 (#A), #13 (#E)"],
  //       potentialScales: ["Altered scale (chromatic approach)"],
  //     },
  //     {
  //       note: "G",
  //       chord: "G13",
  //       romanNumeral: "V (dominant)",
  //       commentary:
  //         "G as the final note functions as the dominant chord, G13 to create a rich, resonant sound with extensions that evoke the relaxed yet sophisticated feel of Bossa Nova. It prepares for either a tonic resolution or an open-ended phrase.",
  //       extensions: ["13 (E)", "9 (A)"],
  //       potentialScales: ["G Mixolydian", "G Major scale"],
  //     },
  //   ],
  //   advices: [
  //     {
  //       advice: "Use Voice Leading to Smooth Chord Transitions",
  //       example:
  //         "From Cmaj7 to F6/9, move desires tones by semitone or whole tone; for instance, the 3rd of Cmaj7 (E) descending to the 3rd of F6/9 (A), maintaining a gentle, connected voice line, typical of Bossa Nova's subtle movement.",
  //     },
  //     {
  //       advice: "Incorporate Extended Chords with Colorful Tensions",
  //       example:
  //         "For the G13 chord, add the 9th (A) or 11th (C) to enrich the harmony, creating lush, sophisticated sounds inherently suited to Bossa Nova's gentle jazz-inflected vibe.",
  //     },
  //     {
  //       advice:
  //         "Experiment with Modal Interchange and Altered Scales for Improvisation",
  //       example:
  //         "Over the E7b9, try improvising using the altered scale (E, F, G#, B♭, C, D), which adds tension and chromatic flavor consistent with Bossa Nova's playful harmonic language.",
  //     },
  //   ],
  // };

  if (!result) {
    res.status(500).json({ error: "AI failed to generate response." });
  }
  res.status(200).json({ result });
});

app.listen(port, () => {
  console.log(`🎼🎻 Server listening on port http://localhost:${port}`);
});
