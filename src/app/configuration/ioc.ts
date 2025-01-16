// src/application/adapters/NotionAdapter.ts
import { injectable } from "inversify";
import { Notion } from "@domain/gateways/NotionGateway";
import { getDatabase, getPage } from "@app/gateways/NotionAPI";

import { getText } from "@app/gateways/OpenAiAPI";
import { OpenAi } from "@domain/gateways/OpenAiGateway";

import { HomeAssitantGateway } from "@domain/gateways/HomeAssistantGateway";
import { turnByEntityAndDomain } from "@app/gateways/HAAPI";

@injectable()
export class NotionAdapter implements Notion {
  async getDatabase(databaseId: string): Promise<any> {
    return getDatabase(databaseId);
  }

  async getPage(pageId: string): Promise<any> {
    return getPage(pageId);
  }
}

@injectable()
export class OpenAiAdapter implements OpenAi {
  async getText(prompt: string): Promise<any> {
    return getText(prompt);
  }
}

@injectable()
export class HomeAssitantAdapter implements HomeAssitantGateway {
  async turnByEntityAndDomain(
    entityId: string | string[],
    haDomain: string,
    status: string,
  ): Promise<any> {
    return turnByEntityAndDomain(entityId, haDomain, status);
  }
}
