import express, {Request, Response} from "express"
import cors from "cors"
import morgan from "morgan"
import dotenv from "dotenv"
import OpenAI from "openai"
import { StringifyOptions } from "querystring"

dotenv.config()

let LLMresults = {}


const postOpenAI = async function(systemPrompt:string, userPrompt:string){
  const key = process.env.OpenAIkey
  const openaiClient = new OpenAI({apiKey:key})

  const response = await openaiClient.chat.completions.create({
    model: "gpt-4.1-nano",
    store: true,
    messages: [
      {role: "system", content: systemPrompt},
      {role: "user", content: userPrompt},
    ],
  });
const results = response.choices[0].message?.content;
if(results){ LLMresults = results
return results}
}



const app = express()
const port = 8080;

app.use(morgan('dev'))
app.use(cors())
app.use(express.json())


app.get("/",  (req: Request, res: Response)=>{
  res.send("Hey it'Wokring man")
})

app.post("/llmAnalyze",async (req:Request,  res: Response)=>{
  const {melody, style} = req.body
  const systemPrompt = `You are a Music Composer and Teacher, Harmonize the following Melody in the following style: ${style}, return the results in JSON.`
  const userPrompt = `The Melody : [${melody.join(', ')}]`
  const result = await postOpenAI(systemPrompt, userPrompt)
 if (!result) {
   res.status(500).json({ error: "AI failed to generate response." });
  }
  res.status(200).json({result})

})





app.listen(port, () => {
  console.log(`🎼🎻 Server listening on port http://localhost:${port}`);
});




