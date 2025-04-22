import { FastifyReply, FastifyRequest } from "fastify";
import { createStudent, getStudents,getStudentById, updateStudent } from "../repositories/students.dao";
import {
  studentRequestSchema,
  studentQueryStrSchema,  
  studentParamsIdSchema,
} from "../schemas/student.schema";
import { z } from "zod";
import { formatCPF, formatDate } from "../utils/formatters";
import { IStudent } from "../interfaces/students";

export default {
  async create(
    request: FastifyRequest<{ Body: z.infer<typeof studentRequestSchema> }>,
    reply: FastifyReply
  ) {
    try {
      const student = request.body;

      await createStudent(student);

      return {
        message: "Aluno criado com sucesso",
      };
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        message: "Erro interno do servidor",
      });
    }
  },
  async getList(
    request: FastifyRequest<{
      Querystring: z.infer<typeof studentQueryStrSchema>;
    }>,
    reply: FastifyReply
  ) {
    try {
      const studentParams = request.query;

      const students = await getStudents(studentParams);
      const itensFormatados = students.itens.map(
        (student : IStudent) => ({
          ...student,
          cpf: formatCPF(student.cpf || ""),
          created_at: formatDate(student.created_at || ""),
          updated_at: formatDate(student.updated_at || ""),
        })
      );

      return {
        total: students.total,
        itens: itensFormatados,
      };
    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        message: "Erro interno do servidor",
      });
    }
  },
  async getById(
    request: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
  ) {
    try {
      const {id} = request.params;

      const student = await getStudentById(id);
      if (!student) {
        return reply.status(404).send({
          message: "Aluno não encontrado",
        });
      }
      const alunoFormatado : IStudent = {
        ...student,
        cpf: formatCPF(student.cpf || ""),
        created_at: formatDate(student.created_at || ""),
        updated_at: formatDate(student.updated_at || ""),
      };
      return reply.status(201).send(alunoFormatado);

    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        message: "Erro interno do servidor",
      });
    }
  },
  async updateById(
    request: FastifyRequest<{ Params: z.infer<typeof studentParamsIdSchema>, Body: IStudent }>,
    reply: FastifyReply
  ) {
    try {
      const {id} = request.params;
      const student = request.body;

      await updateStudent(id,student);
      if (!student) {
        return reply.status(404).send({
          message: "Aluno não encontrado",
        });
      }
      
      return {
        message: "Aluno atualizado com sucesso",
      };

    } catch (error) {
      request.log.error(error);
      return reply.status(500).send({
        message: "Erro interno do servidor",
      });
    }
  },
};
