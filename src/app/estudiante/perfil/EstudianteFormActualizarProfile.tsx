"use client";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/components/lib/utils";
import { Oval } from "react-loader-spinner";
import { profileSchema, ProfileFormData } from "@/validations/profile.schema";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

interface EstudianteFormProfileProps {
  onToggleForm: () => void;
  titleForm: string;
  data: {
    address: string;
    institution: {};
    career: {};
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
    phone: string;
  } | null;
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

export default function EstudianteProfileForm({
  onToggleForm,
  titleForm,
  data,
}: EstudianteFormProfileProps) {
  const { data: session, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [estados, setEstados] = useState<Estados[]>([]);
  const [estadoSelected, setEstadoSelected] = useState(0);
  const [estadoOpen, setEstadoOpen] = useState(false);
  const [municipios, setMunicipios] = useState<Municipios[]>([]);
  const [municipioSelected, setMunicipioSelected] = useState(0);
  const [municipiosOpen, setMunicipiosOpen] = useState(false);
  const [parroquias, setParroquias] = useState<Parroquias[]>([]);
  const [parroquiaSelected, setParroquiaSelected] = useState(0);
  const [parroquiasOpen, setparroquiasOpen] = useState(false);
  const [institutions, setInstitutions] = useState<Institutions[]>([]);
  const [career, setCareer] = useState<Career[]>([]);
  const [formData, setFormData] = useState({
    university: null,
    career: null,
    estadoId: null,
    municipioId: null,
    parroquiaId: null,
  });
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
    trigger,
  } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (session && session.user.dataProfile?.skills?.length > 0) {
      setSelectedSkills(session?.user.dataProfile.skills);
    } else {
      setSelectedSkills([]);
    }
  }, [session?.user.dataProfile?.skills]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setValue(name as keyof ProfileFormData, value);
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

