"use client";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/components/lib/utils";
import { Oval } from "react-loader-spinner";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProfileDepenFormData,
  profileDepenSchema,
} from "@/validations/profile.schema";

interface ProfileProps {
  onToggleForm: () => void;
  titleForm: string;
}

export default function DependenciaProfileForm({
  onToggleForm,
  titleForm,
}: ProfileProps) {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileDepenFormData>({
    resolver: zodResolver(profileDepenSchema),
    mode: "onChange",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValue(name as keyof ProfileDepenFormData, value);
  };

  const profileUpdate = async (data: ProfileDepenFormData) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/dependencia/perfil", data);
      if (session) {
        await update({ profile: true, dataProfile: data });
      }
      router.push("/dependencia/perfil");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    } finally {
      setLoading(false);
      onToggleForm();
    }
  };

  const onSubmit = (data: ProfileDepenFormData) => {
    const formData = {
      ...data,
    };
    const validate = profileDepenSchema.safeParse(formData);
    if (!validate.success) {
      console.error(validate.error);
      return;
    }
    profileUpdate(formData as ProfileDepenFormData);
  };

  return (
    <>
      <div className="flex flex-col my-4 p-4 md:space-x-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center md:text-3xl">
          {titleForm}
        </h2>
      </div>
      <div className="flex flex-col m-4 my-4 p-4 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit(onSubmit)} className="form-student-info">
          <LabelInputContainer className="mb-4">
            <Label htmlFor="names">Nombres</Label>
            <Input
              {...register("names")}
              defaultValue={session?.user.dataProfile?.names || ""}
              onChange={handleInputChange}
              id="names"
              name="names"
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
              defaultValue={session?.user.dataProfile?.lastnames || ""}
              onChange={handleInputChange}
              id="lastnames"
              name="lastnames"
              placeholder="Apellidos"
              type="text"
              className={cn(errors.lastnames && "bg-red-100 focus:bg-red-100")}
            />
            {errors.lastnames && (
              <p className="text-red-500 text-sm">{errors.lastnames.message}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="name">Nombre de la dependencia</Label>
            <Input
              {...register("name")}
              defaultValue={session?.user.dataProfile?.name || ""}
              onChange={handleInputChange}
              id="name"
              name="name"
              placeholder="Nombre de la dependencia"
              type="text"
              className={cn(errors.name && "bg-red-100 focus:bg-red-100")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="phone">Teléfono de la dependencia</Label>
            <Input
              {...register("phone")}
              defaultValue={session?.user.dataProfile?.phone || ""}
              onChange={handleInputChange}
              id="phone"
              name="phone"
              placeholder="Teléfono"
              type="text"
              className={cn(errors.phone && "bg-red-100 focus:bg-red-100")}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="address">Dirección de la dependencia</Label>
            <Input
              {...register("address")}
              defaultValue={session?.user.dataProfile?.address || ""}
              onChange={handleInputChange}
              id="address"
              name="address"
              placeholder="Dirección"
              type="text"
              className={cn(errors.address && "bg-red-100 focus:bg-red-100")}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </LabelInputContainer>

            <LabelInputContainer className="mb-4">
                <Label htmlFor="email">Correo de la dependencia</Label>
                <Input
                {...register("email")}
                defaultValue={session?.user.dataProfile?.email || ""}
                onChange={handleInputChange}
                id="email"
                name="email"
                placeholder="Correo"
                type="email"
                className={cn(errors.email && "bg-red-100 focus:bg-red-100")}
                />
                {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
                )}
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
                <Label htmlFor="rif">RIF de la dependencia</Label>
                <Input
                {...register("rif")}
                defaultValue={session?.user.dataProfile?.rif || ""}
                onChange={handleInputChange}
                id="rif"
                name="rif"
                placeholder="RIF"
                type="text"
                className={cn(errors.rif && "bg-red-100 focus:bg-red-100")}
                />
                {errors.rif && (
                <p className="text-red-500 text-sm">{errors.rif.message}</p>
                )}
            </LabelInputContainer>

            <LabelInputContainer className="mb-4">
                <Label htmlFor="social">Red social de la dependencia</Label>
                <Input
                {...register("social")}
                defaultValue={session?.user.dataProfile?.social || ""}
                onChange={handleInputChange}
                id="social"
                name="social"
                placeholder="Red social"
                type="text"
                className={cn(errors.social && "bg-red-100 focus:bg-red-100")}
                />
                {errors.social && (
                <p className="text-red-500 text-sm">{errors.social.message}</p>
                )}
            </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="description">Breve descripción de la dependencia</Label>
            <Input
              {...register("description")}
              type="textarea"
              defaultValue={session?.user.dataProfile?.description || ""}
              onChange={handleInputChange}
              id="description"
              name="description"
              placeholder="Soy una persona responsable, hablo inglés fluido y me apasiona la naturaleza..."
              className={`w-full h-[12vh] overflow-hidden text-ellipsis white-space-nowrap ${cn(
                errors.description && "bg-red-100 focus:bg-red-100"
              )}`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </LabelInputContainer>

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-[100%] bg-black hover:bg-gray-800 text-white font-bold py-1 px-1 mt-4 rounded focus:shadow-outline md:w-[80%]"
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
