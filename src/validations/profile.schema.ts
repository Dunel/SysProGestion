// import { z } from "zod";

// export const profileSchema = z.object({
//   names: z
//     .string({ required_error: "El nombre es requerido" })
//     .min(3, { message: "El nombre debe tener minimo 3 caracteres" })
//     .max(50, { message: "El nombre debe tener maximo 50 caracteres" })
//     .transform((val) => val.toUpperCase()),
//   lastnames: z
//     .string({ required_error: "El apellido es requerido" })
//     .min(3, { message: "El apellido debe tener minimo 3 caracteres" })
//     .max(50, { message: "El apellido debe tener maximo 50 caracteres" })
//     .transform((val) => val.toUpperCase()),
//   phone: z
//     .string({ required_error: "El telefono es requerido" })
//     .min(10, { message: "El telefono debe tener minimo 10 caracteres" })
//     .max(12, { message: "El telefono debe tener maximo 10 caracteres" }),
//   address: z
//     .string({ required_error: "La dirección es requerida" })
//     .min(10, { message: "La dirección debe tener minimo 10 caracteres" })
//     .max(100, { message: "La dirección debe tener maximo 100 caracteres" }),
//   university: z
//     .string({ required_error: "La universidad es requerida" })
//     .min(4, { message: "La universidad debe tener minimo 10 caracteres" })
//     .max(50, { message: "La universidad debe tener maximo 100 caracteres" }),
//   quarter: z
//     .string({ required_error: "El trimestre es requerido" })
//     .min(1, { message: "El trimestre debe tener minimo 1 caracteres" })
//     .max(2, { message: "El trimestre debe tener maximo 2 caracteres" })
//     .transform((val) => parseInt(val))
//     .refine((val) => val >= 1 && val <= 12, {
//       message: "Trimestre no válido",
//     }),
//   skills: z
//     .string({ required_error: "Las habilidades son requeridas" })
//     .min(5, { message: "Las habilidades debe tener minimo 10 caracteres" })
//     .max(100, { message: "Las habilidades debe tener maximo 100 caracteres" }),
//   interests: z
//     .string({ required_error: "Los intereses son requeridos" })
//     .min(10, { message: "Los intereses debe tener minimo 10 caracteres" })
//     .max(100, { message: "Los intereses debe tener maximo 100 caracteres" }),
//   description: z
//     .string({ required_error: "La descripción es requerida" })
//     .min(7, { message: "La descripción debe tener minimo 10 caracteres" })
//     .max(100, { message: "La descripción debe tener maximo 100 caracteres" }),
// });





import { z } from "zod";

export const profileSchema = z.object({
  names: z
    .string({ required_error: "El nombre es requerido" })
    .min(3, { message: "El nombre debe tener minimo 3 caracteres" })
    .max(50, { message: "El nombre debe tener maximo 50 caracteres" })
    .transform((val) => val.toUpperCase()),
  lastnames: z
    .string({ required_error: "El apellido es requerido" })
    .min(3, { message: "El apellido debe tener minimo 3 caracteres" })
    .max(50, { message: "El apellido debe tener maximo 50 caracteres" })
    .transform((val) => val.toUpperCase()),
  phone: z
    .string({ required_error: "El telefono es requerido" })
    .min(10, { message: "El telefono debe tener minimo 10 caracteres" })
    .max(12, { message: "El telefono debe tener maximo 12 caracteres" }),
  address: z
    .string({ required_error: "La dirección es requerida" })
    .min(10, { message: "La dirección debe tener minimo 10 caracteres" })
    .max(100, { message: "La dirección debe tener maximo 100 caracteres" }),
  university: z
    .string({ required_error: "La universidad es requerida" })
    .min(4, { message: "La universidad debe tener minimo 4 caracteres" })
    .max(50, { message: "La universidad debe tener maximo 50 caracteres" }),
  quarter: z
    .string({ required_error: "El trimestre es requerido" })
    .min(1, { message: "El trimestre debe tener minimo 1 caracteres" })
    .max(2, { message: "El trimestre debe tener maximo 2 caracteres" })
    .refine((val) => {
      const trimestre = parseInt(val);
      return !isNaN(trimestre) && trimestre >= 1 && trimestre <= 12;
    }, {
      message: "El trimestre debe ser un número entre 1 y 12",
    }),
  skills: z
    .string({ required_error: "Las habilidades son requeridas" })
    .min(5, { message: "Las habilidades debe tener minimo 5 caracteres" })
    .max(100, { message: "Las habilidades debe tener maximo 100 caracteres" }),
  interests: z
    .string({ required_error: "Los intereses son requeridos" })
    .min(10, { message: "Los intereses debe tener minimo 10 caracteres" })
    .max(100, { message: "Los intereses debe tener maximo 100 caracteres" }),
  description: z
    .string({ required_error: "La descripción es requerida" })
    .min(7, { message: "La descripción debe tener minimo 7 caracteres" })
    .max(100, { message: "La descripción debe tener maximo 100 caracteres" }),
});

export type ProfileFormData = z.infer<typeof profileSchema>;