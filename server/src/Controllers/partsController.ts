import partRepo from "../Repositories/partsRepository";
import { Request, Response } from "express";

const partController = {
  getPart: async function (req: Request, res: Response) {
    const { compositionid } = req.params;
    const parts = await partRepo.getParts(compositionid);
    if (parts) {
      res.status(200).json({ parts });
    } else {
      res.status(400).json({ error: "Could not get the parts" });
    }
  },

  postNewPart: async function (req: Request, res: Response) {
    const { name, type, compositionId } = req.body;
    const response = await partRepo.postPart(name, type, compositionId);
    if (response) {
      res.status(201).json({ messgae: "Part Saved!" });
    }
  },
};
export default partController;
