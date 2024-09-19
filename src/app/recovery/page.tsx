"use client";
import ContainerWeb from "@/components/ContainerWeb";
import Header from "@/components/Header";
import { cn } from "@/components/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  emailFormRecovery,
  emailRecoverySchema,
} from "@/validations/code.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function Page() {
  const [step, setStep] = useState(true);
  const [text, setText] = useState("");
  const [emailError, setEmailError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<emailFormRecovery>({
    resolver: zodResolver(emailRecoverySchema),
    mode: "onChange",
  });

  const sendMail = async (data: emailFormRecovery) => {
    try {
      const res = await axios.post("/api/recovery", {
        email: data.email,
      });
      setText(res.data.message);
      console.log(res.data.message);
      setStep(false);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
        return setEmailError(error.response?.data.error);
      }
      console.error("Error al validar el código:", error);
      alert((error as Error).message);
    }
  };

  const onSubmit = (data: emailFormRecovery) => {
    if (!isValid) {
      return;
    }
    sendMail(data);
  };

  return (
    <>
      <Header title={"Recuperar contraseña"} subtitle={""} />
      <ContainerWeb>
        <div className="flex flex-col items-center justify-center">
          <div className="relative z-20 w-[90%] h-auto mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black lg:w-[70%]">
            {step ? (
              <>
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center mb-4">
                  Recuperar contraseña
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Correo Electrónico</Label>
                    <Input
                      {...register("email")}
                      id="email"
                      placeholder="Escribe tu correo electrónico"
                      type="email"
                      className={cn(
                        errors.email && "bg-red-100 focus:bg-red-100"
                      )}
                    />
                    {errors.email ? (
                      <span className="text-red-500 text-sm mt-1">
                        {errors?.email.message?.toString()}
                      </span>
                    ) : emailError ? (
                      <span className="text-red-500 text-sm mt-1">
                        {emailError.toString()}
                      </span>
                    ) : null}
                  </LabelInputContainer>
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
                    >
                      Enviar
                    </button>
                  </div>
                </form>
              </>
            ) : (
              <>
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center mb-4">
                  ¡Correo enviado!
                </h2>
                <p className="child w-full text-neutral-600 text-sm mt-2 dark:text-neutral-300 text-justify">
                  {text}
                </p>
              </>
            )}
          </div>
        </div>
      </ContainerWeb>
    </>
  );
}

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