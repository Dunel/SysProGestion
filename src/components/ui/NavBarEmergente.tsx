// "use client"
// import React, { useState, useEffect } from 'react';
// import { FaTimes, FaHome, FaAddressCard, FaClipboardList, FaClipboardCheck, FaMailBulk, FaExpeditedssl } from 'react-icons/fa';
// import Link from 'next/link';
// import { useNavBar } from '@/context/NavBarContext';
// import { signOut, useSession } from "next-auth/react";


// const NavBarEmergente: React.FC = () => {
//   const [isHovered, setIsHovered] = useState(false);
//   const { isOpen, toggleNavBar } = useNavBar();

//   useEffect(() => {
//     const handleEscape = (event: KeyboardEvent) => {
//       if (event.key === 'Escape') {
//         toggleNavBar();
//       }
//     };

//     document.addEventListener('keydown', handleEscape);
//     return () => {
//       document.removeEventListener('keydown', handleEscape);
//     };
//   }, [toggleNavBar]);

//   if (!isOpen) return null;

//   return (
//     <div
//       className={`fixed top-[8vh] left-0 h-full opacidad text-white transition-all duration-300 ease-in-out z-50 ${
//         isHovered ? 'w-64' : 'w-16'
//       } overflow-hidden`}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       <button
//         onClick={toggleNavBar}
//         className="absolute top-4 left-4 text-white hover:text-red-300"
//       >
//         <FaTimes size={24}/>
//       </button>
//       <nav className="pt-16">
//         <ul className="space-y-4">
//           <NavItem icon={<FaHome size={20} />} text="Principal" href="/estudiante" isHovered={isHovered} />
//           <NavItem icon={<FaAddressCard size={20} />} text="Perfil" href="/estudiante/perfil" isHovered={isHovered} />
//           <NavItem icon={<FaClipboardList size={20} />} text="Ofertas de Vacante" href="/estudiante/ofertas" isHovered={isHovered} />
//           <NavItem icon={<FaClipboardCheck size={20} />} text="Mis Aplicaciones" href="/estudiante/misaplicaciones" isHovered={isHovered} />
//           <NavItem icon={<FaMailBulk  size={20} />} text="Notificaciones" href="/estudiante/notificaciones" isHovered={isHovered} />
//           <button 
//             className='hover:opacity-100 hover:w-[100%]'
//             onClick={() => signOut()}
//           >
//           <NavItem icon={<FaExpeditedssl size={20} />} text="cerrar sesión"  href="/" isHovered={isHovered} />
//           </button>
          
         
//         </ul>
//       </nav>
//     </div>
//   );
// };

// interface NavItemProps {
//   icon: React.ReactNode;
//   text: string;
//   href: string;
//   isHovered: boolean;
// }

// const NavItem: React.FC<NavItemProps> = ({ icon, text, href, isHovered }) => (
//   <li>
//     <Link href={href} className="flex items-center p-4 opacidadHover">
//       <span className="mr-4">{icon}</span>
//       <span className={`transition-all duration-300 ${isHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0'} overflow-hidden whitespace-nowrap`}>
//         {text}
//       </span>
//     </Link>
//   </li>
// );

// export default NavBarEmergente;



"use client";
import React, { useState, useEffect } from 'react';
import { FaTimes, FaHome, FaAddressCard, FaClipboardList, FaClipboardCheck, FaMailBulk, FaExpeditedssl, FaBuilding, FaUsers, FaUniversity } from 'react-icons/fa';
import Link from 'next/link';
import { useNavBar } from '@/context/NavBarContext';
import { signOut, useSession } from "next-auth/react";

