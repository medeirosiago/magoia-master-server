// src/infrastructure/inversify.config.ts
import 'reflect-metadata';
import { Container } from 'inversify';
import { Notion } from '@domain/gateways/NotionGateway';
import { OpenAi } from '@domain/gateways/OpenAiGateway';



import { NotionAdapter } from '@application/configuration/ioc';
import { OpenAiAdapter } from '@application/configuration/ioc';
import { GetTodoFromNotionUseCase } from '@domain/usecases/notion-todo/getTodoFromNotion';

import { GetTextUsecase } from '@domain/usecases/openai/getText';

const container = new Container();

// Bindings
container.bind<Notion>('Notion').to(NotionAdapter);
container.bind<GetTodoFromNotionUseCase>(GetTodoFromNotionUseCase).toSelf();
container.bind<OpenAi>('OpenAi').to(OpenAiAdapter);
container.bind<GetTextUsecase>(GetTextUsecase).toSelf();

export { container };
