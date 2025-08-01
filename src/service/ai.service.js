import { GoogleGenAI } from "@google/genai";


const ai = new GoogleGenAI({
    apiKey:""
});

async function main() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "which model is best as of now",
  });
  console.log(response.text);
}

main();