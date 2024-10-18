// "use client";
// import React, { useState, useEffect } from 'react';
// import { FaTimes, FaHome, FaAddressCard, FaClipboardList, FaClipboardCheck, FaMailBulk, FaExpeditedssl, FaBuilding, FaUsers, FaUniversity } from 'react-icons/fa';
// import Link from 'next/link';
// import { useNavBar } from '@/context/NavBarContext';
// import { signOut, useSession } from "next-auth/react";

// const NavBarEmergente: React.FC = () => {
//   const [isHovered, setIsHovered] = useState(false);
//   const { isOpen, toggleNavBar } = useNavBar();
//   const { data: session, status } = useSession();
//   const [navigation, setNavigation] = useState<NavItemProps[]>([]);

//   const getLinks = () => {
//     if (status !== "authenticated") return;

//     if (session?.user.role === "estudiante") {
//       setNavigation([
//         { icon: <FaHome size={20} />, text: "Principal", href: "/estudiante", isHovered },
//         { icon: <FaAddressCard size={20} />, text: "Perfil", href: "/estudiante/perfil", isHovered },
//         { icon: <FaClipboardList size={20} />, text: "Ofertas de Vacante", href: "/estudiante/ofertas", isHovered },
//         { icon: <FaClipboardCheck size={20} />, text: "Mis Aplicaciones", href: "/estudiante/misaplicaciones", isHovered },
//         { icon: <FaMailBulk size={20} />, text: "Notificaciones", href: "/estudiante/notificaciones", isHovered },
//       ]);
//     } else if (session?.user.role === "alcaldia") {
//       setNavigation([
//         { icon: <FaHome size={20} />, text: "Principal", href: "/alcaldia", isHovered },
//         { icon: <FaAddressCard size={20} />, text: "Perfil", href: "/alcaldia/perfil", isHovered },
//         { icon: <FaClipboardList size={20} />, text: "Ofertas", href: "/alcaldia/ofertas", isHovered },
//         { icon: <FaMailBulk size={20} />, text: "Notificaciones", href: "/alcaldia/notificaciones", isHovered },
//         { icon: <FaUsers size={20} />, text: "Estudiantes", href: "/alcaldia/estudiantes", isHovered },
//         { icon: <FaBuilding size={20} />, text: "Instituciones", href: "/alcaldia/instituciones", isHovered },
//         { icon: <FaUniversity size={20} />, text: "Preregistros", href: "/alcaldia/preregister", isHovered },
//       ]);
//     } else if (session?.user.role === "dependencia") {
//       setNavigation([
//         { icon: <FaHome size={20} />, text: "Principal", href: "/dependencia", isHovered },
//         { icon: <FaAddressCard size={20} />, text: "Perfil", href: "/dependencia/perfil", isHovered },
//         { icon: <FaClipboardList size={20} />, text: "Mis Ofertas", href: "/dependencia/misofertas", isHovered },
//         { icon: <FaClipboardCheck size={20} />, text: "Crear Oferta", href: "/dependencia/misofertas/crearoferta", isHovered },
//         { icon: <FaMailBulk size={20} />, text: "Notificaciones", href: "/dependencia/notificaciones", isHovered },
//       ]);
//     }
//   };

//   useEffect(() => {
//     getLinks();
//   }, [status]);

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
//           {navigation.map((item) => (
//             <NavItem 
//               key={item.text}
//               icon={item.icon} 
//               text={item.text} 
//               href={item.href} 
//               isHovered={isHovered} 
//             />
//           ))}
//           {session && (
//             <button 
//               className="hover:opacity-100 hover:w-[100%]" 
//               onClick={() => signOut()}
//             >
//               <NavItem 
//                 icon={<FaExpeditedssl size={20} />} 
//                 text="Cerrar sesión" 
//                 href="/" 
//                 isHovered={isHovered} 
//               />
//             </button>
//           )}
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



'use client'

import React, { useState, useEffect } from 'react'
import { FaTimes, FaHome, FaAddressCard, FaClipboardList, FaClipboardCheck, FaMailBulk, FaExpeditedssl, FaBuilding, FaUsers, FaUniversity, FaRegFilePowerpoint, FaChartBar } from 'react-icons/fa'
import Link from 'next/link'
import { useNavBar } from '@/context/NavBarContext'
import { signOut, useSession } from "next-auth/react"

interface NavItemProps {
  icon: React.ReactNode
  text: string
  href: string
  isHovered: boolean
  isCompact: boolean
}

const NavItem: React.FC<NavItemProps> = ({ icon, text, href, isHovered, isCompact }) => (
  <li>
    <Link href={href} className={`flex items-center ${isCompact ? 'p-4' : 'p-6'} opacidadHover`}>
      <span className={isCompact ? 'mr-2' : 'mr-4'}>{icon}</span>
      <span className={`transition-all ${isHovered ? 'opacity-100 w-auto' : 'opacity-0 w-0'} overflow-hidden whitespace-nowrap ${isCompact ? 'text-sm' : ''}`}>
        {text}
      </span>
    </Link>
  </li>
)

