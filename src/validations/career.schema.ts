import { z } from "zod";

export const careerSchema = z.object({
  name: z.string({ required_error: "el nombre es requerido" })
  .min(10, { message: "El nombre debe tener minimo 10 caracteres." })
  .max(50 , { message: "El nombre debe tener maximo 50 caracteres." })
  .transform((val) => val.toUpperCase()),
  short: z
    .string({ required_error: "La abreviatura es requerida" })
    .min(2, { message: "La abreviatura debe tener minimo 2 caracteres." })
    .max(6, { message: "El correo debe tener maximo 6 caracteres." })
    .transform((val) => val.toUpperCase()),
});

export const idCareerSchema = z.object({
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
    .or(z.number().min(1).max(1000000000)),
});

export const fullCareerSchema = careerSchema.extend({
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
    .or(z.number().min(1).max(1000000000))
    .optional(),
});

export type formCareer = z.infer<typeof careerSchema>;
export type formFullCareer = z.infer<typeof fullCareerSchema>;
