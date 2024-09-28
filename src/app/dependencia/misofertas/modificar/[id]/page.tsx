"use client";
import ContainerWeb from "@/components/ContainerWeb";
import GridContainer from "@/components/GridContainer";
import GridMain from "@/components/GridMain";
import Header from "@/components/Header";
import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ApplyFormUpdate,
  applyUpdateFormSchema,
} from "@/validations/application.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

type Application = {
  id: number;
  title: string;
  description: string;
  location: string;
  type: "pasantia" | "servicio" | "proyecto";
  date: Date;
  skills: string[];
  status: string;
  pay: boolean;
  tutor: string;
  dependencia: {
    name: string;
    User: {
      image: string;
    };
  };
};

export default function Page({ params }: { params: { id: string } }) {
  const [applications, setApplications] = useState<Application>();
  const [squeleton, setSqueleton] = useState(true);
  const [selectedType, setSelectedType] = useState<string | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ApplyFormUpdate>({
    resolver: zodResolver(applyUpdateFormSchema),
    mode: "onChange",
  });

  const getApplications = async () => {
    try {
      setSqueleton(true);
      const res = await axios.get(
        "/api/dependencia/apply/myapply/edit?id=" + params.id
      );
      setApplications(res.data);
      setSelectedType(res.data.type);
      setValue("type", res.data.type);
      setValue("skills", res.data.skills);
      setValue("status", res.data.status);
      setSelectedSkills(res.data.skills);
      setSelectedStatus(res.data.status);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data);
      } else {
        console.error("error:", error);
      }
      router.push("/dependencia/misofertas");
    } finally {
      setSqueleton(false);
    }
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
    setSelectedSkills((prevSelectedSkills) => {
      const updatedSkills = checked
        ? [...prevSelectedSkills, value]
        : prevSelectedSkills.filter((skill) => skill !== value);
      setValue("skills", updatedSkills as any);
      return updatedSkills;
    });
  };

  const ofertsType = [
    { key: "pasantia", name: "Pasantía" },
    { key: "servicio", name: "Servicio Comunitario" },
  ];

  const ofertsStatus = [
    { key: "active", name: "Activa" },
    { key: "inactive", name: "Inactiva" },
  ];

  const onSubmit = (data: ApplyFormUpdate) => {
    const formData = {
      ...data,
      skills: selectedSkills,
      // pay: data.type === 'pasantia' ? data.pay : "undefined"
    };
    const validate = applyUpdateFormSchema.safeParse(formData);
    if (!validate.success) {
      console.error(validate.error);
      return;
    }
    updateOfert(formData as ApplyFormUpdate);
  };

  const updateOfert = async (data: ApplyFormUpdate) => {
    try {
      setLoading(true);
      const res = await axios.put("/api/dependencia/apply/myapply/edit", {
        ...data,
        id: params.id,
      });
      //console.log("data: ", res.data);
      router.push("/dependencia/misofertas");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data);
      } else {
        console.error("error:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <>
      <Header
        title={"MODIFICAR OFERTA"}
        subtitle={
          "Aqui podrás modificar las ofertas del Pasantías y Servicio Comunitario que hayas publicado."
        }
      />
      <ContainerWeb>
        <GridMain>
          <GridContainer>
            {squeleton ? (
              <Skeleton />
            ) : (
              <>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="form-student-info"
                >
                  <div className="mt-2">
                    <Label>Titulo descritivo de la oferta de vacante</Label>
                    <Input
                      {...register("title")}
                      id="title"
                      name="title"
                      type="text"
                      placeholder="Nombre de la oferta"
                      defaultValue={applications?.title || ""}
                    />
                    {errors.title && (
                      <p className="text-red-500 text-sm">
                        {errors.title.message}
                      </p>
                    )}
                  </div>
                  <div className="mt-2">
                    <Label>
                      Descripción del perfil del estudiante y de la oferta
                    </Label>
                    <Input
                      {...register("description")}
                      id="description"
                      name="description"
                      type="text"
                      placeholder="Descripcion de la oferta"
                      defaultValue={applications?.description || ""}
                    />
                    {errors.description && (
                      <p className="text-red-500 text-sm">
                        {errors.description.message}
                      </p>
                    )}
                  </div>
                  <div className="mt-2">
                    <Label>
                      Dirección del lugar de se realizará la Pasantia ó Servicio
                      Comunitario
                    </Label>
                    <Input
                      {...register("location")}
                      id="location"
                      name="location"
                      type="text"
                      placeholder="Ubicación de la oferta"
                      defaultValue={applications?.location || ""}
                    />
                    {errors.location && (
                      <p className="text-red-500 text-sm">
                        {errors.location.message}
                      </p>
                    )}
                  </div>
                  <div className="mt-2">
                    <Label>Tipo de Oferta</Label>
                    <Input
                      id="rol"
                      type="text"
                      value={
                        ofertsType.find((e) => e.key === selectedType)?.name
                      }
                      onClick={() => setIsOpen(!isOpen)}
                      readOnly
                      className="bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                      placeholder="Selecciona una opción"
                    />
                    {isOpen && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                        {ofertsType.map((e) => (
                          <div
                            key={e.key}
                            onClick={() => {
                              setSelectedType(e.key);
                              setValue(
                                "type",
                                e.key as "pasantia" | "servicio"
                              );
                              setIsOpen(false);
                            }}
                            className="cursor-pointer hover:bg-blue-100 py-2 px-3"
                          >
                            {e.name}
                          </div>
                        ))}
                      </div>
                    )}
                    {errors.type && (
                      <p className="text-red-500 text-sm">
                        {errors.type.message}
                      </p>
                    )}
                  </div>

                  {selectedType === "pasantia" && (
                    <div>
                      <Label>Tipo de Incentivo</Label>
                      <div className="flex items-center">
                        <Input
                          {...register("pay")}
                          id="pay"
                          name="pay"
                          type="radio"
                          value="true"
                          className="mr-2"
                        />
                        <Label>Con Incentivo</Label>

                        <Input
                          type="radio"
                          id="pay"
                          {...register("pay")}
                          value="false"
                          className="mr-2"
                        />
                        <Label>Sin Insentivo</Label>
                      </div>
                      {errors.pay && (
                        <p className="text-red-500 text-sm">
                          {errors.pay.message}
                        </p>
                      )}
                    </div>
                  )}
                  <div className="mt-2">
                    <Label>Tutor o responsable de la Oferta</Label>
                    <Input
                      {...register("tutor")}
                      id="tutor"
                      name="tutor"
                      type="text"
                      placeholder="Nombre del tutor o responsable"
                      defaultValue={applications?.tutor || ""}
                    />
                    {errors.tutor && (
                      <p className="text-red-500 text-sm">
                        {errors.tutor.message}
                      </p>
                    )}
                  </div>

                  <div className="mt-2">
                    <Label>Habilidades Necesarias</Label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
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
                    </div>
                    <div className="mt-4">
                      <h3 className="text-sm font-medium text-gray-700 m-2">
                        Habilidades seleccionadas:
                      </h3>
                      <ul className="mt-2 list-disc list-inside text-sm text-gray-500">
                        {selectedSkills.length > 0 ? (
                          selectedSkills.map((skill, index) => (
                            <li key={index}>
                              {
                                skillsOptions.find(
                                  (option) => option.value === skill
                                )?.label
                              }
                            </li>
                          ))
                        ) : (
                          <p style={{ color: "red" }}>
                            No has seleccionado ninguna habilidad.
                          </p>
                        )}
                      </ul>
                    </div>
                    {errors.skills && (
                      <p className="text-red-500 text-sm">
                        {errors.skills.message}
                      </p>
                    )}
                  </div>
                  <div className="mt-2">
                    <Label>Estado de la Oferta</Label>
                    <Input
                      id="rol"
                      type="text"
                      value={
                        ofertsStatus.find((e) => e.key === selectedStatus)?.name
                      }
                      onClick={() => setIsOpen2(!isOpen2)}
                      readOnly
                      className="bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                      placeholder="Selecciona una opción"
                    />
                    {isOpen2 && (
                      <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                        {ofertsStatus.map((e) => (
                          <div
                            key={e.key}
                            onClick={() => {
                              setSelectedStatus(e.key);
                              setValue(
                                "status",
                                e.key as "active" | "inactive"
                              );
                              setIsOpen2(false);
                            }}
                            className="cursor-pointer hover:bg-blue-100 py-2 px-3"
                          >
                            {e.name}
                          </div>
                        ))}
                      </div>
                    )}
                    {errors.status && (
                      <p className="text-red-500 text-sm">
                        {errors.status.message}
                      </p>
                    )}
                  </div>
                  <div className="mt-2 flex justify-center">
                    <button
                      type="submit"
                      className="w-[100%] bg-black hover:bg-gray-800 text-white text-sm font-bold py-2 px-2 mt-2 rounded focus:shadow-outline"
                    >
                      MODIFICAR
                    </button>
                  </div>
                </form>
                {loading && (
                  <div>
                    <Loader />
                  </div>
                )}
              </>
            )}
          </GridContainer>
        </GridMain>
      </ContainerWeb>
    </>
  );
}
