import { inject, injectable } from "inversify";
import { OpenAi } from "@domain/gateways/OpenAiGateway";

@injectable()
export class GetTextUsecase {
	constructor(@inject("OpenAi") private openAiGateway: OpenAi) {}
	async execute(prompt: string): Promise<any> {
		console.log("🚀 ~ GetTextUsecase ~ execute ~ prompt:", prompt)
		const response = await this.openAiGateway.getText(prompt);
		console.log({ ...response });
		return response;
	}
}
