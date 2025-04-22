import { db } from '../src/connectionDb/mysql.db';
import { 
  createStudent, 
  getStudents, 
  getStudentByRA, 
  updateStudent, 
  deleteStudent 
} from '../src/repositories/students.dao'; 
import { jest } from '@jest/globals';


describe('Student Module Tests', () => {
  // Mocks para dados de teste
  const mockStudent = {
    cpf: '123.456.789-00',
    email: 'aluno@example.com',
    nome: 'Aluno Teste',
    ra: 'RA12345'
  };

  const mockParams = {
    nome: 'Aluno',
    email: null,
    cpf: null,
    ra: null,
    pagina: 1,
    limite: 10
  };

  const mockStudentsList  = [
    {
      cpf: '123.456.789-00',
      email: 'aluno1@example.com',
      nome: 'Aluno Um',
      ra: 'RA12345'
    },
    {
      cpf: '987.654.321-00',
      email: 'aluno2@example.com',
      nome: 'Aluno Dois',
      ra: 'RA67890'
    }
  ];

  const mockTotal = [{ total: 2 }];

  // Reset dos mocks após cada teste
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createStudent', () => {
    it('deve inserir um aluno no banco de dados', async () => {
      // Mock do db.execute para simular sucesso
      jest.spyOn(db, 'execute').mockResolvedValueOnce([[], []]);

      await createStudent(mockStudent);

      expect(db.execute).toHaveBeenCalledWith(
        'INSERT INTO alunos (cpf, email, nome, ra) VALUES (?, ?, ?, ?)',
        [mockStudent.cpf, mockStudent.email, mockStudent.nome, mockStudent.ra]
      );
    });

    it('deve lançar um erro quando a inserção falhar', async () => {
      // Mock do db.execute para simular falha
      jest.spyOn(db, 'execute').mockRejectedValueOnce(new Error('Database error'));

      await expect(createStudent(mockStudent)).rejects.toThrow('Erro ao criar aluno');
    });
  });

  describe('getStudents', () => {
    it('deve retornar uma lista de alunos com o total', async () => {
      // Mock do db.execute para simular retorno de lista de alunos
      jest.spyOn(db, 'execute').mockResolvedValueOnce([[mockStudentsList , mockTotal], []]);

      const result = await getStudents(mockParams);

      expect(db.execute).toHaveBeenCalledWith(
        'CALL listar_alunos(?, ?, ?, ?, ?, ?)',
        [
          mockParams.nome,
          mockParams.email,
          mockParams.cpf,
          mockParams.ra,
          mockParams.pagina,
          mockParams.limite
        ]
      );

      expect(result).toEqual({
        itens: mockStudentsList,
        total: mockTotal[0].total
      });
    });

    it('deve lançar um erro quando a busca falhar', async () => {
      // Mock do db.execute para simular falha
      jest.spyOn(db, 'execute').mockRejectedValueOnce(new Error('Database error'));

      await expect(getStudents(mockParams)).rejects.toThrow('Erro ao buscar alunos');
    });
  });

  describe('getStudentByRA', () => {
    it('deve retornar um aluno quando encontrado pelo RA', async () => {
      // Mock do db.execute para simular retorno de um aluno
      jest.spyOn(db, 'execute').mockResolvedValueOnce([[mockStudent], []]);

      const result = await getStudentByRA(mockStudent.ra);

      expect(db.execute).toHaveBeenCalledWith(
        'SELECT * FROM alunos WHERE ra = ?',
        [mockStudent.ra]
      );

      expect(result).toEqual(mockStudent);
    });

    it('deve lançar um erro quando o aluno não for encontrado', async () => {
      // Mock do db.execute para simular nenhum aluno encontrado
      jest.spyOn(db, 'execute').mockResolvedValueOnce([[], []]);

      await expect(getStudentByRA('RA_INEXISTENTE')).rejects.toThrow('Erro ao buscar aluno');
    });

    it('deve lançar um erro quando a busca falhar', async () => {
      // Mock do db.execute para simular falha
      jest.spyOn(db, 'execute').mockRejectedValueOnce(new Error('Database error'));

      await expect(getStudentByRA(mockStudent.ra)).rejects.toThrow('Erro ao buscar aluno');
    });
  });

  describe('updateStudent', () => {
    it('deve atualizar um aluno existente e retornar os dados atualizados', async () => {
      // Mock para getStudentByRA
      jest.spyOn(db, 'execute')
        // Primeira chamada para verificar se o aluno existe
        .mockResolvedValueOnce([[mockStudent], []])
        // Segunda chamada para o UPDATE
        .mockResolvedValueOnce([[], []])
        // Terceira chamada para buscar o aluno atualizado
        .mockResolvedValueOnce([[{...mockStudent, nome: 'Nome Atualizado'}], []]);

      const updatedData = {
        ...mockStudent,
        nome: 'Nome Atualizado'
      };

      const result = await updateStudent(mockStudent.ra, updatedData);

      // Verificar a chamada do UPDATE
      expect(db.execute).toHaveBeenNthCalledWith(2,
        'UPDATE alunos SET nome = ?, email = ?, cpf = ? WHERE ra = ?',
        [
          updatedData.nome,
          updatedData.email,
          updatedData.cpf,
          mockStudent.ra
        ]
      );

      expect(result).toEqual({...mockStudent, nome: 'Nome Atualizado'});
    });

    it('deve lançar um erro quando o aluno não existir', async () => {
      // Mock para getStudentByRA retornar erro
      jest.spyOn(db, 'execute').mockResolvedValueOnce([[], []]);

      await expect(updateStudent('RA_INEXISTENTE', mockStudent)).rejects.toThrow('Erro ao atualizar aluno');
    });

    it('deve lançar um erro quando a atualização falhar', async () => {
      // Mock para getStudentByRA
      jest.spyOn(db, 'execute')
        // Primeira chamada para verificar se o aluno existe
        .mockResolvedValueOnce([[mockStudent], []])
        // Segunda chamada para o UPDATE - falha
        .mockRejectedValueOnce(new Error('Database error'));

      await expect(updateStudent(mockStudent.ra, mockStudent)).rejects.toThrow('Erro ao atualizar aluno');
    });
  });

  describe('deleteStudent', () => {
    it('deve excluir um aluno existente e retornar mensagem de sucesso', async () => {
      // Mock para getStudentByRA e DELETE
      jest.spyOn(db, 'execute')
        // Primeira chamada para verificar se o aluno existe
        .mockResolvedValueOnce([[mockStudent], []])
        // Segunda chamada para o DELETE
        .mockResolvedValueOnce([[], []]);

      const result = await deleteStudent(mockStudent.ra);

      // Verificar a chamada do DELETE
      expect(db.execute).toHaveBeenNthCalledWith(2,
        'DELETE FROM alunos WHERE ra = ?',
        [mockStudent.ra]
      );

      expect(result).toEqual({ message: 'Aluno excluído com sucesso' });
    });

    it('deve lançar um erro quando o aluno não existir', async () => {
      // Mock para getStudentByRA retornar erro
      jest.spyOn(db, 'execute').mockResolvedValueOnce([[], []]);

      await expect(deleteStudent('RA_INEXISTENTE')).rejects.toThrow('Erro ao deletar aluno');
    });

    it('deve lançar um erro quando a exclusão falhar', async () => {
      // Mock para getStudentByRA
      jest.spyOn(db, 'execute')
        // Primeira chamada para verificar se o aluno existe
        .mockResolvedValueOnce([[mockStudent], []])
        // Segunda chamada para o DELETE - falha
        .mockRejectedValueOnce(new Error('Database error'));

      await expect(deleteStudent(mockStudent.ra)).rejects.toThrow('Erro ao deletar aluno');
    });
  });
});