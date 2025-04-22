import { db } from '../connectionDb/mysql.db';
import { hash } from 'bcrypt';
import { userRequestSchema } from '../schemas/user.schema';
import { z } from 'zod';
import { IUser } from '../interfaces/user';

 export  async  function createUser(userData: z.infer<typeof userRequestSchema>)
  {
    try {   
      const hashedPassword = await hash(userData.password, 10);  
   
      await db.execute(
        'INSERT INTO usuarios (nome, senha, email) VALUES (?, ?, ?)',
        [userData.name, hashedPassword, userData.email]
      );      
   
    } catch (error) {
      console.error('Erro ao criar usuário:', error); 
      return null;
    }
  }
  
  export  async function getUserById(id: string ){
    try {
      const [rows] = await db.execute(
        'SELECT * FROM usuarios WHERE id = ?',
        [id]
      );
      
      const users = rows as IUser[];
      
      if (users.length === 0) {
        return null;
      }
      
      const [user] = users;
      
      return {
        id: user.id,
        nome: user.nome,
        email: user.email,
        perfil: user.perfil,
        created_at: user.created_at ? new Date(user.created_at).toISOString() : undefined,
        updated_at: user.updated_at ? new Date(user.updated_at).toISOString() : undefined
      };
    } catch (error) {     
      console.error('Erro ao buscar usuário:', error); 
      return null;
    }
  }
