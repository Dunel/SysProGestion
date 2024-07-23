export default function Footer() {
    return (
      <footer className="bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mt-2">
          </div>
          <p className="text-white text-center mt-4">
            © {new Date().getFullYear()} Dunel{" "}
          </p>
        </div>
      </footer>
    );
  }