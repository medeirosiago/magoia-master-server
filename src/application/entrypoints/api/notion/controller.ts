import { Request, Response } from 'express';
import { getDatabase, getPage } from '@application/gateways/NotionAPI';
import dotenv from 'dotenv';
dotenv.config();

const { NOTION_PAGE_ID, NOTION_KEY } = process.env;

export const fetchDatabase = async (req: Request, res: Response) => {
  const databaseId = NOTION_PAGE_ID;
  try {
    const data = await getDatabase(databaseId);
    res.status(200).json(data);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

export const fetchPage = async (req: Request, res: Response) => {
  const pageId = NOTION_PAGE_ID;

  try {
    const data = await getPage(pageId);
    res.status(200).json(data);
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
