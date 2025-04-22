import { z } from "zod";

export const authRequestSchema = z.object({
  email: z.string().email({ message: "Email inválido" }).max(255),
  password: z.string().min(1, { message: "Senha é obrigatória" }).max(255),
});