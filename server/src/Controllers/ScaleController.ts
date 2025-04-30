import { getScales } from "../Repositories/ScaleRepository";
import { Request, Response } from "express";

export async function ControlerGetScales(_: Request, res: Response) {
  const scales = await getScales();
  res.status(200).json({ scales });
}
