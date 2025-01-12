// src/application/entrypoints/api/notion/controller.ts
import { Request, Response } from 'express';
import { container } from '@application/configuration/ioc.config';
import { GetTextUsecase } from '@domain/usecases/openai/getText';


const getTextUsecase = container.get(GetTextUsecase);

export const getText = async (req: Request, res: Response) => {
  console.log("🚀 ~ getText ~ req:", req.body.prompt)
  try {
    const data = await getTextUsecase.execute(req.body.prompt);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
