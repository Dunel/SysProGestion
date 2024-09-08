import { z } from "zod";

export const venezuelaSchema = z.object({
  idEstado: z
    .string()
    .min(1)
    .max(2)
    .transform((val, ctx) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Solo se permiten números en el estado.",
        });
        return z.NEVER;
      }
      if (parsed < 1 || parsed > 24) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Estado no valido.",
        });
        return z.NEVER;
      }
      return parsed;
    }),
    idMunicipio: z
    .string()
    .min(1)
    .max(3)
    .transform((val, ctx) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Solo se permiten números en el municipio.",
        });
        return z.NEVER;
      }
      if (parsed < 1 || parsed > 462) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Municipio no valido.",
        });
        return z.NEVER;
      }
      return parsed;
    }),
});