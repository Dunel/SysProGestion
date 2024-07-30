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
  mail: z.string().email({ message: "El correo no es válido" }),
});

export const codeIdSchema = z.object({
  idCode: z
    .string()
    .min(20, { message: "El código es incorrecto" })
    .max(36, { message: "El código es incorrecto" }),
});
