import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const router = useRouter();

  const handleSubmit = async () => {
    setErrors([]);

    const login = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (login?.error) {
      setErrors(login.error.split(","));
      return;
    }

    router.push("/dashboard");
  };
  return (
    <div className="flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gray-950 text-white py-2 px-4 rounded-lg hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={handleSubmit}
        >
          Login
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
    </div>
  );
}
