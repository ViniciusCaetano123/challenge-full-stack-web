import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { authRequestSchema } from '../schemas/auth.schema';
import { authController } from '../controllers/auth.controller';

const authRoutes: FastifyPluginAsyncZod = async function (fastify) {
  fastify.route({
    method: 'POST',
    url: '/login',
    schema: {
      body: authRequestSchema,
      tags: ['Autenticação'],
      summary: 'Login de usuário'
    },
    handler: authController.login
  });
};

export default authRoutes;