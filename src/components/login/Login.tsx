import { useState} from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/validations/login.schema";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/components/lib/utils";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { Oval } from 'react-loader-spinner';

export default function Login() {
  const { register, handleSubmit, formState: { errors, isValid }, watch } = useForm({
    resolver: zodResolver(LoginSchema),
    mode: "onChange"
  });

  const [errorLog, setErrorLog] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  
  const onSubmit = async (data: any) => {
    setLoading(true);
    const login = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
    });

    if (login?.error) {
      // Manejo de errores de inicio de sesión
      console.error(login.error);
      setErrorLog(login.error)
    } else {
      router.push("/checking");
    }
    setLoading(false);
  };


  return (
    <>
      <div className="flex flex-col items-center justify-center">
       
        <div className="relative z-20 w-[90%] h-auto mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black lg:w-[70%]">
          <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center mb-4">
            Iniciar sesión
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <LabelInputContainer className="mb-4">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input 
                {...register("email")}
                id="email" 
                placeholder="tuemail@ejemplo.com" 
                type="email"
                className={cn(errors.email && "bg-red-100 focus:bg-red-100")}
              />
              {errors.email ? (
                <>
                  <p className="text-red-500 text-sm">{errors.email.message?.toString()}</p>
                  <span className="text-gray-500 text-xs">El correo debe ser válido y tener entre 10 y 75 caracteres.</span>
                </>
              ) : (
                <span className="text-gray-500 text-xs">El correo debe ser válido y tener entre 10 y 75 caracteres.</span>
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
                    La contraseña debe tener entre 8 y 26 caracteres, incluyendo una letra mayúscula, un dígito y un carácter especial.
                  </span>
                </>
                ) 
              : (
                <span className="text-gray-500 text-xs">
                  La contraseña debe tener entre 8 y 26 caracteres, incluyendo una letra mayúscula, un dígito y un carácter especial.
                </span>
                )}
                
                {/* //! aca tengo q capturar la onChange del pass */}
                  {errorLog &&
                   <p className={`text-red-500 text-sm`}>{errorLog}</p>
                  }
                  
                
                  
                
               
            </LabelInputContainer>

            <button
              type="submit"
              className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
            >
              Iniciar sesión
              <BottomGradient />
            </button>
          </form>

          {loading && (
            <div className="flex justify-center items-center flex-col mt-10">
              <Oval color="#000000" secondaryColor="#FFFFFF" height={50} width={50} strokeWidth={5} />
              <br />
              <span>Espere por favor...</span>
            </div>
          )}
        </div>
      </div>
    </>
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