// // components/AlcaldiaProfileForm.js

// import React, { useState } from 'react';

// const AlcaldiaProfileForm = () => {
//   const [formData, setFormData] = useState({
//     nombreAlcaldia: '',
//     nombreRepresentante: '',
//     apellidoRepresentante: '',
//     fotoDelRepresentante: null,
//     nombreCargo: '',
//     emailPersonal: '',
//     telefonoPersonal: '',
//     telefonoAlcaldia: '',
//     emailAlcaldia: '',
//     direccionAlcaldia: '',
//   });

//   const [errors, setErrors] = useState({});

//   const handleChange = (e) => {
//     const { name, value, files } = e.target;
//     if (name === 'fotoDelRepresentante') {
//       setFormData({ ...formData, [name]: files[0] }); // Guardar el archivo de imagen
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const validate = () => {
//     const newErrors = {};
//     if (!formData.nombreAlcaldia) newErrors.nombreAlcaldia = 'El nombre de la alcaldía es requerido';
//     if (!formData.nombreRepresentante) newErrors.nombreRepresentante = 'El nombre del representante es requerido';
//     if (!formData.apellidoRepresentante) newErrors.apellidoRepresentante = 'El nombre del representante es requerido';
//     if (!formData.fotoDelRepresentante) newErrors.fotoDelRepresentante = 'La foto del representante es requerida';
//     if (!formData.nombreCargo) newErrors.nombreCargo = 'El nombre del cargo es requerido';
//     if (!formData.emailPersonal) {
//       newErrors.emailPersonal = 'El email personal es requerido';
//     } else if (!/\S+@\S+\.\S+/.test(formData.emailPersonal)) {
//       newErrors.emailPersonal = 'El email personal no es válido';
//     }
//     if (!formData.telefonoPersonal) newErrors.telefonoPersonal = 'El teléfono personal es requerido';
//     if (!formData.telefonoAlcaldia) newErrors.telefonoAlcaldia = 'El teléfono de la alcaldía es requerido';
//     if (!formData.emailAlcaldia) {
//       newErrors.emailAlcaldia = 'El email de la alcaldía es requerido';
//     } else if (!/\S+@\S+\.\S+/.test(formData.emailAlcaldia)) {
//       newErrors.emailAlcaldia = 'El email de la alcaldía no es válido';
//     }
//     if (!formData.direccionAlcaldia) newErrors.direccionAlcaldia = 'La dirección de la alcaldía es requerida';
//     return newErrors;
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//     } else {
//       // Aquí puedes manejar el envío del formulario, como una llamada a una API
//       console.log('Formulario enviado:', formData);
//       setErrors({});
//       // Reiniciar el formulario si es necesario
//       setFormData({
//         nombreAlcaldia: '',
//         nombreRepresentante: '',
//         apellidoRepresentante: '',
//         fotoDelRepresentante: null,
//         nombreCargo: '',
//         emailPersonal: '',
//         telefonoPersonal: '',
//         telefonoAlcaldia: '',
//         emailAlcaldia: '',
//         direccionAlcaldia: '',
//       });
//     }
//   };

//   return (
//     <>
//       <h2 className="text-2xl font-bold text-gray-800">Actualizando Perfil.</h2>
//     <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg mt-10">
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700" htmlFor="nombreAlcaldia">
//             Nombre de la Alcaldía
//           </label>
//           <input
//             type="text"
//             name="nombreAlcaldia"
//             id="nombreAlcaldia"
//             value={formData.nombreAlcaldia}
//             onChange={handleChange}
//             className={`mt-1 block w-full p-2 border ${errors.nombreAlcaldia ? 'border-red-500' : 'border-gray-300'} rounded-md`}
//             required
//           />
//           {errors.nombreAlcaldia && <p className="text-red-500 text-sm">{errors.nombreAlcaldia}</p>}
//         </div>



//         <div className="mb-4">
//           <label className="block text-gray-700" htmlFor="telefonoAlcaldia">
//             Teléfono de la Alcaldía
//           </label>
//           <input
//             type="tel"
//             name="telefonoAlcaldia"
//             id="telefonoAlcaldia"
//             value={formData.telefonoAlcaldia}
//             onChange={handleChange}
//             className={`mt-1 block w-full p-2 border ${errors.telefonoAlcaldia ? 'border-red-500' : 'border-gray-300'} rounded-md`}
//             required
//           />
//           {errors.telefonoAlcaldia && <p className="text-red-500 text-sm">{errors.telefonoAlcaldia}</p>}
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700" htmlFor="emailAlcaldia">
//             Email de la Alcaldía
//           </label>
//           <input
//             type="email"
//             name="emailAlcaldia"
//             id="emailAlcaldia"
//             value={formData.emailAlcaldia}
//             onChange={handleChange}
//             className={`mt-1 block w-full p-2 border ${errors.emailAlcaldia ? 'border-red-500' : 'border-gray-300'} rounded-md`}
//             required
//           />
//           {errors.emailAlcaldia && <p className="text-red-500 text-sm">{errors.emailAlcaldia}</p>}
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700" htmlFor="direccionAlcaldia">
//             Dirección de la Alcaldía
//           </label>
//           <input
//             type="text"
//             name="direccionAlcaldia"
//             id="direccionAlcaldia"
//             value={formData.direccionAlcaldia}
//             onChange={handleChange}
//             className={`mt-1 block w-full p-2 border ${errors.direccionAlcaldia ? 'border-red-500' : 'border-gray-300'} rounded-md`}
//             required
//           />
//           {errors.direccionAlcaldia && <p className="text-red-500 text-sm">{errors.direccionAlcaldia}</p>}
//         </div>


//         <div className="mb-4">
//           <label className="block text-gray-700" htmlFor="nombreRepresentante">
//             Nombre del Representante
//           </label>
//           <input
//             type="text"
//             name="nombreRepresentante"
//             id="nombreRepresentante"
//             value={formData.nombreRepresentante}
//             onChange={handleChange}
//             className={`mt-1 block w-full p-2 border ${errors.nombreRepresentante ? 'border-red-500' : 'border-gray-300'} rounded-md`}
//             required
//           />
//           {errors.nombreRepresentante && <p className="text-red-500 text-sm">{errors.nombreRepresentante}</p>}
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700" htmlFor="apellidoRepresentante">
//             Apellido del Representante
//           </label>
//           <input
//             type="text"
//             name="apellidoRepresentante"
//             id="apellidoRepresentante"
//             value={formData.apellidoRepresentante}
//             onChange={handleChange}
//             className={`mt-1 block w-full p-2 border ${errors.apellidoRepresentante ? 'border-red-500' : 'border-gray-300'} rounded-md`}
//             required
//           />
//           {errors.apellidoRepresentante && <p className="text-red-500 text-sm">{errors.apellidoRepresentante}</p>}
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700" htmlFor="fotoDelRepresentante">
//             Cargar Foto del Representante
//           </label>
//           <input
//             type="file"
//             name="fotoDelRepresentante"
//             id="fotoDelRepresentante"
//             accept="image/*"
//             onChange={handleChange}
//             className={`mt-1 block w-full p-2 border ${errors.fotoDelRepresentante ? 'border-red-500' : 'border-gray-300'} rounded-md`}
//             required
//           />
//           {errors.fotoDelRepresentante && <p className="text-red-500 text-sm">{errors.fotoDelRepresentante}</p>}
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700" htmlFor="nombreCargo">
//             Nombre del Cargo
//           </label>
//           <input
//             type="text"
//             name="nombreCargo"
//             id="nombreCargo"
//             value={formData.nombreCargo}
//             onChange={handleChange}
//             className={`mt-1 block w-full p-2 border ${errors.nombreCargo ? 'border-red-500' : 'border-gray-300'} rounded-md`}
//             required
//           />
//           {errors.nombreCargo && <p className="text-red-500 text-sm">{errors.nombreCargo}</p>}
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700" htmlFor="emailPersonal">
//             Email Personal
//           </label>
//           <input
//             type="email"
//             name="emailPersonal"
//             id="emailPersonal"
//             value={formData.emailPersonal}
//             onChange={handleChange}
//             className={`mt-1 block w-full p-2 border ${errors.emailPersonal ? 'border-red-500' : 'border-gray-300'} rounded-md`}
//             required
//           />
//           {errors.emailPersonal && <p className="text-red-500 text-sm">{errors.emailPersonal}</p>}
//         </div>

//         <div className="mb-4">
//           <label className="block text-gray-700" htmlFor="telefonoPersonal">
//             Teléfono Personal
//           </label>
//           <input
//             type="tel"
//             name="telefonoPersonal"
//             id="telefonoPersonal"
//             value={formData.telefonoPersonal}
//             onChange={handleChange}
//             className={`mt-1 block w-full p-2 border ${errors.telefonoPersonal ? 'border-red-500' : 'border-gray-300'} rounded-md`}
//             required
//           />
//           {errors.telefonoPersonal && <p className="text-red-500 text-sm">{errors.telefonoPersonal}</p>}
//         </div>


//         <button
//           type="submit"
//           className="w-full bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//         >
//           Enviar
//         </button>
//       </form>
//     </div>
//     </>
//   );
// };

// export default AlcaldiaProfileForm;



"use client";

import { useSession } from "next-auth/react";
import axios from "axios";
import { profileSchema, ProfileFormData } from "@/validations/profile.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/components/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Oval } from 'react-loader-spinner'; 

  export default function EstudianteProfileForm() {
    const { data: session, update } = useSession();
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm<ProfileFormData>({
      resolver: zodResolver(profileSchema),
      mode: "onChange",
    });
    const [loading, setLoading] = useState(false); 
    const router = useRouter();

    const profileUpdate = async (data: ProfileFormData) => {
      try {
          setLoading(true); // Muestra el loader
          const res = await axios.post("/api/estudiante/perfil", data);
          if (session) {
           await update({ profile: true });
          }
          console.log(res.data);
          router.push('/estudiante/perfil');

      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.log("error lanzado:", error.response?.data.error);
        } else {
          console.error("error:", error);
        }
      }finally {  
        setLoading(false); // Muestra el loader
      
      }
    
    };



    const [imagePreview, setImagePreview] = useState(null);
    const [pdfFileName, setPdfFileName] = useState("");

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as any);
        };
        reader.readAsDataURL(file);
      }
    };
  
    const handlePdfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        setPdfFileName(file.name);
      }
    };
  
    return (

      <div className=" flex flex-col m-4 my-4 p-4 rounded-lg shadow-lg">
                  <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center lg:text-5xl">
                    Completa tu Perfil! 
                  </h2>

                    <form onSubmit={handleSubmit(profileUpdate)} className="form-student-info">
                      <LabelInputContainer className="mb-4">
                        <Label htmlFor="names">Nombres</Label>
                        <Input
                          {...register("names")}
                          id="names"
                          placeholder="Nombres"
                          type="text"
                          className={cn(
                            errors.names && "bg-red-100 focus:bg-red-100"
                          )}
                        />
                        {errors.names && (
                          <p className="text-red-500 text-sm">
                            {errors.names.message}
                          </p>
                        )}
                      </LabelInputContainer>

                      <LabelInputContainer className="mb-4">
                        <Label htmlFor="lastnames">Apellidos</Label>
                        <Input
                          {...register("lastnames")}
                          id="lastnames"
                          placeholder="Apellidos"
                          type="text"
                          className={cn(
                            errors.lastnames && "bg-red-100 focus:bg-red-100"
                          )}
                        />
                        {errors.lastnames && (
                          <p className="text-red-500 text-sm">
                            {errors.lastnames.message}
                          </p>
                        )}
                      </LabelInputContainer>

                      <LabelInputContainer className="mb-4">
                        <Label htmlFor="phone">Teléfono</Label>
                        <Input
                          {...register("phone")}
                          id="phone"
                          placeholder="Teléfono"
                          type="text"
                          className={cn(
                            errors.phone && "bg-red-100 focus:bg-red-100"
                          )}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm">
                            {errors.phone.message}
                          </p>
                        )}
                      </LabelInputContainer>

                      <LabelInputContainer className="mb-4">
                        <Label htmlFor="address">Dirección</Label>
                        <Input
                          {...register("address")}
                          id="address"
                          placeholder="Dirección"
                          type="text"
                          className={cn(
                            errors.address && "bg-red-100 focus:bg-red-100"
                          )}
                        />
                        {errors.address && (
                          <p className="text-red-500 text-sm">
                            {errors.address.message}
                          </p>
                        )}
                      </LabelInputContainer>

                      <LabelInputContainer className="mb-4">
                        <Label htmlFor="university">Universidad </Label>
                        <Input
                          {...register("university")}
                          id="university"
                          placeholder="Universidad"
                          type="text"
                          className={cn(
                            errors.university && "bg-red-100 focus:bg-red-100"
                          )}
                        />
                        {errors.university && (
                          <p className="text-red-500 text-sm">
                            {errors.university.message}
                          </p>
                        )}
                      </LabelInputContainer>

                      <LabelInputContainer className="mb-4">
                        <Label htmlFor="university">Carrera <mark> -Agr a la BBDD- </mark> </Label>
                        <Input
                          // {...register("carrera")}
                          // id="university"
                          placeholder="Carrera que cursas"
                          type="text"
                          className={cn(
                            errors.university && "bg-red-100 focus:bg-red-100"
                          )}
                        />
                        {errors.university && (
                          <p className="text-red-500 text-sm">
                            {errors.university.message}
                          </p>
                        )}
                      </LabelInputContainer>

                      <LabelInputContainer className="mb-4">
                        <Label htmlFor="quarter">Trimestre</Label>
                        <Input
                          {...register("quarter")}
                          id="quarter"
                          placeholder="Trimestre"
                          type="text"
                          className={cn(
                            errors.quarter && "bg-red-100 focus:bg-red-100"
                          )}
                        />
                        {errors.quarter && (
                          <p className="text-red-500 text-sm">
                            {errors.quarter.message}
                          </p>
                        )}
                      </LabelInputContainer>

                      <LabelInputContainer className="mb-4">
                        <Label htmlFor="skills">Habilidades</Label>
                        <Input
                          {...register("skills")}
                          id="skills"
                          placeholder="Habilidades"
                          type="text"
                          className={cn(
                            errors.skills && "bg-red-100 focus:bg-red-100"
                          )}
                        />
                        {errors.skills && (
                          <p className="text-red-500 text-sm">
                            {errors.skills.message}
                          </p>
                        )}
                      </LabelInputContainer>

                      <LabelInputContainer className="mb-4">
                        <Label htmlFor="interests">Intereses</Label>
                        <Input
                          {...register("interests")}
                          id="interests"
                          placeholder="Intereses"
                          type="text"
                          className={cn(
                            errors.interests && "bg-red-100 focus:bg-red-100"
                          )}
                        />
                        {errors.interests && (
                          <p className="text-red-500 text-sm">
                            {errors.interests.message}
                          </p>
                        )}
                      </LabelInputContainer>

                      <LabelInputContainer className="mb-4">
                        <Label htmlFor="description">Descripción</Label>
                        <Input
                          {...register("description")}
                          id="description"
                          placeholder="Descripción"
                          type="text"
                          className={cn(
                            errors.description && "bg-red-100 focus:bg-red-100"
                          )}
                        />
                        {errors.description && (
                          <p className="text-red-500 text-sm">
                            {errors.description.message}
                          </p>
                        )}
                      </LabelInputContainer>



                {/* //TODO: TEMENOS QUE AGREGAR ESTOS INPUTS A BBDD */}
                {/* **** Imagen de Perfil **** */}
                <Label>Sube tu foto <mark> -Agr a la BBDD- </mark> </Label>
                <div className="w-[100%] m-2 dm:w-[50%]">
                <Input type="file" accept="image/*" onChange={handleImageChange} />
                {imagePreview && <img src={imagePreview} alt="Vista previa" className="mx-auto my-4 w-[40%] h-auto" />}
                </div>

                {/* **** Curriculum PDF **** */}
                <Label>Sube tu currículum (Formato PDF) <mark> -Agr a la BBDD- </mark> </Label>
                <div className="w-[100%] m-2 dm:w-[50%]">
                <Input type="file" accept="application/pdf" onChange={handlePdfChange} />
                {pdfFileName && <p className="my-4 text-center">Archivo seleccionado: {pdfFileName}</p>}
                </div>

                  

                <div className="flex justify-center">
                  <button
                      type="submit"
                      className="w-[100%] bg-black hover:bg-blue-600 text-white font-bold py-1 px-1 mt-4 rounded focus:shadow-outline md:w-[80%]"
                      >
                      Guardar
                  </button>
                </div>
                
                    </form>
                    {
              loading  && // Muestra el loader si está cargando
                <div className="flex justify-center items-center flex-col mt-10">
                  <Oval color="#000000"
                  secondaryColor="#FFFFFF" // Color de fondo blanco
                  height={50} width={50}  strokeWidth={5} />
                  <br/>
                  <span>Espere por favor...</span>
                </div>
            
            }
                  </div>
                
              
  )
                    }
                    
const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};