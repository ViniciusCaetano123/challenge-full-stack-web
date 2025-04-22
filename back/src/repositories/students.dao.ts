import { db } from "../connectionDb/mysql.db";
import { z } from "zod";
import { studentQueryStrSchema } from "../schemas/student.schema";
import { IStudent } from "../interfaces/students";
import { StudentList } from "../types/students";
export async function createStudent(student: IStudent) {
  try {
    await db.execute(
      "INSERT INTO alunos (cpf, email, nome, ra) VALUES (?, ?, ?, ?)",
      [student.cpf, student.email, student.nome, student.ra]
    );
  } catch (error) {
    console.error("Erro ao criar aluno:", error);
    throw new Error("Erro ao criar aluno");
  }
}

export async function getStudents(
  studentParams: z.infer<typeof studentQueryStrSchema>
) {
  try {
    const [rows] = await db.execute("CALL listar_alunos(?, ?, ?, ?, ?, ?)", [
      studentParams.nome ?? null,
      studentParams.email ?? null,
      studentParams.cpf ?? null,
      studentParams.ra ?? null,
      studentParams.pagina ?? 1,
      studentParams.limite ?? 10,
    ]);

    const [students, total] = rows as StudentList;
    const [totalStudents] = total;

    return { itens: students, total: totalStudents.total };
  } catch (error) {
    console.error("Erro ao buscar alunos", error);
    throw new Error("Erro ao buscar alunos");
  }
}

export async function getStudentById(id: string) {
  try {
    const [studentRA] = await db.execute("SELECT * FROM alunos WHERE id = ?", [
      id,
    ]);
    const student = studentRA as IStudent[];

    if (student.length === 0) {
      throw new Error("Aluno não encontrado");
    }

    return student[0];
  } catch (error) {
    console.error("Erro ao buscar aluno:", error);
    throw new Error("Erro ao buscar aluno");
  }
}

export async function updateStudent(id:string,student: IStudent) {
  try {
    console.log(student)
    const [result] = await db.execute(
      "UPDATE alunos SET email = ?, nome = ? WHERE id = ?",
      [student.email, student.nome, id]
    );
    console.log(result);
    if ((result as any).affectedRows === 0) {
      throw new Error("Aluno não encontrado");
    }

    return student;
  } catch (error) {
    console.error("Erro ao atualizar aluno:", error);
    throw new Error("Erro ao atualizar aluno");
  }
}

export async function deleteStudent(id: string) {
  try {
    const [result] = await db.execute("DELETE FROM alunos WHERE id = ?", [id]);

    if ((result as any).affectedRows === 0) {
      throw new Error("Aluno não encontrado");
    }

    return { message: "Aluno excluído com sucesso" };
  } catch (error) {
    console.error("Erro ao deletar aluno:", error);
    throw new Error("Erro ao deletar aluno");
  }
}
