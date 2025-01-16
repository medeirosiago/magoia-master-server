// src/infrastructure/inversify.config.ts
import "reflect-metadata";
import { Container } from "inversify";
import { Notion } from "@domain/gateways/NotionGateway";
import { OpenAi } from "@domain/gateways/OpenAiGateway";
import { HomeAssitantGateway } from "@domain/gateways/HomeAssistantGateway";

/**
 * Adapters
 */
import {
  NotionAdapter,
  OpenAiAdapter,
  HomeAssitantAdapter,
} from "@app/configuration/ioc";

/**
 * Usecases
 */
import { GetTodoFromNotionUseCase } from "@domain/usecases/notion-todo/getTodoFromNotion";
import { GetTextUsecase } from "@domain/usecases/openai/getText";
import { Lights } from "@domain/usecases/homeassistant/lights";

const container = new Container();

// Bindings
container.bind<Notion>("Notion").to(NotionAdapter);
container.bind<GetTodoFromNotionUseCase>(GetTodoFromNotionUseCase).toSelf();
container.bind<OpenAi>("OpenAi").to(OpenAiAdapter);
container.bind<GetTextUsecase>(GetTextUsecase).toSelf();
container
  .bind<HomeAssitantGateway>("HomeAssitantGateway")
  .to(HomeAssitantAdapter);
container.bind<Lights>(Lights).toSelf();

export { container };
