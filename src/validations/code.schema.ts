import { z } from "zod";

export const codeSchema = z.object({
  code: z
    .string()
    .min(6, { message: "El código es incorrecto" })
    .max(6, { message: "El código es incorrecto" })
    .transform((val, ctx) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "El código debe ser un númerico",
        });
        return z.NEVER;
      }
      if (parsed < 100000 || parsed > 999999) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "El código debe ser un númerico",
        });
        return z.NEVER;
      }
      return parsed;
    }),
  mail: z
    .string({ required_error: "El correo es requerido." })
    .min(10, { message: "El correo debe tener minimo 10 caracteres." })
    .max(75, { message: "El correo debe tener maximo 75 caracteres." })
    .email({ message: "El correo no es válido" })
    .transform((val) => val.toLowerCase()),
});

export const codeIdSchema = z.object({
  idCode: z
    .string()
    .min(20, { message: "El código es incorrecto" })
    .max(36, { message: "El código es incorrecto" }),
});

export const roleSchema = z.object({
  role: z.enum(["estudiante", "alcaldia", "dependencia"]),
});
