"use client"
import { ReactNode, useEffect, useState } from "react";
import { FaBars } from 'react-icons/fa';
import { useNavBar } from '@/context/NavBarContext';
import { useSession } from "next-auth/react";

interface HeaderProps {
  title: ReactNode;
  subtitle: ReactNode;
}

export default function Header({ title, subtitle }: HeaderProps) {
  const [isSticky, setIsSticky] = useState(false);
  const threshold = 10; // Umbral para activar isSticky
  const { toggleNavBar } = useNavBar();
  const { closeNavBar } = useNavBar();

  const { data: session, update } = useSession();




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
        isSticky ? 'z-30 shadow scale-80 origin-top color-header h-auto' : ''
      }`}
    >
      <div className={`flex mx-auto p-1 transition-all duration-300 px-[5%] ${
        isSticky ? 'mx-auto justify-start gap-[5%]' : 'flex-col'
      }`}>
        <div className={`${isSticky ? 'block' : 'hidden'}`}>
          <button
            id="button-hamburger"
            onClick={toggleNavBar}
            className="ml-4 mr-6 z-50 text-gray-800 bg-white hover:text-gray-600"
          >
            <FaBars size={35} />
          </button>
        </div>
      
        {/* <div className={`flex ${isSticky ? 'flex-row' : 'flex-col'}`}> */}
   
          
          <h1 className={`my-auto font-bold tracking-tight text-gray-900 text-justify transition-all duration-300 ${
            isSticky ? 'text-sm ms:text-lg md:text-xl lg:text-2xl' : 'text-base ms:text-xl md:text-2xl lg:text-3xl'}`}>
            <i>{title?.toString().toUpperCase()}</i>
          </h1>
   

            <div>
              <p className={`text-justify font-normal transition-all duration-300 md:text-lg lg:text-xl ${
                isSticky ? 'text-sm md:text-mase lg:text-lg leading-tight' : ''
              }`}>
                { isSticky 
                  ? 
                  <img
                    src={session?.user.picture}
                    alt={`${session?.user.picture} logo`}
                    className="w-10 h-10 object-cover rounded-full border-4 border-black-800"
                  />
                  :subtitle
                }
              </p>
            </div>
          
     
        
      </div>
      

    </header>
  );
}