"use client"
import React, { useState, useEffect } from 'react';
import { FaTimes, FaHome, FaAddressCard, FaClipboardList, FaClipboardCheck, FaMailBulk, FaExpeditedssl } from 'react-icons/fa';
import Link from 'next/link';
import { useNavBar } from '@/context/NavBarContext';

const NavBarEmergente: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const { isOpen, toggleNavBar } = useNavBar();

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
      className={`fixed top-[13vh] left-0 h-full opacidad text-white transition-all duration-300 ease-in-out z-50 ${
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
          <NavItem icon={<FaHome size={20} />} text="Principal" href="/estudiante" isHovered={isHovered} />
          <NavItem icon={<FaAddressCard size={20} />} text="Perfil" href="/estudiante/perfil" isHovered={isHovered} />
          <NavItem icon={<FaClipboardList size={20} />} text="Ofertas de Vacante" href="/estudiante/apply" isHovered={isHovered} />
          <NavItem icon={<FaClipboardCheck size={20} />} text="Mis Aplicaciones" href="/estudiante/apply/misaplicaciones" isHovered={isHovered} />
          <NavItem icon={<FaMailBulk  size={20} />} text="Notificaciones" href="/estudiante/notificaciones" isHovered={isHovered} />
          <NavItem icon={<FaExpeditedssl size={20} />} text="cerrar sesión" href="/estudiante/apply/misaplicaciones" isHovered={isHovered} />
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

