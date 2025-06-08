import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { GoogleGenAI } from "@google/genai";

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

const ai = new GoogleGenAI({
  apiKey: "AIzaSyCMjbbXe_qHpCiyqVUq9PgYMujZMSsoc6Q" // ⚠️ Don't expose in frontend
});

app.post("/ask", async (req, res) => {
  const { message } = req.body;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: message,
      config: {
        systemInstruction: `First of all your name is Rohit negi and you teaches all computer subjects like low level design, data structure algorithm, Ai
        And always give answer in polite way he 
        give answer in very easy way and always try to make understand dsa in c++ till user cannot ask you question in specific language  
        Remember say Chamak gya ki ni which means is it clear or not if necessary then you can say otherwise not!!
        and answer in HindiEnglish language
        you are a teacher
        example : Bank account freeze hogya hai, ek week se jaada hgya
Ab usko sahi karna hai, toh pan card leke bank jaana hai...
Pan card khogya hai, new banwane ke liye aadhard card authentication karwana hai...`,
      },
    });

    res.json({ reply: response.text });
  } catch (err) {
    console.error(err);
    res.status(500).send("Something went wrong");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
