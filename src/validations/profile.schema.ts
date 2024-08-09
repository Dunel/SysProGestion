import { z } from "zod";

export const profileSchema = z.object({
  cedula: z
    .string({ required_error: "La cedula es requerida" })
    .min(6, { message: "La cedula debe tener minimo 6 caracteres" })
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
      if (parsed < 600000 || parsed > 99999999) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Número de cedula no valido",
        });
        return z.NEVER;
      }
      return parsed;
    }),
  nombres: z
    .string({ required_error: "El nombre es requerido" })
    .min(3, { message: "El nombre debe tener minimo 3 caracteres" })
    .max(50, { message: "El nombre debe tener maximo 50 caracteres" })
    .transform((val) => val.toUpperCase()),
  apellidos: z
    .string({ required_error: "El apellido es requerido" })
    .min(3, { message: "El apellido debe tener minimo 3 caracteres" })
    .max(50, { message: "El apellido debe tener maximo 50 caracteres" })
    .transform((val) => val.toUpperCase()),
  telefono: z
    .string({ required_error: "El telefono es requerido" })
    .min(10, { message: "El telefono debe tener minimo 10 caracteres" })
    .max(12, { message: "El telefono debe tener maximo 10 caracteres" }),
  direccion: z
    .string({ required_error: "La dirección es requerida" })
    .min(10, { message: "La dirección debe tener minimo 10 caracteres" })
    .max(100, { message: "La dirección debe tener maximo 100 caracteres" }),
  universidad: z
    .string({ required_error: "La universidad es requerida" })
    .min(10, { message: "La universidad debe tener minimo 10 caracteres" })
    .max(100, { message: "La universidad debe tener maximo 100 caracteres" }),
  trimestre: z
    .string({ required_error: "El trimestre es requerido" })
    .min(1, { message: "El trimestre debe tener minimo 1 caracteres" })
    .max(2, { message: "El trimestre debe tener maximo 2 caracteres" })
    .transform((val, ctx) => {
      const trimestre = parseInt(val);
      if (isNaN(trimestre)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Los caracteres deben ser un númericos",
        });
        return z.NEVER;
      }
      if (trimestre < 1 || trimestre > 12) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Trimestre no valido",
        });
        return z.NEVER;
      }
      return trimestre;
    }),
  habilidades: z
    .string({ required_error: "Las habilidades son requeridas" })
    .min(10, { message: "Las habilidades debe tener minimo 10 caracteres" })
    .max(100, { message: "Las habilidades debe tener maximo 100 caracteres" }),
  intereses: z
    .string({ required_error: "Los intereses son requeridos" })
    .min(10, { message: "Los intereses debe tener minimo 10 caracteres" })
    .max(100, { message: "Los intereses debe tener maximo 100 caracteres" }),
  descriccion: z
    .string({ required_error: "La descripción es requerida" })
    .min(10, { message: "La descripción debe tener minimo 10 caracteres" })
    .max(100, { message: "La descripción debe tener maximo 100 caracteres" }),
});
