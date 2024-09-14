import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userFormSchema } from "@/validations/user.schema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/components/lib/utils";

type Step2Props = {
  setData: Function;
  sendData: Function;
};

export default function Step2({ setData, sendData }: Step2Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
    setValue, // Asegúrate de importar setValue aquí
  } = useForm({
    resolver: zodResolver(userFormSchema),
    mode: "onChange",
  });

  const [shouldSendData, setShouldSendData] = useState(false);

  useEffect(() => {
    if (shouldSendData && isValid) {
      sendData();
      setShouldSendData(false);
    }
  }, [shouldSendData, isValid, sendData]);

  const onSubmit = (data: any) => {
    setData(data);
    setShouldSendData(true);
  };

  return (
    <div className="relative z-20 child w-4/5 mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center mb-4">
        ¡Regístrate completando los siguientes datos!
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="nombre">Nombres del estudiante</Label>
          <Input
            {...register("nombre")}
            id="nombre"
            placeholder="José Manuel"
            type="text"
            className={cn(errors.nombre && "bg-red-100 focus:bg-red-100")}
          />
          {errors.nombre ? (
            <>
              <p className="text-red-500 text-sm">
                {errors.nombre.message?.toString()}
              </p>
              <span className="text-gray-500 text-xs">
                El nombre debe tener entre 3 y 50 caracteres.
              </span>
            </>
          ) : (
            <span className="text-gray-500 text-xs">
              El nombre debe tener entre 3 y 50 caracteres.
            </span>
          )}
        </LabelInputContainer>
   
       
        <LabelInputContainer className="mb-4">
          <Label htmlFor="apellido">Apellidos del estudiante</Label>
          <Input
            {...register("apellido")}
            id="apellido"
            placeholder="Di´martino Hangun"
            type="text"
            className={cn(errors.apellido && "bg-red-100 focus:bg-red-100")}
          />
          {errors.apellido ? (
            <>
              <p className="text-red-500 text-sm">
                {errors.apellido.message?.toString()}
              </p>
              <span className="text-gray-500 text-xs">
                El apellido debe tener entre 3 y 50 caracteres.
              </span>
            </>
          ) : (
            <span className="text-gray-500 text-xs">
              El apellido debe tener entre 3 y 50 caracteres.
            </span>
          )}
        </LabelInputContainer>


        <LabelInputContainer className="mb-4">
          <Label htmlFor="cedula">Cédula de Identidad del estudiante</Label>
          <Input
            {...register("cedula")}
            id="cedula"
            placeholder="23456789"
            type="text"
            className={cn(errors.cedula && "bg-red-100 focus:bg-red-100")}
          />
          {errors.cedula ? (
            <>
              <p className="text-red-500 text-sm">
                {errors.cedula.message?.toString()}
              </p>
              <span className="text-gray-500 text-xs">
                La cédula debe tener entre 7 y 8 caracteres numéricos.
              </span>
            </>
          ) : (
            <span className="text-gray-500 text-xs">
              La cédula debe tener entre 7 y 8 caracteres numéricos.
            </span>
          )}
        </LabelInputContainer>


        <LabelInputContainer className="mb-4">
          <Label htmlFor="birthdate">Fecha de Nacimiento del estudiante</Label>
          <Input
            {...register("birthdate")}
            id="birthdate"
            type="date" // Mantener tipo "date"
            className={cn(errors.birthdate && "bg-red-100 focus:bg-red-100")}
          />
          {errors.birthdate ? (
            <>
              <p className="text-red-500 text-sm">
                {errors.birthdate.message?.toString()}
              </p>
              <span className="text-gray-500 text-xs">
                La fecha de nacimiento debe tener el formato dd/mm/yyyy.
              </span>
            </>
          ) : (
            <span className="text-gray-500 text-xs">
              La fecha de nacimiento debe tener el formato dd/mm/yyyy.
            </span>
          )}
        </LabelInputContainer>


        <LabelInputContainer className="mb-4">
          <Label htmlFor="telefono">Número Telefónico</Label>
          <Input
            {...register("telefono")}
            id="telefono"
            placeholder="04246262000"
            type="phone"
            className={cn(errors.telefono && "bg-red-100 focus:bg-red-100")}
          />
          {errors.telefono ? (
            <>
              <p className="text-red-500 text-sm">
                {errors.telefono.message?.toString()}
              </p>
              <span className="text-gray-500 text-xs">
                El teléfono debe tener entre 10 y 12 caracteres.
              </span>
            </>
          ) : (
            <span className="text-gray-500 text-xs">
              El teléfono debe tener entre 10 y 12 caracteres.
            </span>
          )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            {...register("password")}
            id="password"
            type="password"
            className={cn(errors.password && "bg-red-100 focus:bg-red-100")}
          />
          {errors.password 
          ? (
            <>
              <p className="text-red-500 text-sm">
                {errors.password.message?.toString()}
              </p>
              <span className="text-gray-500 text-xs">
                La contraseña debe tener entre 8 y 26 caracteres, incluyendo una
                letra mayúscula, un dígito y un carácter especial.
              </span>
            </>
            ) 
          : (
            <span className="text-gray-500 text-xs">
              La contraseña debe tener entre 8 y 26 caracteres, incluyendo una
              letra mayúscula, un dígito y un carácter especial.
            </span>
            )}
        </LabelInputContainer>

        <LabelInputContainer className="mb-4">
          <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
          <Input
            {...register("confirmPassword", {
              validate: (val) => {
                if (watch("password") !== val) {
                  return "Las contraseñas no coinciden";
                }
              },
            })}
            id="confirmPassword"
            type="password"
            className={cn(
              errors.confirmPassword && "bg-red-100 focus:bg-red-100"
            )}
          />
          {errors.confirmPassword ? (
            <>
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message?.toString()}
              </p>
              <span className="text-gray-500 text-xs">
                Debe coincidir con la contraseña ingresada anteriormente.
              </span>
            </>
          ) : (
            <span className="text-gray-500 text-xs">
              Debe coincidir con la contraseña ingresada anteriormente.
            </span>
          )}
        </LabelInputContainer>

        <button
          type="submit"
          className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        >
          Registrarme!
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
