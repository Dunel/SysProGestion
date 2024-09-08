import Link from "next/link";
import { footerContent } from "@/service/footer";

export default function Footer() {
  return (
    <footer className="bg-gray-950 py-12 mt-10 w-full h-[20%]">
      <div className="container mx-auto px-4">
        <p className="text-white text-center mt-4">
          © {footerContent.year}{" "}
          <Link href={footerContent.link}>SysProGestion</Link>
        </p>
        {footerContent.names.map((name, index) => (
          <p className="text-white text-center mt-1" key={index}>
            {name}
          </p>
        ))}
      </div>
    </footer>
  );
}
