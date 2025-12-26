import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;

  const completion = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: "You are role-playing a scenario." },
      { role: "user", content: message }
    ]
  });

  res.json({
    response: completion.choices[0].message.content
  });
});

app.listen(3000, () => console.log("API running"));
