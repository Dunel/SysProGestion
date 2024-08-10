// "use client";
// import ContainerWeb from "@/components/ContainerWeb";
// import GridContainer from "@/components/GridContainer";
// import GridMain from "@/components/GridMain";
// import GridSecond from "@/components/GridSecond";
// import Header from "@/components/Header";
// import { useSession } from "next-auth/react";
// import { useState } from "react";
// import EstudianteProfile from "@/components/perfiles/EstudianteProfile";
// import axios from "axios";

// export default function Page() {
//   const { data: session, update } = useSession();
//   const [names, setNames] = useState("");
//   const [lastnames, setLastnames] = useState("");
//   const [phone, setPhone] = useState("");
//   const [address, setAddress] = useState("");
//   const [university, setUniversity] = useState("");
//   const [quarter, setQuarter] = useState("");
//   const [skills, setSkills] = useState("");
//   const [interests, setInterests] = useState("");
//   const [description, setDescription] = useState("");

//   const profileUpdate = async () => {
//     try {
//       const res = await axios.post("/api/estudiante/perfil", {
//         names,
//         lastnames,
//         phone,
//         address,
//         university,
//         quarter,
//         skills,
//         interests,
//         description,
//       });
//       console.log("test: ", { ...session, user: { ...session?.user, profile: true } })
//       if(session)
//       update({ user: { ...session.user, profile: true } });

//       console.log(res.data);
//       return;
//     } catch (error) {
//       if (axios.isAxiosError(error)) {
//         console.log(error.response?.data.error);
//         return;
//       }

//       console.error("error:", error);
//     }
//   };
//   const profileData = {
//     nombreEstudiante: "Jose Perez",
//     carreraEstudiante: "Ingeniería de Software",
//     cedulaEstudiante: "1234567890",
//     telefonoEstudiante: "0424 7613872",
//     correoEstudiante: "jose_p@gmail.com",
//     domicilioEstudiante: "Calle # 123, Maracaibo, Zulia",
//     universidadEstudiante: "Universidad del Zulia",
//     trimestreEstudiante: "11",
//     habilidadesEstudiante: "Programación, Matemáticas, Inglés",
//     interesesEstudiante: "Programación, Matemáticas, Física",
//     descripcionEstudiante:
//       "Soy un estudiante universitario apacionado por la ciencia. Me gusta la programación y la tecnología. Mis pasatiempos son el deporte y jugar videojuegos.",

//     fotoDelEstudiante:
//       "https://lgbtravel.com/wp-content/uploads/2023/11/paises-hombres-guapos-portada-1024x576.jpg", // URL de la foto
//   };
//   console.log(session);
//   return (
//     <>
//       <Header
//         title={"Tu Perfil"}
//         subtitle={
//           "Este es tu perfil, aquí podrás visualizar tu información personal y actualizarla si es necesario."
//         }
//       />
//       <ContainerWeb>
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//           <GridMain>
//             <GridContainer>
//               {session?.user.profile ? "true" : "false"}
//               <EstudianteProfile profileData={profileData} />
//             </GridContainer>
//           </GridMain>

//           <GridSecond>
//             <GridContainer >
//               <div className="z-30">

             
//               <input
//                 name="names"
//                 value={names}
//                 className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
//                 type="text"
//                 onChange={(e) => setNames(e.target.value)}
//                 placeholder="Nombres"
//               />
//               <input
//                 name="lastnames"
//                 value={lastnames}
//                 className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
//                 type="text"
//                 onChange={(e) => setLastnames(e.target.value)}
//                 placeholder="Apellidos"
//               />
//               <input
//                 name="phone"
//                 value={phone}
//                 className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
//                 type="text"
//                 onChange={(e) => setPhone(e.target.value)}
//                 placeholder="Teléfono"
//               />
//               <input
//                 name="address"
//                 value={address}
//                 className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
//                 type="text"
//                 onChange={(e) => setAddress(e.target.value)}
//                 placeholder="Dirección"
//               />
//               <input
//                 name="university"
//                 value={university}
//                 className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
//                 type="text"
//                 onChange={(e) => setUniversity(e.target.value)}
//                 placeholder="Universidad"
//               />
//               <input
//                 name="quarter"
//                 value={quarter}
//                 className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
//                 type="text"
//                 onChange={(e) => setQuarter(e.target.value)}
//                 placeholder="Trimestre"
//               />
//               <input
//                 name="skills"
//                 value={skills}
//                 className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
//                 type="text"
//                 onChange={(e) => setSkills(e.target.value)}
//                 placeholder="Habilidades"
//               />
//               <input
//                 name="interests"
//                 value={interests}
//                 className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
//                 type="text"
//                 onChange={(e) => setInterests(e.target.value)}
//                 placeholder="Intereses"
//               />
//               <input
//                 name="description"
//                 value={description}
//                 className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
//                 type="text"
//                 onChange={(e) => setDescription(e.target.value)}
//                 placeholder="Descripción"
//               />
//               <button
//                 onClick={profileUpdate}
//                 className="w-full h-10 px-3 text-base text-white bg-gray-500 rounded-lg focus:shadow-outline"
//               >
//                 Guardar
//               </button>

//               </div>
//             </GridContainer>
//           </GridSecond>
//         </div>
//       </ContainerWeb>
//     </>
//   );
// }




