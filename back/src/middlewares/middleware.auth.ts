import { FastifyRequest, FastifyReply } from 'fastify';
import { verifyToken } from '../utils/jwt';

export async function authMiddleware(
  request: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const authHeader = request.headers.authorization;
    
    if (!authHeader) {
      return reply.status(401).send({ message: 'Token não fornecido' });
    }
   
    const token = authHeader.replace('Bearer', '').trim()      
  
    const user = verifyToken(token);
    console.log(user)
    if (!user) {
      return reply.status(401).send({ message: 'Token inválido' });
    }    
    
    request.user = user;    
  } catch (error) {
    return reply.status(401).send({ message: 'Falha na autenticação' });
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    user?: any;
  }
}