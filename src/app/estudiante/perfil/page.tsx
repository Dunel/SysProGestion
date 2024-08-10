
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

export default function Page() {
  const { data: session, update } = useSession();
  const [names, setNames] = useState("");
  const [lastnames, setLastnames] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [university, setUniversity] = useState("");
  const [quarter, setQuarter] = useState("");
  const [skills, setSkills] = useState("");
  const [interests, setInterests] = useState("");
  const [description, setDescription] = useState("");

  const profileUpdate = async () => {
    try {
      const res = await axios.post("/api/estudiante/perfil", {
        names,
        lastnames,
        phone,
        address,
        university,
        quarter,
        skills,
        interests,
        description,
      });
      if (session) {
        await update({ profile: true });
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
  const profileData = {
    nombreEstudiante: "Jose Perez",
    carreraEstudiante: "Ingeniería de Software",
    cedulaEstudiante: "1234567890",
    telefonoEstudiante: "0424 7613872",
    correoEstudiante: "jose_p@gmail.com",
    domicilioEstudiante: "Calle # 123, Maracaibo, Zulia",
    universidadEstudiante: "Universidad del Zulia",
    trimestreEstudiante: "11",
    habilidadesEstudiante: "Programación, Matemáticas, Inglés",
    interesesEstudiante: "Programación, Matemáticas, Física",
    descripcionEstudiante:
      "Soy un estudiante universitario apacionado por la ciencia. Me gusta la programación y la tecnología. Mis pasatiempos son el deporte y jugar videojuegos.",

    fotoDelEstudiante:
      "https://lgbtravel.com/wp-content/uploads/2023/11/paises-hombres-guapos-portada-1024x576.jpg", // URL de la foto
  };
  console.log(session);
  return (
    <>
      <Header
        title={"Tu Perfil"}
        subtitle={
          "Este es tu perfil, aquí podrás visualizar tu información personal y actualizarla si es necesario."
        }
      />
      <ContainerWeb>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <GridMain>
            <GridContainer>
              {session?.user.profile ? "true" : "false"}
              <EstudianteProfile profileData={profileData} />
            </GridContainer>
          </GridMain>

          <GridSecond>
            <GridContainer>
              <input
                name="names"
                value={names}
                className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                type="text"
                onChange={(e) => setNames(e.target.value)}
                placeholder="Nombres"
              />
              <input
                name="lastnames"
                value={lastnames}
                className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                type="text"
                onChange={(e) => setLastnames(e.target.value)}
                placeholder="Apellidos"
              />
              <input
                name="phone"
                value={phone}
                className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                type="text"
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Teléfono"
              />
              <input
                name="address"
                value={address}
                className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Dirección"
              />
              <input
                name="university"
                value={university}
                className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                type="text"
                onChange={(e) => setUniversity(e.target.value)}
                placeholder="Universidad"
              />
              <input
                name="quarter"
                value={quarter}
                className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                type="text"
                onChange={(e) => setQuarter(e.target.value)}
                placeholder="Trimestre"
              />
              <input
                name="skills"
                value={skills}
                className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                type="text"
                onChange={(e) => setSkills(e.target.value)}
                placeholder="Habilidades"
              />
              <input
                name="interests"
                value={interests}
                className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                type="text"
                onChange={(e) => setInterests(e.target.value)}
                placeholder="Intereses"
              />
              <input
                name="description"
                value={description}
                className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-lg focus:shadow-outline"
                type="text"
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Descripción"
              />
              <button
                onClick={profileUpdate}
                className="w-full h-10 px-3 text-base text-white bg-gray-500 rounded-lg focus:shadow-outline"
              >
                Guardar
              </button>
            </GridContainer>
          </GridSecond>
        </div>
      </ContainerWeb>
    </>
  );
}
