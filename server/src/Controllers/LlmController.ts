import { Request, Response } from "express";
import llmCalls from "../Repositories/LlmRepository";

const llmControllers = {
  harmonizeController: async function (req: Request, res: Response) {
    const { melody, style, level } = req.body;
    console.log(melody);
    const JsonHarmonized = await llmCalls.harmonize(melody, style, level);
    if (!JsonHarmonized) {
      res
        .status(500)
        .json({ error: "AI failed to generate response. Controller Level" });
    }
    console.log("In the Controller", JsonHarmonized);
    res.status(200).json({ JsonHarmonized });
  },
};
export default llmControllers;
