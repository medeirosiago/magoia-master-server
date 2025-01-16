// src/application/entrypoints/api/notion/controller.ts
import { Request, Response } from "express";
import { container } from "@app/configuration/ioc.config";
import { Lights } from "@domain/usecases/homeassistant/lights";

const lightsUseCase = container.get(Lights);

export const on = async (req: Request, res: Response) => {
  console.log("chegando na controller");
  try {
    const data = await lightsUseCase.on();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const off = async (req: Request, res: Response) => {
  try {
    const data = await lightsUseCase.off();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
