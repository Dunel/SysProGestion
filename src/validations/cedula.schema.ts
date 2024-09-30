import { z } from "zod";

export const cedulaSchema = z.object({
    cedula: z
    .string({ required_error: "La cedula es requerida" })
    .min(7, { message: "La cedula debe tener minimo 7 caracteres" })
    .max(8, { message: "La cedula debe tener maximo 8 caracteres" })
    .transform((val, ctx) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Los caracteres deben ser un númericos",
        });
        return z.NEVER;
      }
      if (parsed < 6000000 || parsed > 99999999) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Número de cedula no valido",
        });
        return z.NEVER;
      }
      return parsed;
    })
    .or(z.number().min(6000000).max(999999999))
});

export type cedulaSearch = z.infer<typeof cedulaSchema>;