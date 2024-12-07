import express from 'express';
import dotenv from 'dotenv';
import '../configuration/makeAliases'; // Supondo que configura os aliases
import apiRouter from '@application/server/apiRouter'; // Importa o roteador principal

dotenv.config();

const app = express();
const { PI_LOCAL_ADDRESS, PI_LOCAL_PORT } = process.env;

// Middleware para JSON
app.use(express.json());

// Conecta o roteador principal ao servidor
app.use('/api', apiRouter); // Todas as rotas em `apiRouter` estarão sob o prefixo `/api`

// Inicializa o servidor
app.listen(PI_LOCAL_PORT, () => {
  console.log(`Server is running at http://${PI_LOCAL_ADDRESS}:${PI_LOCAL_PORT}`);
});

export default app;
