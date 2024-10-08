"use client";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/components/lib/utils";
import { Oval } from "react-loader-spinner";
import {
  profileSchemaEdit,
  ProfileFormDataEdit,
} from "@/validations/profile.schema";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

interface EstudianteFormProfileProps {
  data: {
    cedula: number;
    address: string;
    institution: {
      id: number;
    };
    career: {
      id: number;
    };
    skills: string[];
    interests: string;
    description: string;
    names: string;
    lastnames: string;
    dateStart: Date;
    dateEnd: Date;
    estadoId: number;
    municipioId: number;
    parroquiaId: number;
    birthdate: Date;
    phone: string;
    mail: string;
  } | null;
  regForm: boolean;
  handleReset: () => void;
  searchUser: Function;
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

interface Institutions {
  id: number;
  institutionsCode: string;
  name: string;
}

interface Career {
  id: number;
  careerCode: string;
  name: string;
}

export default function AlcaldiaFormEditStudent({
  data,
  searchUser,
  regForm,
  handleReset
}: EstudianteFormProfileProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [estados, setEstados] = useState<Estados[]>([]);
  const [estadoOpen, setEstadoOpen] = useState(false);
  const [municipios, setMunicipios] = useState<Municipios[]>([]);
  const [municipiosOpen, setMunicipiosOpen] = useState(false);
  const [parroquias, setParroquias] = useState<Parroquias[]>([]);
  const [parroquiasOpen, setparroquiasOpen] = useState(false);
  const [institutions, setInstitutions] = useState<Institutions[]>([]);
  const [career, setCareer] = useState<Career[]>([]);
  const [isUniversityOpen, setUniversityOpen] = useState(false);
  const [isCareerOpen, setCareerOpen] = useState(false);
  const [genderIsOpen, setGenderIsOpen] = useState(false);
  const gender = [{ name: "M" as "M" | "F" }, { name: "F" as "M" | "F" }];
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ProfileFormDataEdit>({
    resolver: zodResolver(profileSchemaEdit),
    mode: "onChange",
  });

  useEffect(() => {
    if (data && data.skills?.length > 0) {
      setSelectedSkills(data.skills);
    } else {
      setSelectedSkills([]);
    }
  }, [data?.skills]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValue(name as keyof ProfileFormDataEdit, value);
  };

  const skillsOptions = [
    { value: "resoluciondeproblemas", label: "Resolución de Problemas" },
    { value: "trabajoenequipo", label: "Trabajo en Equipo" },
    { value: "adaptabilidad", label: "Adaptabilidad" },
    { value: "comunicacionefectiva", label: "Comunicación Efectiva" },
    { value: "liderazgo", label: "Liderazgo" },
    { value: "pensamientocritico", label: "Pensamiento Crítico" },
    { value: "orientacionaresultados", label: "Orientación a Resultados" },
    { value: "creatividad", label: "Creatividad" },
    { value: "gestiondeltiempo", label: "Gestión del Tiempo" },
    { value: "aprendizajecontinuo", label: "Aprendizaje Continuo" },
    { value: "dondegente", label: "Don de Gente" },
    { value: "ensenanza", label: "Enseñanza" },
    { value: "sociable", label: "Sociable" },
    { value: "salud", label: "Salud" },
    { value: "deportes", label: "Deportes" },
    { value: "logistica", label: "Logística" },
    { value: "expresionesartisticas", label: "Expresiones Artísticas" },
    { value: "diseno", label: "Diseño" },
    { value: "musica", label: "Música" },
    { value: "ingles", label: "Inglés" },
    { value: "otrosidiomasnaturales", label: "Otros Idiomas Naturales" },
    { value: "lenguajesdeprogramacion", label: "Lenguajes de Programación" },
  ];

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const updatedSelectedSkills = checked
      ? [...selectedSkills, value]
      : selectedSkills.filter((skill) => skill !== value);
    setSelectedSkills(updatedSelectedSkills);

    setValue("skills", updatedSelectedSkills as Skills[]);
  };

