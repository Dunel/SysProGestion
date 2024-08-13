"use client";
import Header from "@/components/Header";
import EstudianteFormProfile from "@/components/perfiles/EstudianteFormProfile";

export default function EstudianteInfoForm() {

  return (
    <div>
        <Header
          title={"Tu Perfil"}
          subtitle={
            "Este es tu formulario de perfil. Por favor, sigue las indicaciones de las casillas y completa tu información personal y profesional."
          }
        />
      
      <div className="w-[80%] m-4 p-4 mx-auto">
              <EstudianteFormProfile />
        </div>
    </div>
  );
}
