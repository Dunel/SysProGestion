import { useState, useEffect } from "react";

type Step2Props = {
  setData: Function;
  sendData: Function;
};

export default function Step2({ setData, sendData }: Step2Props) {
  const [cedula, setCedula] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [shouldSendData, setShouldSendData] = useState(false);

  useEffect(() => {
    if (shouldSendData) {
      sendData();
      setShouldSendData(false);
    }
  }, [shouldSendData, sendData]);

  const sendForm = () => {
    setData({
      cedula,
      nombre,
      apellido,
      telefono,
      password,
    });
    setShouldSendData(true);
  };

  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        Cedula
      </label>
      <input
        name="cedula"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        onChange={(e) => setCedula(e.target.value)}
      />
      <label className="block mb-2 text-sm font-medium text-gray-900">
        Nombre
      </label>
      <input
        name="nombre"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        onChange={(e) => setNombre(e.target.value)}
      />
      <label className="block mb-2 text-sm font-medium text-gray-900">
        Apellido
      </label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        onChange={(e) => setApellido(e.target.value)}
      />
      <label className="block mb-2 text-sm font-medium text-gray-900">
        Número de teléfono
      </label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        onChange={(e) => setTelefono(e.target.value)}
      />
      <label className="block mb-2 text-sm font-medium text-gray-900">
        Contraseña
      </label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        type="password"
        onChange={(e) => setPassword(e.target.value)}
      />
      <label className="block mb-2 text-sm font-medium text-gray-900">
        Confirmar contraseña
      </label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        type="password"
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button
        className="bg-gray-800 text-white text-sm font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-4"
        onClick={() => sendForm()}
      >
        Enviar
      </button>
    </>
  );
}
