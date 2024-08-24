"use client";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/components/lib/utils";
import { useEffect, useState } from "react";

type Step1Props = {
    setCode: Function;
    validateCode: Function;
    time?: number;
};

export default function Step1({ setCode, validateCode, time }: Step1Props) {
  const [countdown, setCountdown] = useState<string>("5:00");

  useEffect(() => {
    if (!time) return;

    const calculateTimeLeft = () => {
      const now = Date.now();
      const expirationTime = time + 5 * 60 * 1000; // 5 minutos después del tiempo proporcionado
      const difference = expirationTime - now;

      if (difference <= 0) {
        return "0:00";
      }

      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    };

    const timer = setInterval(() => {
      const timeLeft = calculateTimeLeft();
      setCountdown(timeLeft);

      if (timeLeft === "0:00") {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  return (
    <div className="child w-4/5 w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
      <h2 className="font-bold text-1xl text-neutral-800 dark:text-neutral-200 text-justify">
        Introduce el codigo que hemos enviado a tu correo!
      </h2>
   
      <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 mb-4">
  
      </div>
      <LabelInputContainer className="mb-4 relative z-50">
        <Label htmlFor="password">Codigo</Label>
        <Input id="password" type="password" onChange={(e) => setCode(e.target.value)}/>
      </LabelInputContainer>
      <br/>
      <br/>
      <button
        className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
        onClick={() => validateCode()}
      >
        Enviar Codigo
        <BottomGradient />
      </button>
      <div className="mt-4 text-center">
        {countdown !== "0:00" 
          ? `Envia el codigo antes que el tiempo: ${countdown}` 
          : 'Tiempo agotado!'}
      </div>
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