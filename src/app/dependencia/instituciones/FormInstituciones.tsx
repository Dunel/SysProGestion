"use client";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/components/lib/utils";
import { Oval } from "react-loader-spinner";
import { institucionesYcarrerasSchema, InstitucionesYcarrerasSchema } from "@/validations/institucionesYcarreras.schema";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

export default function FormInstituciones({
  titleForm,
  setRecords,
}: {
  titleForm: string;
  setRecords: React.Dispatch<React.SetStateAction<any[]>>;
}) {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    codigoInstitucion: "",
    nombreInstitucion: "",
    parroquiaInstitucion: "",
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<InstitucionesYcarrerasSchema>({
    resolver: zodResolver(institucionesYcarrerasSchema),
    mode: "onChange",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    setValue(name as keyof InstitucionesYcarrerasSchema, value);
  };

  const profileUpdate = async (data: InstitucionesYcarrerasSchema) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/estudiante/perfil", data);
      if (session) {
        await update({ profile: true, dataProfile: data });
      }
      router.push("/estudiante/perfil");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data: InstitucionesYcarrerasSchema) => {
    const newData = {
      ...data,
    };

    // Agregar el nuevo registro a la lista
    setRecords(prevRecords => [...prevRecords, newData]);

    const validate = institucionesYcarrerasSchema.safeParse(newData);
    if (!validate.success) {
      console.error(validate.error);
      return;
    }
    
    profileUpdate(newData as InstitucionesYcarrerasSchema);
  };

  return (
    <>
      <div className="flex flex-col my-2 md:space-x-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center md:text-3xl">
          {titleForm}
        </h2>
      </div>
      <div className="flex flex-col m-2 my-2 p-2 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="mb-8 form-student-info">


          <LabelInputContainer className="mb-8">
            <Label htmlFor="codigoInstitucion">Código de la Institución Educativa *</Label>
            <Input
              {...register("codigoInstitucion")}
              onChange={handleInputChange}
              id="codigoInstitucion"
              name="codigoInstitucion"
              placeholder="UNI-PUBLICA-LUZ-00098C"
              type="text"
              className={"bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none" + cn(errors.codigoInstitucion && "bg-red-100 focus:bg-red-100")}
            />
            {errors.codigoInstitucion ? (
              <>
                <p className="text-red-500 text-sm">{errors.codigoInstitucion.message?.toString()}</p>
                <span className="text-gray-500 text-xs">El código debe tener entre 3 y 50 caracteres.</span>
              </>
            ) : (
              <span className="text-gray-500 text-xs">El código debe tener entre 3 y 50 caracteres.</span>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="nombreInstitucion">Nombre de la Institución Educativa *</Label>
            <Input
              {...register("nombreInstitucion")}
              onChange={handleInputChange}
              id="nombreInstitucion"
              name="nombreInstitucion"
              placeholder="Universidad del Zulia"
              type="text"
              className={"bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none" + cn(errors.nombreInstitucion && "bg-red-100 focus:bg-red-100")}
            />
            {errors.nombreInstitucion ? (
              <>
                <p className="text-red-500 text-sm">{errors.nombreInstitucion.message?.toString()}</p>
                <span className="text-gray-500 text-xs">El nombre debe tener entre 3 y 50 caracteres.</span>
              </>
            ) : (
              <span className="text-gray-500 text-xs">El nombre debe tener entre 3 y 50 caracteres.</span>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="parroquiaInstitucion">Parroquia de la Institución Educativa *</Label>
            <Input
              {...register("parroquiaInstitucion")}
              onChange={handleInputChange}
              id="parroquiaInstitucion"
              name="parroquiaInstitucion"
              placeholder=""
              type="text"
              className={"bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none" + cn(errors.parroquiaInstitucion && "bg-red-100 focus:bg-red-100")}
            />
          </LabelInputContainer>

          <div className="flex justify-center mb-8">
            <button
              type="submit"
              className="w-[100%] bg-black hover:bg-gray-800 text-white font-bold py-3 px-3 mt-4 rounded focus:shadow-outline md:w-[80%]"
            >
              GUARDAR DATOS
            </button>
          </div>
        </form>

        {loading && (
          <div className="flex justify-center items-center flex-col mt-10">
            <Oval color="#000000" secondaryColor="#FFFFFF" height={50} width={50} strokeWidth={5} />
            <br />
            <span>Espere por favor...</span>
          </div>
        )}
      </div>
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