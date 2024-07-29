type Step1Props = {
  setCode: Function;
  validateCode: Function;
};

export default function Step1({ setCode, validateCode }: Step1Props) {
  return (
    <>
      <label className="block mb-2 text-sm font-medium text-gray-900">
        Code
      </label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
        onChange={(e) => setCode(e.target.value)}
      />
      <button
        className="bg-gray-800 text-white text-sm font-medium rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mt-4"
        onClick={() => validateCode()}
      >
        Enviar
      </button>
    </>
  );
}
