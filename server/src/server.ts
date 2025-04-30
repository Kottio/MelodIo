import express from "express";
import cors from "cors";
import morgan from "morgan";
import llmControllers from "./Controllers/LlmController";
import compController from "./Controllers/CompositionsController";
import partController from "./Controllers/partsController";
import sessionControler from "./Controllers/sessioncontroller";
import { ControlerGetScales } from "./Controllers/ScaleController";
const app = express();
const port = 8080;

app.use(morgan("dev"));
app.use(cors());
app.use(express.json());

app.get("/compositions", compController.getAllCompositions);
app.post("/composition", compController.postComposition);

app.get("/:compositionid/Parts", partController.getPart);
app.post("/:compositionid/Parts", partController.postNewPart);

app.post("/harmonize", llmControllers.harmonizeController);

app.get("/:partId/session", sessionControler.getSessions);
app.post("/:partId/melody", sessionControler.postMelody);
app.put("/:partId/harmonization", sessionControler.putHarmonization);

app.get("/Scales", ControlerGetScales);
app.listen(port, () => {
  console.log(`🎼🎻 Server listening on port http://localhost:${port}`);
});
