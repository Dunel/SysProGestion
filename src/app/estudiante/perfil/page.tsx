"use client";
import ContainerWeb from "@/components/ContainerWeb";
import GridContainer from "@/components/GridContainer";
import GridMain from "@/components/GridMain";
import GridSecond from "@/components/GridSecond";
import Header from "@/components/Header";
import { useSession } from "next-auth/react";
import EstudianteProfile from "@/components/perfiles/EstudianteProfile";
import axios from "axios";
import { profileSchema, ProfileFormData } from "@/validations/profile.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/components/lib/utils";

export default function Page() {
  const { data: session, update } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });

  const profileUpdate = async (data: ProfileFormData) => {
    try {
      const res = await axios.post("/api/estudiante/perfil", data);
      if (session) {
        await update({ profile: true });
      }
      console.log(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    }
  };

  return (
    <>
      <Header
        title={"Tu Perfil"}
        subtitle={
          "Este es tu perfil, aquí podrás visualizar tu información personal y actualizarla si es necesario."
        }
      />
      <ContainerWeb>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <GridMain>
            <GridContainer>
              {session?.user.profile ? "true" : "false"}
              <EstudianteProfile />
            </GridContainer>
          </GridMain>

          <GridSecond>
            <GridContainer>
              <form onSubmit={handleSubmit(profileUpdate)}>
                <LabelInputContainer className="mb-4">
                  <Label htmlFor="names">Nombres</Label>
                  <Input
                    {...register("names")}
                    id="names"
                    placeholder="Nombres"
                    type="text"
                    className={cn(
                      errors.names && "bg-red-100 focus:bg-red-100"
                    )}
                  />
                  {errors.names && (
                    <p className="text-red-500 text-sm">
                      {errors.names.message}
                    </p>
                  )}
                </LabelInputContainer>

                <LabelInputContainer className="mb-4">
                  <Label htmlFor="lastnames">Apellidos</Label>
                  <Input
                    {...register("lastnames")}
                    id="lastnames"
                    placeholder="Apellidos"
                    type="text"
                    className={cn(
                      errors.lastnames && "bg-red-100 focus:bg-red-100"
                    )}
                  />
                  {errors.lastnames && (
                    <p className="text-red-500 text-sm">
                      {errors.lastnames.message}
                    </p>
                  )}
                </LabelInputContainer>

                <LabelInputContainer className="mb-4">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    {...register("phone")}
                    id="phone"
                    placeholder="Teléfono"
                    type="text"
                    className={cn(
                      errors.phone && "bg-red-100 focus:bg-red-100"
                    )}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm">
                      {errors.phone.message}
                    </p>
                  )}
                </LabelInputContainer>

                <LabelInputContainer className="mb-4">
                  <Label htmlFor="address">Dirección</Label>
                  <Input
                    {...register("address")}
                    id="address"
                    placeholder="Dirección"
                    type="text"
                    className={cn(
                      errors.address && "bg-red-100 focus:bg-red-100"
                    )}
                  />
                  {errors.address && (
                    <p className="text-red-500 text-sm">
                      {errors.address.message}
                    </p>
                  )}
                </LabelInputContainer>

                <LabelInputContainer className="mb-4">
                  <Label htmlFor="university">Universidad</Label>
                  <Input
                    {...register("university")}
                    id="university"
                    placeholder="Universidad"
                    type="text"
                    className={cn(
                      errors.university && "bg-red-100 focus:bg-red-100"
                    )}
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
                    className={cn(
                      errors.quarter && "bg-red-100 focus:bg-red-100"
                    )}
                  />
                  {errors.quarter && (
                    <p className="text-red-500 text-sm">
                      {errors.quarter.message}
                    </p>
                  )}
                </LabelInputContainer>

                <LabelInputContainer className="mb-4">
                  <Label htmlFor="skills">Habilidades</Label>
                  <Input
                    {...register("skills")}
                    id="skills"
                    placeholder="Habilidades"
                    type="text"
                    className={cn(
                      errors.skills && "bg-red-100 focus:bg-red-100"
                    )}
                  />
                  {errors.skills && (
                    <p className="text-red-500 text-sm">
                      {errors.skills.message}
                    </p>
                  )}
                </LabelInputContainer>

                <LabelInputContainer className="mb-4">
                  <Label htmlFor="interests">Intereses</Label>
                  <Input
                    {...register("interests")}
                    id="interests"
                    placeholder="Intereses"
                    type="text"
                    className={cn(
                      errors.interests && "bg-red-100 focus:bg-red-100"
                    )}
                  />
                  {errors.interests && (
                    <p className="text-red-500 text-sm">
                      {errors.interests.message}
                    </p>
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

                <button
                  type="submit"
                  className="w-full h-10 px-3 text-base text-white bg-gray-500 rounded-lg focus:shadow-outline"
                >
                  Guardar
                </button>
              </form>
            </GridContainer>
          </GridSecond>
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
