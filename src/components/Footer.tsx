export default function Footer() {
  return (
    <footer className="bg-gray-950 py-12 w-full mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center mt-2">
          {/* Puedes agregar contenido adicional aquí si es necesario */}
        </div>
        <p className="text-white text-center mt-4">
          © {new Date().getFullYear()} SysProGestion
        </p>
      </div>
    </footer>
  );
}
