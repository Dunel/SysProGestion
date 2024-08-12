"use client";
import Header from "@/components/Header";
import EstudianteProfileListo from "@/components/perfiles/EstudianteProfileListo";
import EstudianteFormActualizarProfile from "@/components/perfiles/EstudianteFormActualizarProfile";
import { useState } from "react";

export default function EstudianteInfoForm() {
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleFormVisibility = () => {
    setIsFormVisible((prev) => !prev);
  };

  return (
    <>
      <Header
        title={"Tu Perfil"}
        subtitle={
          "Este es tu perfil, aquí podrás visualizar tu información personal y actualizarla si es necesario."
        }
      />
      
      <div className={`${!isFormVisible ? 'flex justify-center items-center' : 'grid grid-cols-1 mx-8 lg:grid-cols-[60%_40%] gap-2'}`}>
        
        <div className={`flex justify-center md:bg-white ${!isFormVisible ? 'w-[80%] mx-auto' : ''}`}>
          <EstudianteProfileListo onToggleForm={toggleFormVisibility} isFormVisible={isFormVisible} />
        </div>
        
        {isFormVisible && (
          <div className="bg-white mx-4">
            <EstudianteFormActualizarProfile onToggleForm={toggleFormVisibility} />
          </div>
        )}

      </div>
    </>
  );
}
