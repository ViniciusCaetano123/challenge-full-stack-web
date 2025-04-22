import { FastifyPluginAsyncZod } from 'fastify-type-provider-zod';
import { studentRequestSchema,studentQueryStrSchema,studentUpdateSchema,studentParamsIdSchema } from '../schemas/student.schema';
import studentController from '../controllers/students.controller';
import { authMiddleware } from '../middlewares/middleware.auth';
import { authorizeRoles } from '../middlewares/middleware.role';
const studentsRoutes: FastifyPluginAsyncZod = async function (fastify) {
    fastify.route({
        method: 'POST',
        url: '',
        schema: {
            body: studentRequestSchema,
            tags: ['Aluno'],
            summary: 'Criação de aluno',
        },
        preHandler: [authMiddleware, authorizeRoles(['admin'])], 
        handler: studentController.create
    });
    fastify.route({
        method: 'GET',
        url: '',
        schema: {
            tags: ['Aluno'],
            summary: 'Listar alunos',
            querystring: studentQueryStrSchema
        },
        preHandler: [authMiddleware, authorizeRoles(['admin'])], 
        handler: studentController.getList
    });
    fastify.route({
        method: 'GET',
        url: '/:id',
        schema: {
            tags: ['Aluno'],
            summary: 'Buscar aluno por ID',
            params: studentParamsIdSchema       
        },
        preHandler: [authMiddleware, authorizeRoles(['admin'])], 
        handler: studentController.getById
    });
    fastify.route({
        method: 'PUT',
        url: '/:id',
        schema: {
            tags: ['Aluno'],
            summary: 'Atualizar aluno por ID',
            params:studentParamsIdSchema,
            body: studentUpdateSchema
        },
        preHandler: [authMiddleware, authorizeRoles(['admin'])], 
        handler: studentController.updateById
    });
};

export default studentsRoutes;



