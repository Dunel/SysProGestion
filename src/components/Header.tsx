import { ReactNode, useEffect, useState } from "react";

export default function Header({ title, subtitle }: { title: ReactNode, subtitle: ReactNode }) {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById('sticky-header');
      const sticky = header?.offsetTop || 0;

      if (window.scrollY >= sticky) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header 
      id="sticky-header"
      className={`p-2 w-full sticky top-0 transition-all duration-300 ${
        isSticky ? 'shadow scale-80 origin-top bg-white h-auto p-1' : ''
      }`}
    >
      <div className={`mx-auto px-2 py-2 sm:px-6 lg:px-20 ml-[5%] transition-all duration-300 ${
        isSticky ? 'py-1' : 'py-2'
      }`}>
        <h1 className={`text-3xl font-bold tracking-tight text-gray-900 text-justify transition-all duration-300 ${
          isSticky ? 'text-2xl' : 'text-3xl'
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
    </header>
  );
}