// src/application/entrypoints/api/notion/controller.ts
import { Request, Response } from 'express';
import { container } from '@application/configuration/ioc.config';
import { GetTodoFromNotionUseCase } from '@domain/usecases/notion-todo/getTodoFromNotion';

const getTodoFromNotionUseCase = container.get(GetTodoFromNotionUseCase);

export const fetchDatabase = async (req: Request, res: Response) => {
  const { NOTION_PAGE_ID } = process.env;
  
  try {
    const data = await getTodoFromNotionUseCase.execute(NOTION_PAGE_ID as string);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// import { Request, Response } from 'express';
// import { getDatabase, getPage } from '@application/gateways/NotionAPI';
// import dotenv from 'dotenv';
// dotenv.config();

// const { NOTION_PAGE_ID } = process.env;

// export const fetchDatabase = async (req: Request, res: Response) => {
//   const databaseId = NOTION_PAGE_ID;
  
//   try {
//     const data = await getDatabase(databaseId);
//     res.status(200).json(data);
//   } catch (error) {
//       res.status(500).json({ ...error });
//   }
// };

// export const fetchPage = async (req: Request, res: Response) => {
//   const pageId = NOTION_PAGE_ID;

//   try {
//     const data = await getPage(pageId);
//     res.status(200).json(data);
//   } catch (error) {
//       res.status(500).json({ error: error.message });
//   }
// };

