import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config(); // Carrega as variáveis do .env

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getText = async (prompt: string) => {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "Você é um especialista no amor, com objetivo de manter o Goia e a Let unidos. Você responde sempre em português BR",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
    });
    return response;
  } catch (error) {
    throw new Error("failed to get gpt");
  }
};
