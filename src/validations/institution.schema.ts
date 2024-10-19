import { z } from "zod";

export const instituSchema = z.object({
  name: z
    .string({ required_error: "Se requiere el nombre de la institucion" })
    .min(1, {
      message: "El nombre de la institucion debe tener minimo 1 caracter",
    })
    .max(200, {
      message: "El nombre de la institucion debe tener maximo 200 caracteres",
    }),
  type: z
    .enum(["universitaria", "tecnica"], { message: "Tipo de institucion no valido" }),
  estadoId: z
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
    })
    .or(z.number().min(1).max(24)),
  municipioId: z
    .string()
    .min(1)
    .max(3)
    .transform((val, ctx) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Solo se permiten números.",
        });
        return z.NEVER;
      }
      if (parsed < 1 || parsed > 462) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Municipio no valida.",
        });
        return z.NEVER;
      }
      return parsed;
    })
    .or(z.number().min(1).max(1150)),
  parroquiaId: z
    .string()
    .min(1)
    .max(4)
    .transform((val, ctx) => {
      const parsed = parseInt(val);
      if (isNaN(parsed)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Solo se permiten números.",
        });
        return z.NEVER;
      }
      if (parsed < 1 || parsed > 1150) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Parroquia no valida.",
        });
        return z.NEVER;
      }
      return parsed;
    })
    .or(z.number().min(1).max(1150)),
});

export const idInstituSchema = z.object({
  id: z
    .string()
    .min(1)
    .max(10)
    .transform((val, ctx) => {
      const id = parseInt(val);
      if (isNaN(id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "id no valido",
        });
        return z.NEVER;
      }

      return id;
    })
    .or(z.number().min(1).max(1000000000)).optional(),
});

export const fullInstituSchema = instituSchema.extend({
  id: z
    .string()
    .min(1)
    .max(10)
    .transform((val, ctx) => {
      const id = parseInt(val);
      if (isNaN(id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "id no valido",
        });
        return z.NEVER;
      }

      return id;
    })
    .or(z.number().min(1).max(1000000000)).optional(),
});

export type instituFormSchema = z.infer<typeof fullInstituSchema>;

export type editInstituFormSchema = z.infer<typeof instituSchema>;