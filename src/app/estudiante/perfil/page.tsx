"use client";
import Header from "@/components/Header";
import EstudianteProfileListo from "@/components/perfiles/EstudianteProfileListo";
import EstudianteFormProfile from "@/components/perfiles/EstudianteFormProfile";

export default function EstudianteInfoForm() {

  return (
    <div>
        <Header
          title={"Tu Perfil"}
          subtitle={
            "Este es tu perfil, aquí podrás visualizar tu información personal y actualizarla si es necesario."
          }
        />
      
         <div className="grid grid-cols-1 mx-8 lg:grid-cols-[60%_40%] gap-2">
          
            <div className="flex justify-center md:bg-white">
              <EstudianteProfileListo/>
            </div>
          
            <div className="bg-white mx-4">
              <EstudianteFormProfile />
            </div>

        </div>

      
    </div>
  );
}
