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



interface EstudianteFormProfileProps {
  onToggleForm: () => void;
  titleForm: string;
  data: { 
    address: string; 
    university: string; 
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
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [pdfFileName, setPdfFileName] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    names: "",
    lastnames: "",
    phone: "",
    address: "",
    university: "",
    quarter: "",
    description: "",
    interests: "",
  });

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
      console.log(res.data);
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
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
            <Label htmlFor="phone">Teléfono</Label>
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
            <Label htmlFor="address">Dirección</Label>
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
            <Label htmlFor="university">Universidad</Label>
            <Input
              {...register("university")}
              defaultValue={session?.user.dataProfile?.university || ""}
              onChange={handleInputChange}
              id="university"
              name="university"
              placeholder="Universidad"
              type="text"
              className={cn(errors.university && "bg-red-100 focus:bg-red-100")}
            />
            {errors.university && (
              <p className="text-red-500 text-sm">{errors.university.message}</p>
            )}
          </LabelInputContainer>

          

          <LabelInputContainer className="mb-4">
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



          <LabelInputContainer className="mb-4">
            <Label htmlFor="description">Breve descripción de ti</Label>
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



          <LabelInputContainer className="mb-4">
            <Label htmlFor="interests">Cuáles son tus intereses</Label>
            <Input
              {...register("interests")}
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


          

          <LabelInputContainer>
            <Label htmlFor="skills">Selecciona las habilidades que poseas</Label>
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

          <Label>Sube tu foto <mark> -Agr a la BBDD- </mark> </Label>
          <div className="w-[100%] m-2 dm:w-[50%] sm:w-[50%] ">
            <Input type="file" accept="image/*" onChange={handleImageChange} />
          </div>
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Vista previa"
              className="mx-auto my-4 w-[40%] h-auto md:w-[30%]"
            />
          )}


{/* 
          <Label>Sube tu currículum (Formato PDF) <mark> -Agr a la BBDD- </mark> </Label>
          <div className="w-[100%] m-2 dm:w-[50%] sm:w-[50%]">
            <Input
              type="file"
              accept="application/pdf"
              onChange={handlePdfChange}
            />
            {pdfFileName && (
              <p className="my-4 text-center">Archivo seleccionado: {pdfFileName}</p>
            )}
          </div> */}

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