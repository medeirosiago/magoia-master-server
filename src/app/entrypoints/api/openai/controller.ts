// src/application/entrypoints/api/notion/controller.ts
import { Request, Response } from "express";
import { container } from "@app/configuration/ioc.config";
import { GetTextUsecase } from "@domain/usecases/openai/getText";

const getTextUsecase = container.get(GetTextUsecase);

export const getText = async (req: Request, res: Response) => {
  try {
    const data = await getTextUsecase.execute(req.body.prompt);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