const NavBarEmergente: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { isOpen, toggleNavBar } = useNavBar();
  const { data: session, status } = useSession();
  const [navigation, setNavigation] = useState<NavItemProps[]>([]);

  const getLinks = () => {
    if (status !== "authenticated") return;

    if (session?.user.role === "estudiante") {
      setNavigation([
        { icon: <FaHome size={20} />, text: "Principal", href: "/estudiante", isHovered },
        { icon: <FaAddressCard size={20} />, text: "Perfil", href: "/estudiante/perfil", isHovered },
        { icon: <FaClipboardList size={20} />, text: "Ofertas de Vacante", href: "/estudiante/ofertas", isHovered },
        { icon: <FaClipboardCheck size={20} />, text: "Mis Aplicaciones", href: "/estudiante/misaplicaciones", isHovered },
        { icon: <FaMailBulk size={20} />, text: "Notificaciones", href: "/estudiante/notificaciones", isHovered },
      ]);
    } else if (session?.user.role === "alcaldia") {
      setNavigation([
        { icon: <FaHome size={20} />, text: "Principal", href: "/alcaldia", isHovered },
        { icon: <FaAddressCard size={20} />, text: "Perfil", href: "/alcaldia/perfil", isHovered },
        { icon: <FaClipboardList size={20} />, text: "Ofertas", href: "/alcaldia/ofertas", isHovered },
        { icon: <FaMailBulk size={20} />, text: "Notificaciones", href: "/alcaldia/notificaciones", isHovered },
        { icon: <FaUsers size={20} />, text: "Estudiantes", href: "/alcaldia/estudiantes", isHovered },
        { icon: <FaBuilding size={20} />, text: "Instituciones", href: "/alcaldia/instituciones", isHovered },
        { icon: <FaUniversity size={20} />, text: "Preregistros", href: "/alcaldia/preregister", isHovered },
      ]);
    } else if (session?.user.role === "dependencia") {
      setNavigation([
        { icon: <FaHome size={20} />, text: "Principal", href: "/dependencia", isHovered },
        { icon: <FaAddressCard size={20} />, text: "Perfil", href: "/dependencia/perfil", isHovered },
        { icon: <FaClipboardList size={20} />, text: "Mis Ofertas", href: "/dependencia/misofertas", isHovered },
        { icon: <FaClipboardCheck size={20} />, text: "Crear Oferta", href: "/dependencia/misofertas/crearoferta", isHovered },
        { icon: <FaMailBulk size={20} />, text: "Notificaciones", href: "/dependencia/notificaciones", isHovered },
      ]);
    }
  };

  useEffect(() => {
    getLinks();
  }, [status]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        toggleNavBar();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [toggleNavBar]);

  if (!isOpen) return null;

  return (
    <div
      className={`fixed top-[8vh] left-0 h-full opacidad text-white transition-all duration-300 ease-in-out z-50 ${
        isHovered ? 'w-64' : 'w-16'
      } overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={toggleNavBar}
        className="absolute top-4 left-4 text-white hover:text-red-300"
      >
        <FaTimes size={24}/>
      </button>
      <nav className="pt-16">
        <ul className="space-y-4">
          {navigation.map((item) => (
            <NavItem 
              key={item.text}
              icon={item.icon} 
              text={item.text} 
              href={item.href} 
              isHovered={isHovered} 
            />
          ))}
          {session && (
            <button 
              className="hover:opacity-100 hover:w-[100%]" 
              onClick={() => signOut()}
            >
              <NavItem 
                icon={<FaExpeditedssl size={20} />} 
                text="Cerrar sesión" 
                href="/" 
                isHovered={isHovered} 
              />
            </button>
          )}
        </ul>
      </nav>
    </div>
  );
};

interface NavItemProps {
  icon: React.ReactNode;
  text: string;
  href: string;
  isHovered: boolean;
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, href, isHovered }) => (
  <li>
    <Link href={href} className="flex items-center p-4 opacidadHover">
      <span className="mr-4">{icon}</span>
      <span className={`transition-all duration-300 ${isHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0'} overflow-hidden whitespace-nowrap`}>
        {text}
      </span>
    </Link>
  </li>
);

export default NavBarEmergente;