const NavBarEmergente: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { isOpen, toggleNavBar } = useNavBar()
  const { data: session, status } = useSession()
  const [navigation, setNavigation] = useState<NavItemProps[]>([])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640) // Assuming 640px as the breakpoint for mobile
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const getLinks = () => {
    if (status !== "authenticated") return

    const isAlcaldia = session?.user.role === "alcaldia"
    const isCompact = isAlcaldia && isMobile
    const baseProps = { isHovered, isCompact }

    if (session?.user.role === "estudiante") {
      setNavigation([
        { icon: <FaHome size={20} />, text: "Principal", href: "/estudiante", ...baseProps },
        { icon: <FaAddressCard size={20} />, text: "Perfil", href: "/estudiante/perfil", ...baseProps },
        { icon: <FaClipboardList size={20} />, text: "Ofertas de Vacante", href: "/estudiante/ofertas", ...baseProps },
        { icon: <FaClipboardCheck size={20} />, text: "Mis Aplicaciones", href: "/estudiante/misaplicaciones", ...baseProps },
        { icon: <FaMailBulk size={20} />, text: "Notificaciones", href: "/estudiante/notificaciones", ...baseProps },
      ])
    } else if (isAlcaldia) {
      setNavigation([
        { icon: <FaChartBar size={isCompact ? 18 : 20} />, text: "Metricas", href: "/alcaldia", ...baseProps },
        { icon: <FaRegFilePowerpoint size={isCompact ? 18 : 20} />, text: "Reportes", href: "/alcaldia/reportes", ...baseProps },
        { icon: <FaAddressCard size={isCompact ? 18 : 20} />, text: "Perfil", href: "/alcaldia/perfil", ...baseProps },
        { icon: <FaClipboardList size={isCompact ? 18 : 20} />, text: "Ofertas", href: "/alcaldia/ofertas", ...baseProps },
        { icon: <FaMailBulk size={isCompact ? 18 : 20} />, text: "Notificaciones", href: "/alcaldia/notificaciones", ...baseProps },
        { icon: <FaUsers size={isCompact ? 18 : 20} />, text: "Estudiantes", href: "/alcaldia/estudiantes", ...baseProps },
        { icon: <FaBuilding size={isCompact ? 18 : 20} />, text: "Instituciones", href: "/alcaldia/instituciones", ...baseProps },
        { icon: <FaUniversity size={isCompact ? 18 : 20} />, text: "Preregistros", href: "/alcaldia/preregister", ...baseProps },
      ])
    } else if (session?.user.role === "dependencia") {
      setNavigation([
        { icon: <FaChartBar size={isCompact ? 18 : 20} />, text: "Metricas", href: "/dependencia", ...baseProps },
        { icon: <FaAddressCard size={20} />, text: "Perfil", href: "/dependencia/perfil", ...baseProps },
        { icon: <FaClipboardList size={20} />, text: "Mis Ofertas", href: "/dependencia/misofertas", ...baseProps },
        { icon: <FaClipboardCheck size={20} />, text: "Crear Oferta", href: "/dependencia/misofertas/crearoferta", ...baseProps },
        { icon: <FaMailBulk size={20} />, text: "Notificaciones", href: "/dependencia/notificaciones", ...baseProps },
      ])
    }
  }

  useEffect(() => {
    getLinks()
  }, [status, isHovered, isMobile])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        toggleNavBar()
      }
    }

    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [toggleNavBar])

  if (!isOpen) return null

  const isAlcaldia = session?.user.role === "alcaldia"
  const isCompact = isAlcaldia && isMobile

  return (
    <div
      className={`fixed left-0 h-full opacidad text-white transition-all ease-in-out z-50 
        ${isHovered ? (isCompact ? 'w-56' : 'w-64') : 'w-16'} 
        ${isAlcaldia ? 'top-[2vh]' : 'top-[8vh]'}
        overflow-hidden`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        onClick={toggleNavBar}
        className={`absolute right-4 text-white hover:text-red-300  ${isAlcaldia ? 'top-1' : 'top-5'}`}
      >
        <FaTimes size={24}/>
      </button>
      <nav className={`${isAlcaldia ? 'pt-4' : 'pt-12'} ${isCompact ? 'space-y-2' : 'space-y-4'}`}>
        <ul>
          {navigation.map((item) => (
            <NavItem 
              key={item.text}
              icon={item.icon} 
              text={item.text} 
              href={item.href} 
              isHovered={isHovered}
              isCompact={isCompact}
            />
          ))}
          {session && (
            <li>
              <button 
                className={`w-full text-left m-0 p-0 ${isCompact ? 'p-0' : 'p-0'} opacidadHover`}
                onClick={() => signOut()}
              >
                <NavItem 
                  icon={<FaExpeditedssl size={isCompact ? 18 : 20} />} 
                  text="Cerrar sesión" 
                  href="/" 
                  isHovered={isHovered}
                  isCompact={isCompact}
                />
              </button>
            </li>
          )}
        </ul>
      </nav>
    </div>
  )
}

export default NavBarEmergente