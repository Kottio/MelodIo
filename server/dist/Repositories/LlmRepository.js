"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = __importDefault(require("openai"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let LLMresults = {};
const postOpenAI = function (prompt) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const key = process.env.OpenAIkey;
        const openaiClient = new openai_1.default({ apiKey: key });
        const response = yield openaiClient.chat.completions.create({
            model: "gpt-4.1-mini",
            store: true,
            messages: [
                { role: "system", content: prompt },
                // { role: "user", content: userPrompt },
            ],
        });
        const results = (_a = response.choices[0].message) === null || _a === void 0 ? void 0 : _a.content;
        if (results) {
            // Clean if the result start with ```json
            LLMresults = results;
            console.log(results);
            return results;
        }
    });
};
const llmCalls = {
    harmonize: function (melody, style, level) {
        return __awaiter(this, void 0, void 0, function* () {
            const promptHarmonize = `
You are a highly experienced Music Composer and Teacher specializing in ${style} harmony. Your students are ${level} music theory students with ${level === "beginner"
                ? "a basic understanding of chords"
                : level === "intermdiate"
                    ? "a solid grasp of diatonic harmony"
                    : "a strong understanding of jazz harmony and voice leading"}.
Your task is to harmonize the following melody:  [${melody.join(", ")}] in the style of ${style}.

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
            const result = yield postOpenAI(promptHarmonize);
            if (result) {
                return result;
            }
            else {
                console.log("An error occured in the repository");
            }
        });
    }
};
exports.default = llmCalls;
