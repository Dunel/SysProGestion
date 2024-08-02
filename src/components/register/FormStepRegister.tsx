"use client";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/components/lib/utils";
import { useState } from "react";

type Step0Props = {
  setMail: Function;
  sendMail: Function;
};

export default function SignupFormDemo({ setMail, sendMail }: Step0Props) {

  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const options = ['Alcaldia', 'Dependencia de Alcaldia', 'Estudiante'];

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  
  return (
    <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Registrate!
      </h2>
      <p className="text-neutral-6000 text-sm max-w-sm mt-2 dark:text-neutral-300 text-justify">
        Llena lo siguientes datos para registrarte en el sistema. 
        Por favor, introduce tu informacion correctamente siguendo las indicaciones en cada casilla. 
      </p>

      <form className="my-8">
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
  
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Correo</Label>
          <Input id="email" placeholder="projectmayhem@fc.com" type="email" onChange={(e) => setMail(e.target.value)}/>
        </LabelInputContainer>


  

        <LabelInputContainer className="mb-4">
          <Label htmlFor="rol">Rol</Label>
        
            <div className="relative">
                  <Input
                  id="rol"
                    type="text"
                    value={selectedOption}
                    onClick={() => setIsOpen(!isOpen)}
                    readOnly
                    className="bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                    placeholder="Selecciona una opción"
                  />
                  {isOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                      {options.map((option, index) => (
                        <div
                          key={index}
                          onClick={() => handleOptionClick(option)}
                          className="cursor-pointer hover:bg-blue-100 py-2 px-3"
                        >
                          {option}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
        
        </LabelInputContainer>
        <br/>
        <br/>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          onClick={() => sendMail()}
        >
          Validar Correo
          <BottomGradient />
        </button>

       
      </form>
    </div>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

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
