"use client";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/components/lib/utils";
import { Oval } from "react-loader-spinner";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProfileAlcaldiaFormData,
  profileAlcaldiaSchema,
} from "@/validations/profile.schema";

interface ProfileProps {
  onToggleForm: () => void;
  titleForm: string;
}

interface Estados {
  id: number;
  estado: string;
}

interface Municipios {
  id: number;
  estadoId: number;
  municipio: string;
}

interface Parroquias {
  id: number;
  municipioId: number;
  parroquia: string;
}

export default function AlcaldiaProfileForm({
  onToggleForm,
  titleForm,
}: ProfileProps) {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [estados, setEstados] = useState<Estados[]>([]);
  const [estadoOpen, setEstadoOpen] = useState(false);
  const [municipios, setMunicipios] = useState<Municipios[]>([]);
  const [municipiosOpen, setMunicipiosOpen] = useState(false);
  const [parroquias, setParroquias] = useState<Parroquias[]>([]);
  const [parroquiasOpen, setparroquiasOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProfileAlcaldiaFormData>({
    resolver: zodResolver(profileAlcaldiaSchema),
    mode: "onChange",
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValue(name as keyof ProfileAlcaldiaFormData, value);
  };

  const profileUpdate = async (data: ProfileAlcaldiaFormData) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/alcaldia/perfil", data);
      if (session) {
        await update({
          profile: true,
          dataProfile: {
            ...data,
            estado: estados.find((e) => e.id === data.estadoId)?.estado,
            municipio: municipios.find((e) => e.id === data.municipioId)
              ?.municipio,
            parroquia: parroquias.find((e) => e.id === data.parroquiaId)
              ?.parroquia,
          },
        });
      }
      router.push("/alcaldia/perfil");
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

  console.log('antes onsubmit');
  const onSubmit = (data: ProfileAlcaldiaFormData) => {
    console.log('dentro onsubmit', data);

    
    const formData = {
      ...data,
    };
    const validate = profileAlcaldiaSchema.safeParse(formData);
    if (!validate.success) {
      console.error(validate.error);
      return;
    }
    console.log('hola2')
    profileUpdate(formData as ProfileAlcaldiaFormData);
  };

  const getEstados = async () => {
    try {
      const res = await axios.get("/api/venezuela/estados");
      setEstados(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    }
  };

  const getMunicipios = async () => {
    try {
      if (watch("estadoId") === 0 || !watch("estadoId")) {
        setMunicipios([]);
        return;
      }
      const res = await axios.get(
        "/api/venezuela/municipios?estadoId=" + watch("estadoId")
      );
      setMunicipios(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    }
  };

  const getParroquias = async () => {
    try {
      if (watch("municipioId") === 0 || !watch("municipioId")) {
        setParroquias([]);
        return;
      }
      const res = await axios.get(
        "/api/venezuela/parroquias?municipioId=" + watch("municipioId")
      );
      setParroquias(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    }
  };

  useEffect(() => {
    getEstados();
    if (session?.user.dataProfile) {
      setValue("estadoId", session.user.dataProfile.estadoId);
      getMunicipios();
      setValue("municipioId", session.user.dataProfile.municipioId);
      getParroquias();
      setValue("parroquiaId", session.user.dataProfile.parroquiaId);
    }
  }, []);

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
            <Label htmlFor="names">
              Nombres del Representante de la Alcaldia
            </Label>
            <Input
              {...register("names")}
              defaultValue={session?.user.dataProfile?.names || ""}
              onChange={handleInputChange}
              id="names"
              name="names"
              placeholder="Jose Manuel"
              type="text"
              className={cn(errors.names && "bg-red-100 focus:bg-red-100")}
            />
            {errors.names && (
              <p className="text-red-500 text-sm">{errors.names.message}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="lastnames">
              Apellidos del Representante de la Alcaldia
            </Label>
            <Input
              {...register("lastnames")}
              defaultValue={session?.user.dataProfile?.lastnames || ""}
              onChange={handleInputChange}
              id="lastnames"
              name="lastnames"
              placeholder="Oropeza Mora"
              type="text"
              className={cn(errors.lastnames && "bg-red-100 focus:bg-red-100")}
            />
            {errors.lastnames && (
              <p className="text-red-500 text-sm">{errors.lastnames.message}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="name">Nombre de la Alcaldia</Label>
            <Input
              {...register("name")}
              defaultValue={session?.user.dataProfile?.name || ""}
              onChange={handleInputChange}
              id="name"
              name="name"
              placeholder="Alcaldia de Maracaibo"
              type="text"
              className={cn(errors.name && "bg-red-100 focus:bg-red-100")}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="phone">Teléfono de la Alcaldia</Label>
            <Input
              {...register("phone")}
              defaultValue={session?.user.dataProfile?.phone || ""}
              onChange={handleInputChange}
              id="phone"
              name="phone"
              placeholder="04240000001"
              type="phone"
              className={cn(errors.phone && "bg-red-100 focus:bg-red-100")}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="estado">Estado</Label>
            <div className="relative">
              <Input
                id="estado"
                type="text"
                value={
                  estados.find((e) => e.id === watch("estadoId"))?.estado || ""
                }
                onClick={() => setEstadoOpen(!estadoOpen)}
                readOnly
                className="bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                placeholder="Selecciona una institución"
              />
              {estadoOpen && (
                <div className="absolute z-20 mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
                  {estados.map((e, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        if (e.id !== watch("estadoId")) {
                          setValue("estadoId", e.id);
                          getMunicipios();
                          setValue("municipioId", 0);
                          setValue("parroquiaId", 0);
                        }
                        setEstadoOpen(false);
                      }}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {e.estado}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.estadoId && (
              <p className="text-red-500 text-sm">{errors.estadoId.message}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="municipio">Municipio</Label>
            <div className="relative">
              <Input
                id="municipioId"
                type="text"
                value={
                  municipios.find((e) => e.id === watch("municipioId"))
                    ?.municipio || ""
                }
                onClick={() => setMunicipiosOpen(!municipiosOpen)}
                readOnly
                className="bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                placeholder="Selecciona una institución"
              />
              {municipiosOpen && (
                <div className="absolute z-20 mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
                  {municipios.map((e, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        if (e.id !== watch("municipioId")) {
                          setValue("municipioId", e.id);
                          setValue("parroquiaId", 0);
                        }
                        getParroquias();
                        setMunicipiosOpen(false);
                      }}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {e.municipio}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.municipioId && (
              <p className="text-red-500 text-sm">
                {errors.municipioId.message}
              </p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="parroquia">Parroquia</Label>
            <div className="relative">
              <Input
                id="parroquiaId"
                type="text"
                value={
                  parroquias.find((e) => e.id === watch("parroquiaId"))
                    ?.parroquia || ""
                }
                onClick={() => setparroquiasOpen(!parroquiasOpen)}
                readOnly
                className="bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                placeholder="Selecciona una institución"
              />
              {parroquiasOpen && (
                <div className="absolute z-20 mt-1 max-h-60 overflow-auto bg-white border border-gray-300 rounded-md shadow-lg">
                  {parroquias.map((e, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setValue("parroquiaId", e.id);
                        setparroquiasOpen(false);
                      }}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {e.parroquia}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.parroquiaId && (
              <p className="text-red-500 text-sm">
                {errors.parroquiaId.message}
              </p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="address">Dirección de la Alcaldia</Label>
            <Input
              {...register("address")}
              defaultValue={session?.user.dataProfile?.address || ""}
              onChange={handleInputChange}
              id="address"
              name="address"
              placeholder="Municipio Maracaibo Av. 10 con calle..."
              type="text"
              className={cn(errors.address && "bg-red-100 focus:bg-red-100")}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="email">Correo de la Alcaldia</Label>
            <Input
              {...register("email")}
              defaultValue={session?.user.dataProfile?.email || ""}
              onChange={handleInputChange}
              id="email"
              name="email"
              placeholder="concejomunimaracaibo@gmail.com"
              type="email"
              className={cn(errors.email && "bg-red-100 focus:bg-red-100")}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </LabelInputContainer>

          
          <LabelInputContainer className="mb-4">
            <Label htmlFor="social">
              Link de la Red Social de la Alcaldia
            </Label>
            <Input
              {...register("social")}
              defaultValue={session?.user.dataProfile?.social || ""}
              onChange={handleInputChange}
              id="social"
              name="social"
              placeholder="Link de la Red social"
              type="text"
              className={cn(errors.social && "bg-red-100 focus:bg-red-100")}
            />
            {errors.social && (
              <p className="text-red-500 text-sm">{errors.social.message}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-4">
            <Label htmlFor="description">
              Breve Descripción de la Alcaldia
            </Label>
            <Input
              {...register("description")}
              type="textarea"
              defaultValue={session?.user.dataProfile?.description || ""}
              onChange={handleInputChange}
              id="description"
              name="description"
              placeholder="El Concejo crea leyes municipales y..."
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
