"use client";
import axios from "axios";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/components/lib/utils";
import { Oval } from "react-loader-spinner";
import { profileSchema, ProfileFormData, profileFrontSchema, ProfileFrontFormData } from "@/validations/profile.schema";
import { useForm } from "react-hook-form";
import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";


const universitys = [
  'Universidad Del Zulia', 'Universidad Jose Gregorio Hernandez', 
  'universidad Dr. Bellozo Chacing', 'U.E Fe y Alegria'
]

const careers = [
  'Ingeniería en Informática', 'Ingeniería en Sistemas', 'Licenciatura en Administración',
  'Licenciatura en Economía', 'Licenciatura en Contaduría', 'Licenciatura en Derecho',
  'Licenciatura en Matemáticas', 'Licenciatura en Química', 'Licenciatura en Biología',
]

interface EstudianteFormProfileProps {
  onToggleForm: () => void;
  titleForm: string;
  data: { 
    address: string; 
    university: string;
    career: string; 
    quarter: string; 
    skills: string[]; 
    interests: string; 
    description: string; 
    names: string; 
    lastnames: string; 
    phone: string; 
  } | null;
}

export default function EstudianteProfileForm({
  onToggleForm,
  titleForm,
  data,
}: EstudianteFormProfileProps){
  const { data: session, update } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    names: "",
    lastnames: "",
    phone: "",
    address: "",
    university: "",
    career: "",
    quarter: "",
    description: "",
    interests: "",
  });

  const [isUniversityOpen, setUniversityOpen] = useState(false);
  const [isCareerOpen, setCareerOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<ProfileFrontFormData>({
    resolver: zodResolver(profileFrontSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if(session && session.user.dataProfile?.skills.length > 0){
      setSelectedSkills(session?.user.dataProfile.skills);
    }
  }, [session?.user.dataProfile?.skills]);


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
    setValue(name as keyof ProfileFrontFormData, value);
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

  const handleSelectChange = (field: "university" | "career", value: string) => {
    setFormData(prevData => ({
      ...prevData,
      [field]: value,
    }));
    setValue(field as keyof ProfileFrontFormData, value);
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setSelectedSkills((prevSelectedSkills) =>
      checked
        ? [...prevSelectedSkills, value]
        : prevSelectedSkills.filter((skill) => skill !== value)
    );
  };

  const profileUpdate = async (data: ProfileFormData) => {
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
      onToggleForm();
    }
  };

  const onSubmit = (data: ProfileFrontFormData) => {
    const formData = {
      ...data,
      skills: selectedSkills,
    };
    const validate = profileSchema.safeParse(formData);
    if (!validate.success) {
      console.error(validate.error);
      return;
    }
    profileUpdate(formData as ProfileFormData);
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
            <Label htmlFor="names">Nombres del estudiante *</Label>
            <Input
              {...register("names")}
              defaultValue={session?.user.dataProfile?.names || ""}
              onChange={handleInputChange}
              id="names"
              name="names"
              placeholder='José Manuel'
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


          <h2><mark>SECTORIZACION POR PARROKIA </mark></h2>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="address">Dirección del estudiante *</Label>
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

    


          <h2><mark>PREPARAR BDD</mark></h2>
        <LabelInputContainer className="mb-8">
            <Label htmlFor="university">Institución Educativa del estudiante *</Label>
            <div className="relative">
              <Input
                id="university"
                type="text"
                value={formData.university}
                onClick={() => setUniversityOpen(!isUniversityOpen)}
                readOnly
                className="bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                placeholder="Selecciona una institución"
              />
              {isUniversityOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                  {universitys.map((university) => (
                    <div
                      key={university}
                      onClick={() => {
                        handleSelectChange("university", university);
                        setUniversityOpen(false);
                      }}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {university}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.university && (
              <p className="text-red-500 text-sm">{errors.university.message}</p>
            )}
          </LabelInputContainer>


          <h2><mark>PREPARAR BDD</mark></h2>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="career">Especialización o carrera del estudiante *</Label>
            <div className="relative">
              <Input
                id="career"
                type="text"
                value={formData.career}
                onClick={() => setCareerOpen(!isCareerOpen)}
                readOnly
                className="bg-white border border-gray-300 rounded-md py-2 px-3 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
                placeholder="Selecciona una carrera"
              />
              {isCareerOpen && (
                <div className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                  {careers.map((career) => (
                    <div
                      key={career}
                      onClick={() => {
                        handleSelectChange("career", career);
                        setCareerOpen(false);
                      }}
                      className="p-2 hover:bg-gray-100 cursor-pointer"
                    >
                      {career}
                    </div>
                  ))}
                </div>
              )}
            </div>
            {errors.career && (
              <p className="text-red-500 text-sm">{errors.career.message}</p>
            )}
          </LabelInputContainer>

        

          <h2><mark>PREPARAR BDD</mark></h2>
          <div className="flex flex-col gap-[5%] mb-8 justify-start md:flex-row">
              <LabelInputContainer className=" flex m-2 md:w-[40%]">
              <Label htmlFor="datestart">Fecha de inicio del proceso *</Label>
              <Input
                 {...register("datestart")}
                id="datestart"
                type="date" // Mantener tipo "date"
                className={cn(errors.datestart && "bg-red-100 focus:bg-red-100")}
              />
               {errors.datestart ? ( 
                <>
                  <p className="text-red-500 text-sm">
                     {errors.datestart.message?.toString()}
                  </p>
                  <span className="text-gray-500 text-xs">
                    La fecha debe tener el formato dd/mm/yyyy.
                  </span>
                </>
              ) : (
                <span className="text-gray-500 text-xs">
                  La fecha debe tener el formato dd/mm/yyyy.
                </span>
              )
            }
            </LabelInputContainer>

            <LabelInputContainer className=" flex m-2 mr-20 md:w-[40%]">
              <Label htmlFor="datefinish">Fecha de terminacion del proceso *</Label>
              <Input
                {...register("datefinish")}
                id="datefinish"
                type="date" // Mantener tipo "date"
                className={cn(errors.datefinish && "bg-red-100 focus:bg-red-100")}
              />
              {errors.datefinish 
                ? (
                  <>
                    <p className="text-red-500 text-sm">
                      {errors.datefinish.message?.toString()} 
                    </p>
                    <span className="text-gray-500 text-xs">
                      La fecha debe tener el formato dd/mm/yyyy.
                    </span>
                  </>
                ) : (
                  <span className="text-gray-500 text-xs">
                    La fecha debe tener el formato dd/mm/yyyy.
                  </span>
                )
              }
            </LabelInputContainer>
      </div>


          <h2><mark>ELIMINAR DE LA BBDD</mark></h2>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="quarter">Trimestre</Label>
            <Input
              {...register("quarter")}
              defaultValue={session?.user.dataProfile?.quarter || ""}
              onChange={handleInputChange}
              id="quarter"
              name="quarter"
              placeholder="Trimestre"
              type="text"
              className={cn(errors.quarter && "bg-red-100 focus:bg-red-100")}
            />
            {errors.quarter && (
              <p className="text-red-500 text-sm">{errors.quarter.message}</p>
            )}
          </LabelInputContainer>


          <h2><mark> QUE SEA NO REQUERIDO EN LA BBDD </mark></h2>
          <LabelInputContainer className="mb-8">
            <Label htmlFor="description">Breve descripción del estudiante.</Label>
            <Input
              {...register("description")}
              type="textarea"
              defaultValue={session?.user.dataProfile?.description || ""}
              onChange={handleInputChange}
              id="description"
              name="description"
              placeholder="Soy una persona responsable, hablo inglés fluido y me apasiona la naturaleza..."
              className={`w-full h-[12vh] overflow-hidden text-ellipsis white-space-nowrap ${cn(errors.description && "bg-red-100 focus:bg-red-100")}`}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">{errors.description.message}</p>
            )}
          </LabelInputContainer>


          <h2><mark> QUE SEA NO REQUERIDO EN LA BBDD </mark></h2>
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
              className={`w-full h-[12vh] overflow-hidden text-ellipsis white-space-nowrap ${cn(errors.interests && "bg-red-100 focus:bg-red-100")}`}
            />
            {errors.interests && (
              <p className="text-red-500 text-sm">{errors.interests.message}</p>
            )}
          </LabelInputContainer>


          
          <h2><mark> QUE SEA NO REQUERIDO EN LA BBDD </mark></h2>
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
                <label htmlFor={value} className="ml-2 block text-sm text-gray-700">
                  {label}
                </label>
              </div>
            ))}
            <div className="mt-4">
              <h3 className="text-sm font-medium text-gray-700 m-2">Habilidades seleccionadas:</h3>
              <ul className="mt-2 list-disc list-inside text-sm text-gray-500">
                {selectedSkills.length > 0 ? (
                  selectedSkills.map((skill, index) => (
                    <li key={index}>
                      {skillsOptions.find((option) => option.value === skill)?.label}
                    </li>
                  ))
                ) : (
                  <p style={{ color: "red" }}>No has seleccionado ninguna habilidad.</p>
                )}
              </ul>
            </div>
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