  const profileUpdate = async (data: ProfileFormData) => {
    try {
      setLoading(true);
      const res = await axios.post("/api/estudiante/perfil", data);
      if (session) {
        await update({
          profile: true,
          dataProfile: {
            ...data,
            curriculum: session.user.dataProfile?.curriculum,
            institution: {
              id: data.institutionId,
              name: institutions.find((e) => e.id === data.institutionId)?.name,
              institutionCode: institutions.find(
                (e) => e.id === data.institutionId
              )?.institutionsCode,
            },
            career: {
              id: data.careerId,
              name: career.find((e) => e.id === data.careerId)?.name,
              careerCode: career.find((e) => e.id === data.careerId)
                ?.careerCode,
            },
            estado: estados.find((e) => e.id === data.estadoId)?.estado,
            municipio: municipios.find((e) => e.id === data.municipioId)
              ?.municipio,
            parroquia: parroquias.find((e) => e.id === data.parroquiaId)
              ?.parroquia,
          },
        });
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
      onToggleForm();
    }
  };

  const onSubmit = (data: ProfileFormData) => {
    const formData = {
      ...data,
      skills: selectedSkills,
    };
    const validate = profileSchema.safeParse(formData);
    if (!validate.success) {
      console.error(validate.error);
      return;
    }
    //console.log(formData as ProfileFormData);
    profileUpdate(formData as ProfileFormData);
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
      if (estadoSelected === 0 || !estadoSelected) {
        setMunicipios([]);
        return;
      }
      const res = await axios.get(
        "/api/venezuela/municipios?estadoId=" + estadoSelected
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
      if (municipioSelected === 0 || !municipioSelected) {
        setParroquias([]);
        return;
      }
      const res = await axios.get(
        "/api/venezuela/parroquias?municipioId=" + municipioSelected
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
      const res = await axios.get("/api/estudiante/perfil/institutions");
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
      const res = await axios.get("/api/estudiante/perfil/career");
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
    getEstados();
    getInsttt();
    getCareer();
    if (session?.user.dataProfile) {
      getMunicipios();
      setValue("estadoId", session.user.dataProfile.estadoId);
      setEstadoSelected(session.user.dataProfile.estadoId);
      setValue("municipioId", session.user.dataProfile.municipioId);
      setMunicipioSelected(session.user.dataProfile.municipioId);
      setValue("parroquiaId", session.user.dataProfile.parroquiaId);
      setParroquiaSelected(session.user.dataProfile.parroquiaId);
      setValue("institutionId", session.user.dataProfile.institution.id);
      setValue("careerId", session.user.dataProfile.career.id);
      setValue("dateStart", session.user.dataProfile.dateStart);
      setValue("dateEnd", session.user.dataProfile.dateEnd);
      setValue("birthdate", session.user.dataProfile.birthdate);
      setValue("gender", session.user.dataProfile.gender);
    }
  }, []);

  useEffect(() => {
    getMunicipios();
    setValue("estadoId", estadoSelected);
  }, [estadoSelected]);

  useEffect(() => {
    getParroquias();
    setValue("municipioId", municipioSelected);
  }, [municipioSelected]);

  useEffect(() => {
    if (watch("dateStart") || watch("dateEnd")) {
      trigger(["dateStart", "dateEnd"]);
    }
  }, [watch("dateStart"), watch("dateEnd"), trigger]);

  return (
    <>
      <div className="flex flex-col my-2 md:space-x-4">
        <h2 className="text-2xl font-bold text-gray-800 text-center md:text-3xl">
          {titleForm}
        </h2>
      </div>
      <div className="flex flex-col m-2 my-2 p-2 rounded-lg shadow-lg">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-8 form-student-info"
        >
          {/* //!Nombres */}
          <LabelInputContainer className="mb-8">
            <Label htmlFor="names">Nombres del estudiante *</Label>
            <Input
              {...register("names")}
              defaultValue={session?.user.dataProfile?.names || ""}
              onChange={handleInputChange}
              id="names"
              name="names"
              placeholder="José Manuel"
              type="text"
              className={cn(errors.names && "bg-red-100 focus:bg-red-100")}
            />
            {errors.names && (
              <p className="text-red-500 text-sm">{errors.names.message}</p>
            )}
          </LabelInputContainer>

          {/* //!Apellidos */}
          <LabelInputContainer className="mb-8">
            <Label htmlFor="lastnames">Apellidos del estudiante *</Label>
            <Input
              {...register("lastnames")}
              defaultValue={session?.user.dataProfile?.lastnames || ""}
              onChange={handleInputChange}
              id="lastnames"
              name="lastnames"
              placeholder="Di´martino Han-gun"
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

          {/* //!Fecha nacimiento */}
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

          {/* //!Teléfono */}
          <LabelInputContainer className="mb-8">
            <Label htmlFor="phone">Teléfono del estudiante *</Label>
            <Input
              {...register("phone")}
              defaultValue={session?.user.dataProfile?.phone || ""}
              onChange={handleInputChange}
              id="phone"
              name="phone"
              placeholder="04246558941"
              type="text"
              className={cn(errors.phone && "bg-red-100 focus:bg-red-100")}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm">{errors.phone.message}</p>
            )}
          </LabelInputContainer>

          {/* //!estado */}
          <LabelInputContainer className="mb-8">
            <Label htmlFor="estado">Estado del estudiante</Label>
            <div className="relative">
              <Input
                id="estado"
                type="text"
                value={
                  estados.find((e) => e.id === estadoSelected)?.estado || ""
                }
                onClick={() => setEstadoOpen(!estadoOpen)}
                readOnly
                className="bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                placeholder="Selecciona una institución"
              />
              {estadoOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                  {estados.map((e, index) => (
                    <div
                      key={index}
                      onClick={() => {
                        if (e.id !== estadoSelected) {
                          setEstadoSelected(e.id);
                          setMunicipioSelected(0);
                          setParroquiaSelected(0);
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

          {/* //! municipio */}
          <LabelInputContainer className="mb-8">
            <Label htmlFor="municipio">Municipio del estudiante</Label>
            <div className="relative">
              <Input
                id="municipioId"
                type="text"
                value={
                  municipios.find((e) => e.id === municipioSelected)
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
                        if (e.id !== municipioSelected) {
                          setMunicipioSelected(e.id);
                          setParroquiaSelected(0);
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

          {/*//! Parroquia */}
          <LabelInputContainer className="mb-8">
            <Label htmlFor="parroquia">Parroquia del estudiante</Label>
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
                        setParroquiaSelected(e.id);
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

          {/*//! Direccion mas precisa*/}
          <LabelInputContainer className="mb-8">
            <Label htmlFor="address">Dirección del estudiante *</Label>
            <Input
              {...register("address")}
              defaultValue={session?.user.dataProfile?.address || ""}
              onChange={handleInputChange}
              id="address"
              name="address"
              placeholder="Haticos, Av. 25B con Calle 100, casa No 23-87, cerca de Upaca C.A"
              type="text"
              className={cn(errors.address && "bg-red-100 focus:bg-red-100")}
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
            <span>
              Indique Sector, Av., Calle, No. de habitación y punto de
              referencia.
            </span>
          </LabelInputContainer>

          {/* //!institutions Edu */}
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

          {/* //!Especialización o carrera del estudiante */}
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
            <LabelInputContainer className="flex m-2 md:w-[40%]">
              <Label htmlFor="dateStart">Fecha de inicio del proceso *</Label>
              <Input
                {...register("dateStart")}
                defaultValue={new Date(watch("dateStart")).toLocaleDateString()}
                id="dateStart"
                type="date"
                className={cn(
                  errors.dateStart && "bg-red-100 focus:bg-red-100"
                )}
              />
              {errors.dateStart && (
                <p className="text-red-500 text-sm">
                  {errors.dateStart.message}
                </p>
              )}
              <span className="text-gray-500 text-xs">
                La fecha debe tener el formato dd/mm/yyyy.
              </span>
            </LabelInputContainer>

            <LabelInputContainer className="flex m-2 mr-20 md:w-[40%]">
              <Label htmlFor="dateEnd">
                Fecha de terminación del proceso *
              </Label>
              <Input
                {...register("dateEnd")}
                defaultValue={new Date(watch("dateEnd")).toLocaleDateString()}
                id="dateEnd"
                type="date"
                className={cn(errors.dateEnd && "bg-red-100 focus:bg-red-100")}
              />
              {errors.dateEnd && (
                <p className="text-red-500 text-sm">{errors.dateEnd.message}</p>
              )}
              <span className="text-gray-500 text-xs">
                La fecha debe tener el formato dd/mm/yyyy, y ser posterior a la
                fecha de inicio.
              </span>
            </LabelInputContainer>
          </div>

          {/* //!Descripcion */}
          <LabelInputContainer className="mb-8">
            <Label htmlFor="description">
              Breve descripción del estudiante.
            </Label>
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

          {/* //!Intereses */}
          <LabelInputContainer className="mb-8">
            <Label htmlFor="interests">Intereses del estudiante</Label>
            <Input
              {...register("interests")}
              type="textarea"
              defaultValue={session?.user.dataProfile?.interests || ""}
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
              defaultValue={session?.user.dataProfile?.bankName || ""}
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
              defaultValue={session?.user.dataProfile?.bankAccount || ""}
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
              defaultChecked={session?.user.dataProfile?.cneRegister || false}
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
              defaultValue={session?.user.dataProfile?.cneCentroName || ""}
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
              defaultValue={session?.user.dataProfile?.cneParroquia || ""}
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

          {/* //!Habilidades */}
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
              className="w-[100%] bg-black hover:bg-gray-800 text-white font-bold py-1 px-3 mt-4 rounded focus:shadow-outline md:w-[80%]"
            >
              GUARDAR DATOS
            </button>
          </div>
        </form>

        {loading && ( // Muestra el loader si está cargando
          <div className="flex justify-center items-center flex-col">
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
