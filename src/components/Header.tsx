"use client"
import { ReactNode, useEffect, useState } from "react";
import { FaBars } from 'react-icons/fa';
import { useNavBar } from '@/context/NavBarContext';

interface HeaderProps {
  title: ReactNode;
  subtitle: ReactNode;
}

export default function Header({ title, subtitle }: HeaderProps) {
  const [isSticky, setIsSticky] = useState(false);
  const threshold = 10; // Umbral para activar isSticky
  const { toggleNavBar } = useNavBar();
  const { closeNavBar } = useNavBar();

  useEffect(() => {
    let lastScrollY = 0;
    let ticking = false;

    const handleScroll = () => {
      lastScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (lastScrollY > threshold) {
            setIsSticky(true);
          } else {
            setIsSticky(false);
          }
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);


  useEffect (()=>{
    if(!isSticky) closeNavBar()
  }, [isSticky])

  

  return (
    <header
      id="sticky-header"
      className={`w-full sticky top-0 transition-all duration-300 ${
        isSticky ? 'z-30 shadow scale-80 origin-top color-header h-auto p-1 sm:pt-4' : ''
      }`}
    >
      <div className={`flex mx-auto px-2 py-2 sm:px-6 lg:px-20 transition-all duration-300 ${
        isSticky ? 'py-1 mt-[2vh]' : 'py-2'
      }`}>
        <div className={`${isSticky ? 'block' : 'hidden'}`}>
          <button
            id="button-hamburger"
            onClick={toggleNavBar}
            className="m-4 mr-6 z-50 text-gray-800 bg-white hover:text-gray-600"
          >
            <FaBars size={35} />
          </button>
        </div>
        <div>
          <h1 className={`text-2xl font-bold tracking-tight text-gray-900 text-justify transition-all duration-300 md:text-3xl ${
            isSticky ? 'text-xl md:text-2xl' : 'text-3xl'
          }`}>
            <i>{title}</i>
            <div>
              <p className={`text-justify font-normal transition-all duration-300 ${
                isSticky ? 'text-base' : 'text-xl'
              }`}>
                {subtitle}
              </p>
            </div>
          </h1>
        </div>
      </div>
    </header>
  );
}