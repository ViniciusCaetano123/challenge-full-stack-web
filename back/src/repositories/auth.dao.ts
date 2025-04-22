import { db } from '../connectionDb/mysql.db';
import { compare } from 'bcrypt';
import { IUser } from '../interfaces/user';
import {formatDate} from '../utils/formatters';
export const authDAO = {
  async authenticate(
    email: string, 
    senha: string
  ) {
    try {
      console.log(email, senha)
      const [rows] = await db.execute(
        'SELECT * FROM usuarios WHERE email = ?',
        [email]
      );
      
      const users = rows as IUser[];
     
      if (users.length === 0) {
        return null;
      }
      
      const user = users[0];      
    
      const passwordMatch = await compare(senha, user.senha || '');
      
      if (!passwordMatch) {
        return null;
      }
      
      return {
        id: user.id,
        nome: user.nome,
        email: user.email,
        perfil: user.perfil,
        created_at: formatDate(user.created_at),
        updated_at: formatDate(user.updated_at)
      } ;
    } catch (error) {
      console.error('Erro ao autenticar usuário:', error);
      return null
    }
  }
};