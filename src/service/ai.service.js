import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const generateCaption = async (image) => {
  const contents = [
    {
      inlineData: {
        mimeType: "image/jpeg",
        data: image,
      },
    },
    { text: "Caption this image." },
  ];

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: contents,
    config: {
      systemInstruction:
        "You'll be given an image as input and you have to generate a humorous caption for it. Include emojis and hashtags and keep the caption one-liner or short",
    },
  });
  console.log(response.text);

  return response.text;
};

export default generateCaption;
