import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { userRequestSchema } from '../schemas/user.schema';
import userController from '../controllers/user.controller';
import { authMiddleware } from '../middlewares/middleware.auth';
import { authorizeRoles } from '../middlewares/middleware.role';
const userRoutes: FastifyPluginAsyncZod = async function (fastify) {
    fastify.route({
        method: 'POST',
        url: '',
        schema: {
            body: userRequestSchema,
            tags: ['Usuario'],
            summary: 'Criação de usuário',
        },
        handler: userController.create
    });
    fastify.route({
        method: 'GET',
        url: '/profile',
        schema: {
            tags: ['Usuario'],
            summary: 'Informações do usuário',
        },
        preHandler: [authMiddleware, authorizeRoles(['admin'])], 
        handler: userController.getProfile
    });
};

export default userRoutes;



