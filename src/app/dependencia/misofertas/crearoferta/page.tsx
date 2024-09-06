"use client";
import ContainerWeb from "@/components/ContainerWeb";
import GridContainer from "@/components/GridContainer";
import GridMain from "@/components/GridMain";
import Header from "@/components/Header";
import { useState } from "react";
import axios from "axios";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ApplyFormCreate,
  applyCreateSchema,
} from "@/validations/application.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

export default function Page() {
  const [selectedType, setSelectedType] = useState<string | undefined>();
  const [selectedStatus, setSelectedStatus] = useState<string | undefined>();
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ApplyFormCreate>({
    resolver: zodResolver(applyCreateSchema),
    mode: "onChange",
  });

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

  const onSubmit = (data: ApplyFormCreate) => {
    const formData = {
      ...data,
      skills: selectedSkills,
    };
    const validate = applyCreateSchema.safeParse(formData);
    if (!validate.success) {
      console.error(validate.error);
      return;
    }
    createOfert(formData as ApplyFormCreate);
  };

  const createOfert = async (data: ApplyFormCreate) => {
    try {
      const res = await axios.post("/api/dependencia/apply/myapply", {
        ...data,
      });
      router.push("./")
      console.log("data: ", res.data);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("error lanzado:", error.response?.data);
      } else {
        console.error("error:", error);
      }
    }
  };
  

  return (
    <>
      <Header title={"CREAR OFERTA"} subtitle={""} />
      <ContainerWeb>
        <GridMain>
          <GridContainer>
            <>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="form-student-info"
              >
                <div className="mt-2">
                  <Label>Titulo descriptivo de la oferta de vacante</Label>
                  <Input
                    {...register("title")}
                    id="title"
                    name="title"
                    type="text"
                    placeholder="Creación de un sistema informatico para consulta y lectura virtual de archivos"
                  />
                  {errors.title && (
                    <p className="text-red-500 text-sm">
                      {errors.title.message}
                    </p>
                  )}
                </div>
                <div className="mt-2">
                  <Label>Descripción de la oferta:</Label>
                  <Input
                    {...register("description")}
                    id="description"
                    name="description"
                    type="text"
                    placeholder="Se requiere de un estudiante de Ing en Informatica para la creación de...  "
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">
                      {errors.description.message}
                    </p>
                  )}
                </div>
                <div className="mt-2">
                  <Label>Ubicación de la institución a realizar la pasantia o Servicio Comunitario</Label>
                  <Input
                    {...register("location")}
                    id="location"
                    name="location"
                    type="text"
                    placeholder="Municipio Maracaibo, Casco Central. calle Paseo Ciencia"
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
                      ofertsType.find((e) => e.key === selectedType)?.name || ""
                    }
                    onClick={() => setIsOpen(!isOpen)}
                    readOnly
                    className="bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                    placeholder="Haz clic y selecciona una opción"
                  />
                  {isOpen && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                      {ofertsType.map((e) => (
                        <div
                          key={e.key}
                          onClick={() => {
                            setSelectedType(e.key);
                            setValue("type", e.key as "pasantia" | "servicio");
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

                   {selectedType === 'pasantia' &&
                    <div>
                    <Label>Tipo de Incentivo</Label>
                    <div className="flex items-center">
                        <Input
                            type="radio"
                            value="true"
                            {...register("pay", { setValueAs: v => v === 'true' })}
                            className="mr-2"
                        />
                        <Label>Con Incentivo</Label>
            
                        <Input
                            type="radio"
                            value="false"
                            {...register("pay", { setValueAs: v => v === 'false' })}
                            className="mr-2"
                        />
                        <Label>Sin Insentivo</Label>
                    </div>
                </div>
                  } 

                  

                <div className="mt-2">
                  <Label>Habilidades deseadas en el estudiente</Label>
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
                      ofertsStatus.find((e) => e.key === selectedStatus)
                        ?.name || ""
                    }
                    onClick={() => setIsOpen2(!isOpen2)}
                    readOnly
                    className="bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                    placeholder="Haz clic y selecciona una opción"
                  />
                  {isOpen2 && (
                    <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                      {ofertsStatus.map((e) => (
                        <div
                          key={e.key}
                          onClick={() => {
                            setSelectedStatus(e.key);
                            setValue("status", e.key as "active" | "inactive");
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
                    REGISTRAR OFERTA
                  </button>
                </div>
              </form>
            </>
          </GridContainer>
        </GridMain>
      </ContainerWeb>
    </>
  );
}
