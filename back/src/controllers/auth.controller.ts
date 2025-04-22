import { FastifyReply, FastifyRequest } from "fastify";
import { authDAO } from "../repositories/auth.dao";
import { authRequestSchema } from "../schemas/auth.schema";
import { z } from "zod";
import { generateToken } from "../utils/jwt";

export const authController = {
  async login(
    request: FastifyRequest<{ Body: z.infer<typeof authRequestSchema> }>,
    reply: FastifyReply
  ) {
    try {
      const { email, password } = request.body;

      const user = await authDAO.authenticate(email, password);

      if (!user) {
        return reply.status(401).send({
          message: "Credenciais inválidas",
        });
      }

      const token = generateToken(user);
      
      return reply.send({
        message: "Login realizado com sucesso",
        payload: { ...user, perfil: [user.perfil], token },
      });
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        message: "Erro interno do servidor",
      });
    }
  },
};
