import { z } from "zod";

export const studentRequestSchema = z.object({
  ra: z.string().min(2, "RA é obrigatório").max(20,"RA deve ter no máximo 20 caracteres"),
  nome: z.string().min(2, "Nome é obrigatório").max(255, "Nome deve ter no máximo 255 caracteres"),
  cpf: z.string().min(11,"CPF deve ter no mínimo 11 caracteres.").max(14,"CPF deve ter no máximo 14 caracteres."),
  email: z.string().email("Email inválido"),  
});
export const studentUpdateSchema = z.object({
  nome: z.string().min(2, "Nome é obrigatório").max(255, "Nome deve ter no máximo 255 caracteres"),
  email: z.string().email("Email inválido"),  
});
export const studentParamsIdSchema = z.object({
  id: z.string().uuid("ID inválido").min(1, "ID é obrigatório"),
   
});
export const studentQueryStrSchema = z.object({
  nome: z.string().nullable().optional(),
  email: z.string().nullable().optional(),
  cpf: z.string().nullable().optional(),
  ra: z.string().nullable().optional(),
  pagina: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default("1")
    .pipe(z.number()),

  limite: z
    .string()
    .transform((val) => parseInt(val, 10))
    .default("10")
    .pipe(z.number()),
}) ;
