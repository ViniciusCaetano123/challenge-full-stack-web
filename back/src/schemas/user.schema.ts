import { z } from "zod";

export const userRequestSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Nome deve ter pelo menos 3 caracteres" })
    .max(255),
  password: z
    .string()
    .min(6, { message: "Senha deve ter pelo menos 6 caracteres" })
    .max(255),
  email: z.string().email({ message: "Email inválido" }).max(255),
});



