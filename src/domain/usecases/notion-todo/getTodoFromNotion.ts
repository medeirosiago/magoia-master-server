// src/domain/usecases/notion-todo/getTodoFromNotion.ts
import { inject, injectable } from 'inversify';
import { Notion } from '@domain/gateways/NotionGateway';

import { NotionDatabaseResponse, NotionPage, SimplifiedTask } from '@domain/entities/Notion'; // Importe os tipos definidos previamente

@injectable()
export class GetTodoFromNotionUseCase {
  constructor(
    @inject('Notion') private notionGateway: Notion
  ) {}

  async execute(databaseId: string): Promise<any> {
    const database = await this.notionGateway.getDatabase(databaseId);
    const payload = mapNotionToSimplifiedTasks(database);
    return payload;
  }
}


export function mapNotionToSimplifiedTasks(response: NotionDatabaseResponse): SimplifiedTask[] {
  return response.results.map((page) => {
    const properties = page.properties;

    // Nome da Tarefa
    const nameProperty =
      properties['Task name']?.type === 'title'
        ? properties['Task name'].title[0]?.plain_text || 'Unnamed Task'
        : 'Unnamed Task';

    // Detalhes da Tarefa
    const descriptionProperty =
      properties['Description']?.type === 'rich_text'
        ? properties['Description'].rich_text[0]?.plain_text
        : undefined;

    // Status da Tarefa
    const completed =
      properties['Status']?.type === 'status'
        ? properties['Status'].status?.name.toLowerCase() === 'done'
        : false;

    // Data de Conclusão
    const dueDate =
      properties['Due']?.type === 'date'
        ? properties['Due'].date?.start
        : undefined;

    // Responsáveis
    const assignees =
      properties['Assign']?.type === 'people'
        ? properties['Assign'].people.map((person) => person.name)
        : [];

    return {
      id: page.id,
      name: nameProperty,
      description: descriptionProperty,
      completed,
      dueDate,
      assignees,
    };
  });
}
