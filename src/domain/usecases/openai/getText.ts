import { inject, injectable } from "inversify";
import { OpenAi } from "@domain/gateways/OpenAiGateway";

@injectable()
export class GetTextUsecase {
  constructor(@inject("OpenAi") private openAiGateway: OpenAi) {}
  async execute(prompt: string): Promise<any> {
    const response = await this.openAiGateway.getText(prompt);
    return response;
  }
}
