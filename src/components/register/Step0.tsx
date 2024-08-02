"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/components/lib/utils";
import { useState } from "react";
import { z } from "zod";


type Step0Props = {
  setMail: Function;
  sendMail: Function;
};

const emailSchema = z.string().email({ message: "Correo electrónico no válido" });

export default function Step0({ setMail, sendMail }: Step0Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState('');
  const [emailError, setEmailError] = useState('');
  const [email, setEmail] = useState('');

  const options = ['Alcaldia', 'Dependencia de Alcaldia', 'Estudiante'];

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setMail(value);

    try {
      emailSchema.parse(value);
      setEmailError('');
    } catch (err) {
      if (err instanceof z.ZodError) {
        setEmailError(err.errors[0].message);
      }
    }
  };

  return (
    <div className="child w-4/5 mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        ¡Regístrate!
      </h2>
      <p className="child w-full text-neutral-600 text-sm mt-2 dark:text-neutral-300 text-justify">
        Llena los siguientes datos para registrarte en el sistema. 
        Por favor, introduce tu información correctamente siguiendo las indicaciones en cada casilla. 
      </p>

      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4"></div>

      <LabelInputContainer className="mb-4">
        <Label htmlFor="email">Correo</Label>
        <Input
          id="email"
          placeholder="projectmayhem@fc.com"
          type="email"
          value={email}
          onChange={handleEmailChange}
          className={cn(
            "bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none",
            emailError && "bg-red-100"
          )}
        />
        {emailError && <span className="text-red-500 text-sm mt-1">{emailError}</span>}
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
      
      <button
        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        onClick={() => sendMail()}
      >
        Validar Correo
        <BottomGradient />
      </button>
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
