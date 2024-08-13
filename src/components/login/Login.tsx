import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import { Oval } from 'react-loader-spinner'; // Importa el loader


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();
  const [loading, setLoading] = useState(false); // Estado para el loader


  const handleSubmit = async () => {
    setErrors([]);
    setLoading(true); // Muestra el loader
    const login = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (login?.error) {
      setLoading(false); // Oculta el loader
      setErrors(login.error.split(","));
      return;
    }
    router.push("/checking");
    setLoading(false); // Oculta el loader
  };

  return (
    <div className="w-full flex items-center justify-center flex-col mt-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full md:w-1/3 h-auto m-4">
        <div className="mb-4">
          <label
            htmlFor="username"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Correo
          </label>
          <input
            type="text"
            id="username"
            name="username"
            onChange={(e) => setEmail(e.target.value)}
            className="relative z-50 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            className="relative z-50 w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="relative z-50 w-full bg-gray-950 text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleSubmit}
        >
          Iniciar sesión
        </button>
        <br />
        <br />

        <label className="block text-sm font-medium text-gray-700 mb-1">
          ¿No tienes una cuenta?
        </label>
        <button className="relative z-50 w-full bg-gray-950 text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <Link href="/register">Regístrate</Link>
        </button>

        {errors.length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mt-4">
            <ul className="mb-0">
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
      {
              loading  && // Muestra el loader si está cargando
                <div className="flex justify-center items-center flex-col mt-10">
                  <Oval color="#000000"
                  secondaryColor="#FFFFFF" // Color de fondo blanco
                  height={50} width={50}  strokeWidth={5} />
                  <br/>
                  <span>Espere por favor...</span>
                </div>
            
            }
    </div>
  );
}