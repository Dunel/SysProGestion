// // components/AlcaldiaProfile.js

// import Link from 'next/link';

// export default function EstudianteProfile ({ profileData }) {
//   return (
//     <div className="m-4 my-4 p-4 bg-white rounded-lg shadow-lg mt-10">
      
//       <div className="flex flex-cols-[30%_70%] ">
        
//         {/* Foto del Estudiante */}
//         <div className="flex-shrink-0">
//           <img
//             className="h-60 w-60 rounded-full border-4 border-black-800"
//             src={profileData.fotoDelEstudiante}
//             alt="Foto del Estudiante"
//           />
//         </div>
//         {/* Información del Estudiante */}
//         <div className="ml-4">
//           <h2 className="text-3xl font-bold text-gray-800 pt-5 text-center md:text-5xl lg:text-4xl">{profileData.nombreEstudiante}</h2>
//           <h2 className="text-2xl font-bold text-gray-800 pt-5 pb-2 md:text-4xl lg:text-3xl"> <i>{profileData.carreraEstudiante}</i></h2>
//           <p className="text-gray-600 md:text-1x1"><strong>Cedula de identidad:</strong> {profileData.cedulaEstudiante}</p>
//           <p className="text-gray-600 md:text-1xl"><strong>Teléfono:</strong> {profileData.telefonoEstudiante}</p>
//           <p className="text-gray-600 md:text-1xl"><strong>Correo:</strong> {profileData.correoEstudiante}</p>
//           <p className="text-gray-600 md:text-1xl"><strong>Domicilio:</strong> {profileData.domicilioEstudiante}</p>
//         </div>
//       </div>



//       <div className="mt-6">
//       <h2 className="text-2xl font-bold text-gray-800 pt-5 pb-2 text-center md:text-4xl lg:text-3xl">Perfil profesional</h2>

//         <div className="mt-2"> 
//           <p className="text-gray-600"><strong>Universidad:</strong> {profileData.universidadEstudiante}</p>
//           <p className="text-gray-600"><strong>trimestre:</strong> {profileData.trimestreEstudiante}</p>
//           <p className="text-gray-6000"><strong>Habilidades:</strong> {profileData.habilidadesEstudiante}</p>
//           <p className="text-gray-6000"><strong>Intereses:</strong> {profileData.interesesEstudiante}</p>
//           <p className="text-gray-600"><strong>Descripción:</strong> {profileData.descripcionEstudiante}</p>
//           <p className="text-gray-6000"><Link  className="underline text-blue-500 hover:text-blue-700 cursor-pointer" href={'profileData.reseumenCurricularEstudiante'}> Reseumen Curricular </Link></p>
//       </div>
//         </div>
//       <br/>
      
//       <div className="flex justify-center">
//         <button
//             type="submit"
//             className="w-[50%] bg-black hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
//             >
//             Actualizar Datos
//           </button>
//       </div>
//     </div>
//   );
// };

