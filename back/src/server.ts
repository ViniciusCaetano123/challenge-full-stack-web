import { env } from "./env";
import app from "./app.js";

async function start() {
  try {
    await app.listen({
      port: env.PORT,
      host: "0.0.0.0",
    });

    console.log(`Servidor rodando em http://localhost:${env.PORT}`);
    console.log(
      `Documentação Swagger disponível em http://localhost:${env.PORT}/docs`
    );
  } catch (error) {
    console.error("Erro ao iniciar o servidor:", error);
    process.exit(1);
  }
}

start();
