import express, {Request, Response} from "express";
const app = express()
const port = 8080;
app.get("/", (req: Request, res: Response)=>{
  res.send("Hey it'Wokring man")
})

app.get("/", (req, res)=>{
  res.send("Hey it'Wokring man")
})


app.listen(port, () => {
  console.log(`🎼🎻 Server listening on port http://localhost:${port}`);
});