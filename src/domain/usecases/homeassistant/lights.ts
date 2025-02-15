import { inject, injectable } from "inversify";
import { HomeAssitantGateway } from "@domain/gateways/HomeAssistantGateway";

@injectable()
export class Lights {
  constructor(
    @inject("HomeAssitantGateway")
    private homeAssisantGateway: HomeAssitantGateway,
  ) {}
  async off(): Promise<any> {
    const response = await this.homeAssisantGateway.turnByEntityAndDomain(
      ["light.luz", "light.filamento"],
      "light",
      "off",
    );
    return response;
  }

  async on(): Promise<any> {
    const response = await this.homeAssisantGateway.turnByEntityAndDomain(
      ["light.luz", "light.filamento"],
      "light",
      "on",
    );
    return response;
  }
}
