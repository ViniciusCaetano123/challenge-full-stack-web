import jwt from 'jsonwebtoken';
import { env } from '../env';
import { IUser } from '../interfaces/user';


export function generateToken(user:IUser): string {
  const payload = {
    id: user.id,
    nome: user.nome,
    email: user.email,
    perfil: [user.perfil]
  };
  
  return jwt.sign(payload, env.JWT_SECRET);
}

export function verifyToken(token: string) {
  try {    
    return jwt.verify(token, env.JWT_SECRET);
  } catch (error) {  
    console.error('Erro ao verificar token:', error); 
    return null;
  }
}