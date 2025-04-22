import { z } from "zod";

const EnvSchema = z.object({
 MYSQL_URL: z
   .string({
     description: "String de conexão do MySQL",
     required_error: "Você esqueceu de adicionar a URL do banco de dados",
   })
   .url()
   .min(3),
 PORT: z.coerce
   .number()
   .positive()
   .max(65536, "A porta deve ser >= 0 e < 65536")
   .default(3000),
 JWT_SECRET: z
   .string({
     description: "Segredo JWT",
     required_error: "Você esqueceu de adicionar o segredo do JWT",
   })
   .min(3),
 JWT_EXPIRATION: z
   .string({
     description: "Expiração JWT",
     required_error: "Você esqueceu de adicionar a expiração do JWT",
   })
   .min(1),
 CRYPTO_SECRET: z
   .string({
     description: "Segredo Crypto",
     required_error: "Você esqueceu de adicionar o segredo do Crypto",
   })
});

export const env = EnvSchema.parse(process.env);