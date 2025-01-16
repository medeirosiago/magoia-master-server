import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import "../configuration/makeAliases"; // Supondo que configura os aliases
import apiRouter from "@app/server/apiRouter"; // Importa o roteador principal

dotenv.config();

const app = express();
const { PI_LOCAL_ADDRESS, PI_LOCAL_PORT } = process.env;

app.use(
  cors({
    origin: "http://localhost:3000", // Altere para a URL do seu frontend
    methods: ["GET", "POST", "PUT", "DELETE"], // Métodos permitidos
    allowedHeaders: ["Content-Type", "Authorization"], // Cabeçalhos permitidos
  }),
);

// Middleware para JSON
app.use(express.json());

// Conecta o roteador principal ao servidor
app.use("/api", apiRouter);

// Inicializa o servidor
app.listen(PI_LOCAL_PORT, () => {
  console.log(
    `Server is running at http://${PI_LOCAL_ADDRESS}:${PI_LOCAL_PORT}`,
  );
});

export default app;
