import { z } from "zod";

export const idApplySchema = z.object({
  idApplication: z
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
  idApply: z
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

export const applyUpdateSchema = z.object({
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
  title: z
    .string({ required_error: "El titulo es requerido" })
    .min(1, { message: "El titulo debe tener minimo 1 caracteres" })
    .max(100, { message: "El titulo debe tener maximo 100 caracteres" }),
  description: z
    .string({ required_error: "La descripcion es requerida" })
    .min(1, { message: "La descripcion debe tener minimo 1 caracteres" })
    .max(2000, { message: "La descripcion debe tener maximo 2000 caracteres" }),
  location: z
    .string({ required_error: "La ubicacion es requerida" })
    .min(1, { message: "La ubicacion debe tener minimo 1 caracteres" })
    .max(100, { message: "La ubicacion debe tener maximo 100 caracteres" }),
  type: z.enum(["pasantia", "servicio"], {
    message: "El tipo de oferta no es valido",
  }),
  skills: z
    .array(
      z.enum(
        [
          "resoluciondeproblemas",
          "trabajoenequipo",
          "adaptabilidad",
          "comunicacionefectiva",
          "liderazgo",
          "pensamientocritico",
          "orientacionaresultados",
          "creatividad",
          "gestiondeltiempo",
          "aprendizajecontinuo",
          "dondegente",
          "ensenanza",
          "sociable",
          "salud",
          "deportes",
          "logistica",
          "expresionesartisticas",
          "diseno",
          "musica",
          "ingles",
          "otrosidiomasnaturales",
          "lenguajesdeprogramacion",
        ],
        {
          errorMap: (issue, ctx) => {
            return { message: "Habilidad no valida" };
          },
        }
      )
    )
    .min(1, { message: "Debe seleccionar al menos una habilidad" }),
  status: z.enum(["active", "inactive"], {
    message: "El estado de la oferta no es valido",
  }),
});

export const applyCreateSchema = z.object({
  title: z
    .string({ required_error: "El titulo es requerido" })
    .min(1, { message: "El titulo debe tener minimo 1 caracteres" })
    .max(100, { message: "El titulo debe tener maximo 100 caracteres" }),
  description: z
    .string({ required_error: "La descripcion es requerida" })
    .min(1, { message: "La descripcion debe tener minimo 1 caracteres" })
    .max(2000, { message: "La descripcion debe tener maximo 2000 caracteres" }),
  location: z
    .string({ required_error: "La ubicacion es requerida" })
    .min(1, { message: "La ubicacion debe tener minimo 1 caracteres" })
    .max(100, { message: "La ubicacion debe tener maximo 100 caracteres" }),
  type: z.enum(["pasantia", "servicio"], {
    message: "El tipo de oferta no es valido",
  }),
  skills: z
    .array(
      z.enum(
        [
          "resoluciondeproblemas",
          "trabajoenequipo",
          "adaptabilidad",
          "comunicacionefectiva",
          "liderazgo",
          "pensamientocritico",
          "orientacionaresultados",
          "creatividad",
          "gestiondeltiempo",
          "aprendizajecontinuo",
          "dondegente",
          "ensenanza",
          "sociable",
          "salud",
          "deportes",
          "logistica",
          "expresionesartisticas",
          "diseno",
          "musica",
          "ingles",
          "otrosidiomasnaturales",
          "lenguajesdeprogramacion",
        ],
        {
          errorMap: (issue, ctx) => {
            return { message: "Habilidad no valida" };
          },
        }
      )
    )
    .min(1, { message: "Debe seleccionar al menos una habilidad" }),
  status: z.enum(["active", "inactive"], {
    message: "El estado de la oferta no es valido",
  }),
});

export const applyUpdateFormSchema = z.object({
  title: z
    .string({ required_error: "El titulo es requerido" })
    .min(1, { message: "El titulo debe tener minimo 1 caracteres" })
    .max(100, { message: "El titulo debe tener maximo 100 caracteres" }),
  description: z
    .string({ required_error: "La descripcion es requerida" })
    .min(1, { message: "La descripcion debe tener minimo 1 caracteres" })
    .max(2000, { message: "La descripcion debe tener maximo 2000 caracteres" }),
  location: z
    .string({ required_error: "La ubicacion es requerida" })
    .min(1, { message: "La ubicacion debe tener minimo 1 caracteres" })
    .max(100, { message: "La ubicacion debe tener maximo 100 caracteres" }),
  type: z.enum(["pasantia", "servicio"], {
    message: "El tipo de oferta no es valido",
  }),
  skills: z
    .array(
      z.enum(
        [
          "resoluciondeproblemas",
          "trabajoenequipo",
          "adaptabilidad",
          "comunicacionefectiva",
          "liderazgo",
          "pensamientocritico",
          "orientacionaresultados",
          "creatividad",
          "gestiondeltiempo",
          "aprendizajecontinuo",
          "dondegente",
          "ensenanza",
          "sociable",
          "salud",
          "deportes",
          "logistica",
          "expresionesartisticas",
          "diseno",
          "musica",
          "ingles",
          "otrosidiomasnaturales",
          "lenguajesdeprogramacion",
        ],
        {
          errorMap: (issue, ctx) => {
            return { message: "Habilidad no valida" };
          },
        }
      )
    )
    .min(1, { message: "Debe seleccionar al menos una habilidad" }),
  status: z.enum(["active", "inactive"], {
    message: "El estado de la oferta no es valido",
  }),
});

export type ApplyFormUpdate = z.infer<typeof applyUpdateFormSchema>;

export type ApplyFormCreate = z.infer<typeof applyCreateSchema>;