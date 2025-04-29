import compRepo from "../Repositories/CompositionRepository";
import { Response, Request } from "express";

const compController = {
  getAllCompositions: async function (_: Request, res: Response) {
    const compositions = await compRepo.getAllCompositions();
    if (compositions) {
      res.status(200).json({ compositions });
    }
  },
  postComposition: async function (req: Request, res: Response) {
    const { name, description, style } = req.body;
    compRepo.newComposition(name, description, style);
    res.status(200).send("Yeah");
  },
};

export default compController;
