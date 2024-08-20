import { Oval } from 'react-loader-spinner'; 

export default function Loader () {

    return(
        <div className="flex justify-center items-center flex-col mt-10">
        <Oval color="#000000"
        secondaryColor="#FFFFFF" // Color de fondo blanco
        height={50} width={50}  strokeWidth={5} />
        <br/>
        <span>Espere por favor...</span>
        </div>
    )
}