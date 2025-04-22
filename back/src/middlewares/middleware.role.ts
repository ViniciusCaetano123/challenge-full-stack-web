import { FastifyRequest, FastifyReply } from 'fastify';

export function authorizeRoles(allowedRoles: string[]) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const user = request.user;
    
    const hasPermission = user.perfil.some((role: string) => allowedRoles.includes(role));

    if (!hasPermission) {
      return reply.status(403).send({ message: 'Acesso negado: permissão insuficiente' });
    }
  };
}
