// src/application/adapters/NotionAdapter.ts
import { injectable } from 'inversify';
import { Notion } from '@domain/gateways/NotionGateway';
import { getDatabase, getPage } from '@application/gateways/NotionAPI';

import { getText } from '@application/gateways/OpenAiAPI';
import { OpenAi } from '@domain/gateways/OpenAiGateway';

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
