import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/components/lib/utils";
import { useState, useEffect } from "react";

type Step2Props = {
  setData: Function;
  sendData: Function;
};


export default function Step2({ setData, sendData }: Step2Props) {
  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [shouldSendData, setShouldSendData] = useState(false);

  useEffect(() => {
    if (shouldSendData) {
      sendData();
      setShouldSendData(false);
    }
  }, [shouldSendData, sendData]);

  const sendForm = () => {
    setData({
      cedula,
      nombre,
      apellido,
      telefono,
      password,
    });
    setShouldSendData(true);
  };


  
  return (
    <div className="child w-4/5 mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
        Registrate!
      </h2>
      <p className=" child w-full text-neutral-600 text-sm mt-2 dark:text-neutral-300 text-justify">
        Llena lo siguientes datos para registrarte en el sistema. 
        Por favor, introduce tu informacion correctamente siguendo las indicaciones en cada casilla. 
      </p>

  
        <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
  
        </div>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="nombre">Nombre</Label>
          <Input id="nombre" placeholder="Jose" type="text"  
            name="nombre" 
            onChange={(e) => setNombre(e.target.value)}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Apellido</Label>
          <Input id="apellido" placeholder="Cardenas" type="text"
            name="apellido" 
            onChange={(e) => setApellido(e.target.value)}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="cedula">Cedula de Identidad</Label>
          <Input id="cedula" placeholder="23456789" type="number"
            name="cedula"
         onChange={(e) => setCedula(e.target.value)}
          />
        </LabelInputContainer>
        
        <LabelInputContainer className="mb-4">
          <Label htmlFor="telefono">Numero Telefonico</Label>
          <Input id="telefono" placeholder="23456789" type="number"
            name="telefono"
            onChange={(e) => setTelefono(e.target.value)}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Contraseña</Label>
          <Input id="password" placeholder="••••••••"  type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
          <Input id="confirmPassword" placeholder="••••••••"  type="password"
            name="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </LabelInputContainer>

        <br/>
        <br/>
        <button
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
          onClick={() => sendForm()}
        >
          Registrarme!
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