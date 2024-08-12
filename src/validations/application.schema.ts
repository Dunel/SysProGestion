import { z } from "zod";

export const idApplySchema = z.object({
  id: z
    .string({ required_error: "El id es requerido" })
    .min(1, { message: "El id debe tener minimo 1 caracteres" })
    .max(10, { message: "El id debe tener maximo 10 caracteres" })
    .transform((val, ctx) => {
      const id = parseInt(val);
      if (isNaN(id)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "El id debe ser un número",
        });
        return z.NEVER;
      }

      return id;
    })
    .or(
      z
        .number()
        .min(1, { message: "El id debe ser mayor a 0" })
        .max(1000000000, { message: "El id debe ser menor a 1000000000" })
    ),
});

export const applySchema = z.object({
    id: z
      .string({ required_error: "El id es requerido" })
      .min(1, { message: "El id debe tener minimo 1 caracteres" })
      .max(10, { message: "El id debe tener maximo 10 caracteres" })
      .transform((val, ctx) => {
        const id = parseInt(val);
        if (isNaN(id)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "El id debe ser un número",
          });
          return z.NEVER;
        }
        
        return id;
      })
      .or(
        z
          .number()
          .min(1, { message: "El id debe ser mayor a 0" })
          .max(1000000000, { message: "El id debe ser menor a 1000000000" })
      ),
  });
