import { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { FaBars, FaTimes } from 'react-icons/fa'; // Importando os ícones do menu hamburguer e fechar
import { HiMenuAlt3, HiOutlineX } from 'react-icons/hi';

const HeaderHome = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // Estado para controlar a exibição do menu hamburguer

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`fixed w-full z-50 ${scrolled ? 'backdrop-filter backdrop-blur-xl bg-[#2F2E59] bg-opacity-30' : 'bg-transparent'}`}>


      {/* Menu para dispositivos móveis */}
      <div className="lg:hidden bg-[#08081A] px-4 rounded-b-3xl">
        <div className="flex w-full justify-between items-center relative">
          <img src="img/Logo.png" className="h-20 w-20" alt="" />

          <div className="relative">
            {isOpen ? (
              <HiOutlineX className="text-[#22222B] text-4xl cursor-pointer" onClick={toggleMenu} />
            ) : (
              <HiMenuAlt3 className="text-white text-4xl cursor-pointer" onClick={toggleMenu} />
            )}

            {isOpen && (
              <div className="fixed top-0 right-0 w-2/3 h-2/3 bg-[#22222B] bg-opacity-95 flex flex-col items-center justify-center rounded-l-full transition-transform duration-300 transform translate-x-0">
                <HiOutlineX className="text-white absolute top-4 right-4 text-4xl cursor-pointer" onClick={toggleMenu} />
                <h1 className="text-white text-xl mb-4 cursor-pointer">Home</h1>
                <h1 className="text-white text-xl mb-4 cursor-pointer">Sobre nós</h1>
                <h1 className="text-white text-xl mb-4 cursor-pointer">Projetos</h1>
                <Button variant={"inverseTwo"} size={"lg"}>Contato</Button>
                <div className='flex flex-col items-end justify-center mt-12 absolute bottom-20 right-1'>
                  <h1 className="text-white text-sm">(43)99999-9999</h1>
                  <h1 className=" text-white text-sm">projetarmais@gmail.com</h1>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Menu para desktop */}
      <div className="hidden lg:flex flex-col text-[#22222B]">
        <div className={`w-full flex justify-between px-4 py-2 bg-[#2F2E59]`} style={{ fontFamily: "Mulish, sans-serif" }}>
          <h1 className="text-white">(43)99999-9999</h1>
          <h1 className="uppercase text-white">projetarmais@gmail.com</h1>
        </div>
        <div className='flex w-full px-4 justify-between items-center text-xl'>
          <img src="img/Logo.png" className="h-24 w-24" alt="" />
          <div className='flex  items-center gap-12'>
            <h1 className="">Home</h1>
            <h1 className="">Sobre nós</h1>
            <h1 className="">Projetos</h1>
            <Button variant={"inverseTwo"} size={"lg"}>Contato</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderHome;
