import React from 'react';

interface Record {
  codigoinstitucion: string;
  nombreinstituto: string;
  parroquiainstituto: string;
}

interface TableInstitucionesProps {
  records: Record[];
  setRecords: React.Dispatch<React.SetStateAction<Record[]>>;
}

const TableInstituciones: React.FC<TableInstitucionesProps> = ({ records, setRecords }) => {
  
  const handleDelete = (index: number) => {
    const newRecords = records.filter((_, i) => i !== index);
    setRecords(newRecords);
  };

  const handleUpdate = (index: number) => {
    // Aquí puedes implementar la lógica para actualizar el registro
    // Por ejemplo, podrías abrir un formulario con los datos del registro seleccionado
    const recordToUpdate = records[index];
    // Puedes usar un estado en el componente padre para manejar el formulario
    console.log("Actualizar registro:", recordToUpdate);
  };

  return (
    <table className="min-w-full border-collapse border border-gray-300">
      <thead>
        <tr>
          <th className="border border-gray-300 p-2">Código de la Institución</th>
          <th className="border border-gray-300 p-2">Nombre de la Institución</th>
          <th className="border border-gray-300 p-2">Parroquia de la Institución</th>
          <th className="border border-gray-300 p-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {records.map((record, index) => (
          <tr key={index}>
            <td className="border border-gray-300 p-2">{record.codigoinstitucion}</td>
            <td className="border border-gray-300 p-2">{record.nombreinstituto}</td>
            <td className="border border-gray-300 p-2">{record.parroquiainstituto}</td>
            <td className="border border-gray-300 p-2">
              <button onClick={() => handleUpdate(index)} className="text-blue-500 hover:underline">Actualizar</button>
              <button onClick={() => handleDelete(index)} className="text-red-500 hover:underline">Eliminar</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TableInstituciones;





