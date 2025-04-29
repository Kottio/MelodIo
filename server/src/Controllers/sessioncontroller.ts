import sessionRepo from "../Repositories/sessionRepository";
import { Request, Response } from "express";

const sessionControler = {
  getSessions: async function (req: Request, res: Response) {
    const { partId } = req.params;
    const sessions = await sessionRepo.getSession(+partId);

    if (sessions) {
      res.status(200).json({ sessions });
    } else {
      res.status(404).json({ message: "No session" });
    }
  },
  postMelody: async function (req: Request, res: Response) {
    const { partId, melody } = req.body;
    const result = await sessionRepo.postMelody(partId, melody);
    if (result) {
      res.status(202).json({ message: "Session Created and Melody Saved" });
    }
  },
  putHarmonization: async function (req: Request, res: Response) {
    const { partId } = req.params;
    const { harmonization, style } = req.body;
    console.log("From the controller", partId, harmonization);

    const result = await sessionRepo.putHarmonization(
      +partId,
      harmonization,
      style
    );
    if (result) {
      res.status(202).json({ message: "harmony Saved" });
    } else {
      res
        .status(400)
        .json({ message: "An error occurred when saving the harmonization" });
    }
  },
};
export default sessionControler;
