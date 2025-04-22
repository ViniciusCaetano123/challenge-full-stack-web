import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, getUserById } from "../repositories/user.dao";
import { userRequestSchema } from "../schemas/user.schema";
import { z } from "zod";
import { formatDate } from "../utils/formatters";
export default {
  async create(
    request: FastifyRequest<{ Body: z.infer<typeof userRequestSchema> }>,
    reply: FastifyReply
  ) {
    try {
      const { email, password, name } = request.body;

      await createUser({ email, password, name });

      return {
        message: "Usuario criado com sucesso",
      };
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        message: "Erro interno do servidor",
      });
    }
  },
  async getProfile(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.user;
      const user = await getUserById(id);

      if (!user) {
        return reply.status(404).send({ message: "Usuário não encontrado" });
      }

      const userFormatado = {
        ...user,
        created_at: user.created_at ? formatDate(user.created_at) : undefined,
        updated_at: user.updated_at ? formatDate(user.updated_at) : undefined,
      };

      return userFormatado;
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        message: "Erro interno do servidor",
      });
    }
  },
};
