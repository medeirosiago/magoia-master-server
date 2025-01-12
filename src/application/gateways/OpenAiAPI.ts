import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config(); // Carrega as variáveis do .env

const openai = new OpenAI({
	apiKey: process.env.OPENAI_API_KEY,
});

export const getText = async (prompt: string) => {
	try {
		console.log("🚀 ~ getText ~ prompt:", prompt);

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
		console.log("🚀 ~ getText ~ response:", response);
		return response;
	} catch (error) {
		console.log("🚀 ~ getText ~ error:", error)
		throw new Error("failed to get gpt");
	}
};
