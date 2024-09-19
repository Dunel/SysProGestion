"use client";
import ContainerWeb from "@/components/ContainerWeb";
import Header from "@/components/Header";
import { cn } from "@/components/lib/utils";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  recoveryPasswordSchema,
  recoveryCodeSchema,
  recoveryPasswordForm,
  recoveryCodeForm,
} from "@/validations/code.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Page({ params }: { params: { recovery: string[] } }) {
  const [step, setStep] = useState(0);
  const [code, setCode] = useState(Number);
  const [id, setId] = useState(String);
  const [recoveryError, setRecoveryError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<recoveryPasswordForm>({
    resolver: zodResolver(recoveryPasswordSchema),
    mode: "onChange",
  });

  const onSubmit = (data: recoveryPasswordForm) => {
    if (!isValid) {
      return;
    }
    validatePassword(data);
  };

  const validatePassword = async (data: recoveryPasswordForm) => {
    try {
      const res = await axios.put("/api/recovery", {
        id: id,
        code: code,
        password: data.password,
        passwordConfirmation: data.passwordConfirmation,
      });
      setStep(2);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
        return setRecoveryError(error.response?.data.error);
      }
      console.error("Error al validar el código:", error);
      alert((error as Error).message);
    }
  };

  const validateRecovery = async (data: recoveryCodeForm) => {
    try {
      const res = await axios.get(
        "/api/recovery?code=" + data.code + "&id=" + data.id
      );
      setStep(1);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error(error.response?.data);
        return setRecoveryError(error.response?.data.error);
      }
      console.error("Error al validar el código:", error);
      alert((error as Error).message);
    }
  };

  useEffect(() => {
    if (params.recovery.length === 2) {
      const validate = recoveryCodeSchema.safeParse({
        code: params.recovery[0],
        id: params.recovery[1],
      });
      if (validate.success) {
        setCode(validate.data.code);
        setId(validate.data.id);
        validateRecovery(validate.data);
      }
    }
  }, []);

  return (
    <>
      <Header title={"Recuperacion de Contraseña"} subtitle={""} />
      <ContainerWeb>
        <div className="flex flex-col items-center justify-center">
          <div className="relative z-20 w-[90%] h-auto mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black lg:w-[70%]">
            {step === 0 && (
              <>
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center mb-4">
                  ¡Link no valido!
                </h2>
                <p className="child w-full text-neutral-600 text-sm mt-2 dark:text-neutral-300 text-justify">
                  El link que intentas usar no es valido, por favor verifica el
                  link que hemos enviado al correo.
                </p>
              </>
            )}
            {step === 1 && (
              <>
                <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center mb-4">
                  Recuperar contraseña
                </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Contraseña</Label>
                    <Input
                      {...register("password")}
                      id="password"
                      placeholder="Nueva Contraseña"
                      type="password"
                      className={cn(
                        errors.password && "bg-red-100 focus:bg-red-100"
                      )}
                    />
                    {errors.password && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors?.password.message?.toString()}
                      </span>
                    )}
                  </LabelInputContainer>

                  <LabelInputContainer className="mb-4">
                    <Label htmlFor="password2">Confirmar Contraseña</Label>
                    <Input
                      {...register("passwordConfirmation")}
                      id="password2"
                      placeholder="La Contraseña nuevamente"
                      type="password"
                      className={cn(
                        errors.passwordConfirmation &&
                          "bg-red-100 focus:bg-red-100"
                      )}
                    />
                    {errors.passwordConfirmation && (
                      <span className="text-red-500 text-sm mt-1">
                        {errors?.passwordConfirmation.message?.toString()}
                      </span>
                    )}
                  </LabelInputContainer>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset]"
                    >
                      Enviar
                    </button>
                  </div>
                  {recoveryError ? (
                    <span className="text-red-500 text-sm mt-1">
                      {recoveryError.toString()}
                    </span>
                  ) : null}
                </form>
              </>
            )}{" "}
            {step === 2 && (
              <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center mb-4">
                ¡Contraseña actualizada!
              </h2>
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