"use client";
import ContainerWeb from "@/components/ContainerWeb";
import GridContainer from "@/components/GridContainer";
import GridMain from "@/components/GridMain";
import GridSecond from "@/components/GridSecond";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import { useState } from "react";
import EstudianteProfile from "@/components/perfiles/EstudianteProfile";
import axios from "axios";
import { profileSchema } from "@/validations/profile.schema";
import { z } from "zod";

export default function Page() {
  const { data: session, update } = useSession();
  const [cedula, setCedula] = useState<number | string>(""); // Cedula como número o cadena
  const [names, setNames] = useState<string>("");
  const [lastnames, setLastnames] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [university, setUniversity] = useState<string>("");
  const [quarter, setQuarter] = useState<number | string>(""); // Quarter como número o cadena
  const [skills, setSkills] = useState<string>("");
  const [interests, setInterests] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [errors, setErrors] = useState<Record<string, string>>({}); // Para manejar errores

  // Función para validar el perfil
  const validateProfile = (data: Record<string, any>) => {
    try {
      return profileSchema.parse(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return error.issues.reduce((acc: Record<string, string>, issue) => {
          acc[issue.path[0] as string] = issue.message; // Cast to string
          return acc;
        }, {});
      }
      throw error;
    }
  };

  // Función para actualizar el perfil
  const profileUpdate = async () => {
    try {
      const profileData = {
        cedula: Number(cedula), // Convertir a número
        names,
        lastnames,
        phone,
        address,
        university,
        quarter: Number(quarter), // Convertir a número
        skills,
        interests,
        description,
      };

      const validatedData = validateProfile(profileData); // Validar datos

      const res = await axios.post("/api/estudiante/perfil", validatedData);
      if (session) {
        update({ user: { ...session.user, profile: true } });
      }
      console.log(res.data);
      return;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.error);
        return;
      }

      console.error("error:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    const profileData = {
      cedula: Number(cedula),
      names,
      lastnames,
      phone,
      address,
      university,
      quarter: Number(quarter),
      skills,
      interests,
      description,
    };

    const validationErrors = validateProfile(profileData); // Validar datos
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors as Record<string, string>); // Establecer errores en el estado
    } else {
      await profileUpdate(); // Intentar actualizar el perfil si no hay errores
    }
  };

  return (
    <>
      <Header
        title={"Tu Perfil"}
        subtitle={
          "Este es tu perfil, aquí podrás visualizar tu información personal y actualizarla si es necesario."
        }
      />
      <ContainerWeb>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <GridMain>
            <GridContainer>
              <EstudianteProfile profileData={{ /* Aquí puedes pasar los datos del estudiante */ }} />
            </GridContainer>
          </GridMain>

          <GridSecond>
            <GridContainer>
              <form onSubmit={handleSubmit}>
                <input
                  name="cedula"
                  value={cedula}
                  className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                  type="number" // Campo de número
                  onChange={(e) => setCedula(e.target.value)} // Mantener como cadena para evitar problemas
                  placeholder="Cédula"
                />
                {errors.cedula && (
                  <span className="text-red-500">{errors.cedula}</span>
                )}
                <input
                  name="names"
                  value={names}
                  className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                  type="text"
                  onChange={(e) => setNames(e.target.value)}
                  placeholder="Nombres"
                />
                {errors.names && (
                  <span className="text-red-500">{errors.names}</span>
                )}
                <input
                  name="lastnames"
                  value={lastnames}
                  className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                  type="text"
                  onChange={(e) => setLastnames(e.target.value)}
                  placeholder="Apellidos"
                />
                {errors.lastnames && (
                  <span className="text-red-500">{errors.lastnames}</span>
                )}
                <input
                  name="phone"
                  value={phone}
                  className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                  type="text"
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Teléfono"
                />
                {errors.phone && (
                  <span className="text-red-500">{errors.phone}</span>
                )}
                <input
                  name="address"
                  value={address}
                  className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                  type="text"
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Dirección"
                />
                {errors.address && (
                  <span className="text-red-500">{errors.address}</span>
                )}
                <input
                  name="university"
                  value={university}
                  className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                  type="text"
                  onChange={(e) => setUniversity(e.target.value)}
                  placeholder="Universidad"
                />
                {errors.university && (
                  <span className="text-red-500">{errors.university}</span>
                )}
                <input
                  name="quarter"
                  value={quarter}
                  className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                  type="number" // Campo de número
                  onChange={(e) => setQuarter(e.target.value)} // Mantener como cadena para evitar problemas
                  placeholder="Trimestre"
                />
                {errors.quarter && (
                  <span className="text-red-500">{errors.quarter}</span>
                )}
                <input
                  name="skills"
                  value={skills}
                  className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                  type="text"
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="Habilidades"
                />
                {errors.skills && (
                  <span className="text-red-500">{errors.skills}</span>
                )}
                <input
                  name="interests"
                  value={interests}
                  className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                  type="text"
                  onChange={(e) => setInterests(e.target.value)}
                  placeholder="Intereses"
                />
                {errors.interests && (
                  <span className="text-red-500">{errors.interests}</span>
                )}
                <input
                  name="description"
                  value={description}
                  className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Descripción"
                />
                {errors.description && (
                  <span className="text-red-500">{errors.description}</span>
                )}
                <button
                  type="submit"
                  className="w-full h-10 px-3 text-base text-white bg-gray-500 rounded-lg focus:shadow-outline"
                >
                  Guardar
                </button>
              </form>
            </GridContainer>
          </GridSecond>
        </div>
      </ContainerWeb>
    </>
  );
}