  const profileUpdate = async (data: ProfileFormDataEdit) => {
    try {
      setLoading(true);
      const res = await axios.put("/api/alcaldia/users", data);
      alert("Actualización exitosa");
      await searchUser();
      //router.push("/alcaldia/estudiantes");
      //console.log(data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
        alert("ERROR: " + error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const profileRegister = async (data: ProfileFormDataEdit) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/alcaldia/users", data);
      alert("Registro completado");
      handleReset();
      router.push("/alcaldia/estudiantes");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
        alert("ERROR: " + error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = (data: ProfileFormDataEdit) => {
    const formData = {
      ...data,
      skills: selectedSkills,
    };
    const validate = profileSchemaEdit.safeParse(formData);
    if (!validate.success) {
      console.error(validate.error);
      return;
    }
    if (regForm) {
      profileRegister(formData as ProfileFormDataEdit);
    } else {
      profileUpdate(formData as ProfileFormDataEdit);
    }
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

  const getInsttt = async () => {
    try {
      const res = await axios.get("/api/alcaldia/institutions");
      setInstitutions(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    }
  };

  const getCareer = async () => {
    try {
      const res = await axios.get("/api/alcaldia/career");
      setCareer(res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data.error);
      } else {
        console.error("error:", error);
      }
    }
  };

  useEffect(() => {
    getInsttt();
    getEstados();
    getCareer();
    if (data) {
      setValue("estadoId", data.estadoId);
      getMunicipios();
      setValue("municipioId", data.municipioId);
      getParroquias();
      setValue("parroquiaId", data.parroquiaId);
      setValue("institutionId", data.institution?.id);
      setValue("careerId", data.career?.id);
    }
    setValue("dateStart", data?.dateStart || new Date());
    setValue("dateEnd", data?.dateEnd || new Date());
    setValue("cedula", data?.cedula || 0);
    setValue("birthdate", data?.birthdate || new Date());
    setValue("names", data?.names || "");
    setValue("lastnames", data?.lastnames || "");
    setValue("mail", data?.mail || "");
    setValue("phone", data?.phone || "");
    setValue("address", data?.address || "");
    setValue("description", data?.address || "");
    setValue("interests", data?.interests || "");
  }, [data]);

  return (
    <>
      <div className="flex flex-col my-2 md:space-x-4">
        <h2 className="text-3xl text-center font-extrabold my-2">
          {regForm ? " REGISTRAR NUEVO ESTUDIANTE" : "ACTUALIZAR DATOS"}
        </h2>
      </div>
      
      
      <div className="flex flex-col m-2 my-2 p-2 rounded-lg shadow-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-8 form-student-info"
        >
          {regForm && (
            <LabelInputContainer className="mb-8">
              <Label htmlFor="cedula">Cedula *</Label>
              <Input
                {...register("cedula")}
                value={watch("cedula") || ""}
                onChange={handleInputChange}
                id="cedula"
                name="cedula"
                placeholder="23456789"
                type="text"
                className={cn(errors.cedula && "bg-red-100 focus:bg-red-100")}
              />
              {errors.cedula && (
                <p className="text-red-500 text-sm">{errors.cedula.message}</p>
              )}
            </LabelInputContainer>
          )}

          <LabelInputContainer className="mb-8">
            <Label htmlFor="names">Nombres del estudiante *</Label>
            <Input
              {...register("names")}
              value={watch("names") || ""}
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

          <LabelInputContainer className="mb-8">
            <Label htmlFor="lastnames">Apellidos del estudiante *</Label>
            <Input
              {...register("lastnames")}
              value={watch("lastnames") || ""}
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

          <LabelInputContainer className="mb-8">
            <Label htmlFor="gender">Genero *</Label>
            <div className="relative">
              <Input
                id="gender"
                type="text"
                value={watch("gender")}
                onClick={() => setGenderIsOpen(!genderIsOpen)}
                readOnly
                className="bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                placeholder="Selecciona un Genero"
              />
              {genderIsOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                  {gender.map((e, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        setValue("gender", e.name);
                        setGenderIsOpen(false);
                      }}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {e.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.gender && (
              <p className="text-red-500 text-sm">{errors.gender.message}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="mail">Correo Electronico *</Label>
            <Input
              {...register("mail")}
              value={watch("mail") || ""}
              onChange={handleInputChange}
              id="mail"
              name="mail"
              placeholder="Correo electronico"
              type="mail"
              className={cn(errors.mail && "bg-red-100 focus:bg-red-100")}
            />
            {errors.mail && (
              <p className="text-red-500 text-sm">{errors.mail.message}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className=" flex m-2 md:w-[40%]">
            <Label htmlFor="birthdate">Fecha de nacimiento *</Label>
            <Input
              {...register("birthdate")}
              value={
                watch("birthdate")
                  ? new Date(watch("birthdate")).toISOString().split("T")[0]
                  : ""
              }
              id="birthdate"
              type="date"
              className={cn(errors.birthdate && "bg-red-100 focus:bg-red-100")}
            />
            {errors.birthdate ? (
              <>
                <p className="text-red-500 text-sm">
                  {errors.birthdate.message?.toString()}
                </p>
                <span className="text-gray-500 text-xs">
                  La fecha debe tener el formato dd/mm/yyyy.
                </span>
              </>
            ) : (
              <span className="text-gray-500 text-xs">
                La fecha debe tener el formato dd/mm/yyyy.
              </span>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="phone">Teléfono del estudiante</Label>
            <Input
              {...register("phone")}
              value={watch("phone") || ""}
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

          <LabelInputContainer className="mb-8">
            <Label htmlFor="estado">Estado *</Label>
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
                placeholder="Selecciona un estado"
              />
              {estadoOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                  {estados.map((e, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        if (e.id !== watch("estadoId")) {
                          setValue("estadoId", e.id);
                          setValue("municipioId", 0);
                          setValue("parroquiaId", 0);
                          getMunicipios();
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

          <LabelInputContainer className="mb-8">
            <Label htmlFor="municipio">Municipio *</Label>
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
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                  {municipios.map((e, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        if (e.id !== watch("municipioId")) {
                          setValue("municipioId", e.id);
                          setValue("parroquiaId", 0);
                          getParroquias();
                        }
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

          <LabelInputContainer className="mb-8">
            <Label htmlFor="parroquia">Parroquia *</Label>
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
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
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

          <LabelInputContainer className="mb-8">
            <Label htmlFor="address">Dirección del estudiante</Label>
            <Input
              {...register("address")}
              value={watch("address") || ""}
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

          <LabelInputContainer className="mb-8">
            <Label htmlFor="institutions">
              Institución Educativa del estudiante *
            </Label>
            <div className="relative">
              <Input
                id="institution"
                type="text"
                value={
                  institutions.find((e) => e.id === watch("institutionId"))
                    ?.name || ""
                }
                onClick={() => setUniversityOpen(!isUniversityOpen)}
                readOnly
                className="bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                placeholder="Selecciona una institución"
              />
              {isUniversityOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                  {institutions.map((e) => (
                    <div
                      key={e.id}
                      onClick={() => {
                        setValue("institutionId", e.id);
                        setUniversityOpen(false);
                      }}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {e.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.institutionId && (
              <p className="text-red-500 text-sm">
                {errors.institutionId.message}
              </p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="career">
              Especialización o carrera del estudiante *
            </Label>
            <div className="relative">
              <Input
                id="career"
                type="text"
                value={
                  career.find((e) => e.id === watch("careerId"))?.name || ""
                }
                onClick={() => setCareerOpen(!isCareerOpen)}
                readOnly
                className="bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                placeholder="Selecciona una carrera"
              />
              {isCareerOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                  {career.map((e) => (
                    <div
                      key={e.id}
                      onClick={() => {
                        setValue("careerId", e.id);
                        setCareerOpen(false);
                      }}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {e.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.careerId && (
              <p className="text-red-500 text-sm">{errors.careerId.message}</p>
            )}
          </LabelInputContainer>

          <div className="flex flex-col gap-[5%] mb-8 justify-start md:flex-row">
            <LabelInputContainer className=" flex m-2 md:w-[40%]">
              <Label htmlFor="datestart">Fecha de inicio del proceso *</Label>
              <Input
                {...register("dateStart")}
                value={
                  watch("dateStart")
                    ? new Date(watch("dateStart")).toISOString().split("T")[0]
                    : ""
                }
                id="datestart"
                type="date"
                className={cn(
                  errors.dateStart && "bg-red-100 focus:bg-red-100"
                )}
              />
              {errors.dateStart ? (
                <>
                  <p className="text-red-500 text-sm">
                    {errors.dateStart.message?.toString()}
                  </p>
                  <span className="text-gray-500 text-xs">
                    La fecha debe tener el formato dd/mm/yyyy.
                  </span>
                </>
              ) : (
                <span className="text-gray-500 text-xs">
                  La fecha debe tener el formato dd/mm/yyyy.
                </span>
              )}
            </LabelInputContainer>

            <LabelInputContainer className=" flex m-2 mr-20 md:w-[40%]">
              <Label htmlFor="dateEnd">
                Fecha de terminacion del proceso *
              </Label>
              <Input
                {...register("dateEnd")}
                value={
                  watch("dateEnd")
                    ? new Date(watch("dateEnd")).toISOString().split("T")[0]
                    : ""
                }
                id="dateEnd"
                type="date"
                className={cn(errors.dateEnd && "bg-red-100 focus:bg-red-100")}
              />
              {errors.dateEnd ? (
                <>
                  <p className="text-red-500 text-sm">
                    {errors.dateEnd.message?.toString()}
                  </p>
                  <span className="text-gray-500 text-xs">
                    La fecha debe tener el formato yyyy-mm-dd.
                  </span>
                </>
              ) : (
                <span className="text-gray-500 text-xs">
                  La fecha debe tener el formato yyyy-mm-dd.
                </span>
              )}
            </LabelInputContainer>
          </div>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="description">
              Breve descripción del estudiante.
            </Label>
            <Input
              {...register("description")}
              type="textarea"
              value={watch("description") || ""}
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

          <LabelInputContainer className="mb-8">
            <Label htmlFor="interests">Intereses del estudiante</Label>
            <Input
              {...register("interests")}
              type="textarea"
              value={watch("interests") || ""}
              onChange={handleInputChange}
              id="interests"
              name="interests"
              placeholder="Me interesa encontrar soluciones a problemas reales mediante el uso de tecnología..."
              className={`w-full h-[12vh] overflow-hidden text-ellipsis white-space-nowrap ${cn(
                errors.interests && "bg-red-100 focus:bg-red-100"
              )}`}
            />
            {errors.interests && (
              <p className="text-red-500 text-sm">{errors.interests.message}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="bankName">Nombre del Banco</Label>
            <Input
              {...register("bankName")}
              defaultValue={watch("bankName") || ""}
              onChange={handleInputChange}
              id="bankName"
              name="bankName"
              placeholder="Banco de Venezuela"
              type="text"
              className={cn(errors.bankName && "bg-red-100 focus:bg-red-100")}
            />
            {errors.bankName && (
              <p className="text-red-500 text-sm">{errors.bankName.message}</p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="bankAccount">Número de cuenta</Label>
            <Input
              {...register("bankAccount")}
              defaultValue={watch("bankAccount") || ""}
              onChange={handleInputChange}
              id="bankAccount"
              name="bankAccount"
              placeholder="0102-1234-56-7890123456"
              type="text"
              className={cn(
                errors.bankAccount && "bg-red-100 focus:bg-red-100"
              )}
            />
            {errors.bankAccount && (
              <p className="text-red-500 text-sm">
                {errors.bankAccount.message}
              </p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="cneRegister">¿Estas registrado en el cne?</Label>
            <Input
              {...register("cneRegister")}
              type="checkbox"
              defaultChecked={watch("cneRegister") || false}
              id="cneRegister"
              name="cneRegister"
              className={cn(
                errors.cneRegister && "bg-red-100 focus:bg-red-100"
              )}
            />
            {errors.cneRegister && (
              <p className="text-red-500 text-sm">
                {errors.cneRegister.message}
              </p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="cneCentroName">Nombre del centro de votación</Label>
            <Input
              {...register("cneCentroName")}
              defaultValue={watch("cneCentroName") || ""}
              onChange={handleInputChange}
              id="cneCentroName"
              name="cneCentroName"
              placeholder="Centro de votación"
              type="text"
              className={cn(
                errors.cneCentroName && "bg-red-100 focus:bg-red-100"
              )}
            />
            {errors.cneCentroName && (
              <p className="text-red-500 text-sm">
                {errors.cneCentroName.message}
              </p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="cneParroquia">
              Parroquia del centro de votación
            </Label>
            <Input
              {...register("cneParroquia")}
              defaultValue={watch("cneParroquia") || ""}
              onChange={handleInputChange}
              id="cneParroquia"
              name="cneParroquia"
              placeholder="Parroquia del centro de votación"
              type="text"
              className={cn(
                errors.cneParroquia && "bg-red-100 focus:bg-red-100"
              )}
            />
            {errors.cneParroquia && (
              <p className="text-red-500 text-sm">
                {errors.cneParroquia.message}
              </p>
            )}
          </LabelInputContainer>

          <LabelInputContainer className="mb-8">
            <Label htmlFor="skills">Habilidades del estudiante</Label>
            {skillsOptions.map(({ value, label }) => (
              <div key={value} className="flex items-center">
                <Input
                  type="checkbox"
                  value={value}
                  checked={selectedSkills.includes(value)}
                  onChange={handleCheckboxChange}
                  className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label
                  htmlFor={value}
                  className="ml-2 block text-sm text-gray-700"
                >
                  {label}
                </label>
              </div>
            ))}
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 m-2">
                Habilidades seleccionadas:
              </h3>
              <ul className="mt-2 list-disc list-inside text-sm text-gray-500">
                {selectedSkills.map((skill, index) => (
                  <li key={index}>
                    {
                      skillsOptions.find((option) => option.value === skill)
                        ?.label
                    }
                  </li>
                ))}
              </ul>
            </div>
          </LabelInputContainer>

          <div className="flex justify-center mb-8">
            <button
              type="submit"
              className="w-[80%] bg-black hover:bg-gray-800 text-white font-bold py-3 px-3 mt-4 rounded focus:shadow-outline md:w-[80%]"
            >
              GUARDAR DATOS
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

type Skills =
  | "resoluciondeproblemas"
  | "trabajoenequipo"
  | "adaptabilidad"
  | "comunicacionefectiva"
  | "liderazgo"
  | "pensamientocritico"
  | "orientacionaresultados"
  | "creatividad"
  | "gestiondeltiempo"
  | "aprendizajecontinuo"
  | "dondegente"
  | "ensenanza"
  | "sociable"
  | "salud"
  | "deportes"
  | "logistica"
  | "expresionesartisticas"
  | "diseno"
  | "musica"
  | "ingles"
  | "otrosidiomasnaturales"
  | "lenguajesdeprogramacion";
