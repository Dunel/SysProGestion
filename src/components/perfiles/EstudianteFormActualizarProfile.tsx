"use client";
import { useSession } from "next-auth/react";
import axios from "axios";
import { profileSchema, ProfileFormData } from "@/validations/profile.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/components/lib/utils";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Oval } from "react-loader-spinner";

interface EstudianteFormProfileProps {
  onToggleForm: () => void;
  titleForm: string;
}

export default function EstudianteProfileForm({
  onToggleForm,
  titleForm,
}: EstudianteFormProfileProps) {
  const { data: session, update } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState(null);
  const [pdfFileName, setPdfFileName] = useState("");

  const profileUpdate = async (data: ProfileFormData) => {
    try {
      setLoading(true); // Muestra el loader
      const res = await axios.post("/api/estudiante/perfil", data);
      if (session) {
        await update({ profile: true, dataProfile: data });
      }
      console.log(res.data);
      router.push("/estudiante/perfil");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    } finally {
      setLoading(false); // Muestra el loader
      onToggleForm;
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as any);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePdfChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPdfFileName(file.name);
    }
  };

  return (
    <>
      <div className="flex flex-col my-4 p-4 md:space-x-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center dm:text-4xl lg:text-5xl">
          {titleForm}
        </h2>
      </div>
      <div className=" flex flex-col m-4 my-4 p-4 rounded-lg shadow-lg">
        <form
          onSubmit={handleSubmit(profileUpdate)}
          className="form-student-info"
        >
          <LabelInputContainer className="mb-4">
            <Label htmlFor="names">Nombres</Label>
            <Input
              {...register("names")}
              id="names"
              placeholder="Nombres"
              type="text"
              className={cn(errors.names && "bg-red-100 focus:bg-red-100")}
            />
            {errors.names && (
              <p className="text-red-500 text-sm">{errors.names.message}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="lastnames">Apellidos</Label>
            <Input
              {...register("lastnames")}
              id="lastnames"
              placeholder="Apellidos"
              type="text"
              className={cn(errors.lastnames && "bg-red-100 focus:bg-red-100")}
            />
            {errors.lastnames && (
              <p className="text-red-500 text-sm">{errors.lastnames.message}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              {...register("phone")}
              id="phone"
              placeholder="Teléfono"
              type="text"
              className={cn(errors.phone && "bg-red-100 focus:bg-red-100")}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="address">Dirección</Label>
            <Input
              {...register("address")}
              id="address"
              placeholder="Dirección"
              type="text"
              className={cn(errors.address && "bg-red-100 focus:bg-red-100")}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="university">Universidad </Label>
            <Input
              {...register("university")}
              id="university"
              placeholder="Universidad"
              type="text"
              className={cn(errors.university && "bg-red-100 focus:bg-red-100")}
            />
            {errors.university && (
              <p className="text-red-500 text-sm">
                {errors.university.message}
              </p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="university">
              Carrera <mark> -Agr a la BBDD- </mark>{" "}
            </Label>
            <Input
              // {...register("carrera")}
              // id="university"
              placeholder="Carrera que cursas"
              type="text"
              className={cn(errors.university && "bg-red-100 focus:bg-red-100")}
            />
            {errors.university && (
              <p className="text-red-500 text-sm">
                {errors.university.message}
              </p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="quarter">Trimestre</Label>
            <Input
              {...register("quarter")}
              id="quarter"
              placeholder="Trimestre"
              type="text"
              className={cn(errors.quarter && "bg-red-100 focus:bg-red-100")}
            />
            {errors.quarter && (
              <p className="text-red-500 text-sm">{errors.quarter.message}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="skills">Habilidades</Label>
            <Input
              {...register("skills")}
              id="skills"
              placeholder="Habilidades"
              type="text"
              className={cn(errors.skills && "bg-red-100 focus:bg-red-100")}
            />
            {errors.skills && (
              <p className="text-red-500 text-sm">{errors.skills.message}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="interests">Intereses</Label>
            <Input
              {...register("interests")}
              id="interests"
              placeholder="Intereses"
              type="text"
              className={cn(errors.interests && "bg-red-100 focus:bg-red-100")}
            />
            {errors.interests && (
              <p className="text-red-500 text-sm">{errors.interests.message}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="description">Descripción</Label>
            <Input
              {...register("description")}
              id="description"
              placeholder="Descripción"
              type="text"
              className={cn(
                errors.description && "bg-red-100 focus:bg-red-100"
              )}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </LabelInputContainer>

          {/* //TODO: TEMENOS QUE AGREGAR ESTOS INPUTS A BBDD */}
          {/* **** Imagen de Perfil **** */}
          <Label>
            Sube tu foto <mark> -Agr a la BBDD- </mark>{" "}
          </Label>
          <div className="w-[100%] m-2 dm:w-[50%]">
            <Input type="file" accept="image/*" onChange={handleImageChange} />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Vista previa"
                className="mx-auto my-4 w-[40%] h-auto"
              />
            )}
          </div>

          {/* **** Curriculum PDF **** */}
          <Label>
            Sube tu currículum (Formato PDF) <mark> -Agr a la BBDD- </mark>{" "}
          </Label>
          <div className="w-[100%] m-2 dm:w-[50%]">
            <Input
              type="file"
              accept="application/pdf"
              onChange={handlePdfChange}
            />
            {pdfFileName && (
              <p className="my-4 text-center">
                Archivo seleccionado: {pdfFileName}
              </p>
            )}
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[100%] bg-black hover:bg-blue-600 text-white font-bold py-1 px-1 mt-4 rounded focus:shadow-outline md:w-[80%]"
            >
              Guardar
            </button>
          </div>
        </form>
        {loading && ( // Muestra el loader si está cargando
          <div className="flex justify-center items-center flex-col mt-10">
            <Oval
              color="#000000"
              secondaryColor="#FFFFFF" // Color de fondo blanco
              height={50}
              width={50}
              strokeWidth={5}
            />
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