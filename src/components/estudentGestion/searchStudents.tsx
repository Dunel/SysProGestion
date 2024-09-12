import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "../ui/input";

type CardSearch = {
  searchTerm: string;
  setSearchTerm: Function;
  searchUser: Function;
  setIsRegistering: Function;
  setUser: Function;
  user: Estudiante | undefined;
  handleSelectUser: () => void;
};

type Estudiante = {
  names: string;
  lastnames: string;
} | null;

export default function SearchStudents({
  searchTerm,
  setSearchTerm,
  searchUser,
  setIsRegistering,
  setUser,
  user,
  handleSelectUser,
}: CardSearch) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Buscar Estudiante</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-2 py-4">
          <Input
            placeholder="Buscar por Cédula o email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-10"
          />
          <button
            onClick={() => {
              setIsRegistering(false)
              searchUser(searchTerm)
            }}
            className="inline-flex items-center justify-center rounded-md px-6 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            BUSCAR
          </button>
        </div>

        <button
          onClick={() => {
            setIsRegistering(true);
            setUser(null);
          }}
          className="mb-4 inline-flex items-center justify-center rounded-md px-6 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Registrar Estudiante
        </button>

        <ul className="space-y-2">
          {user && (
            <li className="flex justify-between items-center p-2 bg-gray-100 rounded">
              <span>
                {searchTerm} {user.names} {user.lastnames}
              </span>
              <button
                className="inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium text-white bg-gray-900 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                onClick={() => handleSelectUser}
              >
                Editar
              </button>
            </li>
          )}
        </ul>
      </CardContent>
    </Card>
  );
}
