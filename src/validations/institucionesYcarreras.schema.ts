import { z } from "zod";

export const institucionesYcarrerasSchema = z.object({
    codigoInstitucion: z
      .string({ required_error: "El codigo de la institucion educativa es requerido" })
      .min(3, { message: "El codigo debe tener minimo 3 caracteres" })
      .max(50, { message: "El codigo debe tener maximo 50 caracteres" })
      .transform((val) => val.toUpperCase()),
    nombreInstitucion: z
      .string({ required_error: "El nombre de la institucion educativa es requerido" })
      .min(3, { message: "El nombre debe tener minimo 3 caracteres" })
      .max(50, { message: "El nombre debe tener maximo 50 caracteres" })
      .transform((val) => val.toUpperCase()),
    parroquiaInstitucion: z
      .string({ required_error: "La parroquia de la institucion educativa es requerida" })
      .min(3, { message: "La parroquia debe tener minimo 3 caracteres" })
      .max(50, { message: "La parroquia debe tener maximo 50 caracteres" })
      .transform((val) => val.toUpperCase()),
    
  }); //! parroquiainstituto deben ser un select
  


  export type InstitucionesYcarrerasSchema= z.infer<typeof institucionesYcarrerasSchema>;
