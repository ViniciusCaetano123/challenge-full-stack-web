import { fastifyCors } from "@fastify/cors";
import { fastifySwagger } from "@fastify/swagger";
import { fastifySwaggerUi } from "@fastify/swagger-ui";
import { fastify } from "fastify";
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";

import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import studentsRoutes from "./routes/students.route";

const app = fastify({logger: {
  level: 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      translateTime: 'dd/mm/yyyy HH:MM:ss O'
    }
  }
}}).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler);
app.setSerializerCompiler(serializerCompiler);

app.register(fastifyCors, {
  origin: true,
});

  

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Sistema de Gestão Acadêmica",
      version: "1.0.0",
      description:
        "API para gerenciamento de alunos, cursos, turmas e matrículas",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [{ bearerAuth: [] }],
  },
  transform: jsonSchemaTransform,
});

app.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

app.register(authRoutes, { prefix: "/auth" });
app.register(userRoutes, { prefix: "/user" });
app.register(studentsRoutes, { prefix: "/students" });

export default app;
