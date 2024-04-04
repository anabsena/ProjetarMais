import { useState, useEffect } from 'react';
import { Button } from "./ui/button";
import { HiMenuAlt3, HiOutlineX } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';

const HeaderHome = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate()

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
  const handleLinkAboutClick = () => {
    navigate('/sobre-nos');
  };
  const handleLinkContactClick = () => {
    navigate('/contato');
  };

  return (


    <div>

      {/* Menu para dispositivos móveis */}
      <div className="lg:hidden bg-[#08081A] px-4 rounded-b-3xl z-50 fixed w-full">
        <div className="flex w-full justify-between items-center relative ">
          <Link to='/home'><img src="img/Logo.svg" className="h-20 w-20" alt="" /></Link>

          <div className="relative">
            {isOpen ? (
              <HiOutlineX className="text-[#22222B] text-4xl cursor-pointer" onClick={toggleMenu} />
            ) : (
              <HiMenuAlt3 className="text-white text-4xl cursor-pointer" onClick={toggleMenu} />
            )}

            {isOpen && (
              <div className="fixed top-0 right-0 w-2/3 h-2/3 bg-[#22222B] bg-opacity-95 flex flex-col items-center justify-center rounded-l-full transition-transform duration-300 transform translate-x-0">
                <HiOutlineX className="text-white absolute top-4 right-4 text-4xl cursor-pointer" onClick={toggleMenu} />
                <a href="/home" className="text-white text-xl mb-4 cursor-pointer">Home</a>
                <a href="/sobre-nos" className="text-white text-xl mb-4 cursor-pointer">Sobre nós</a>
                <a href="/serviços" className="text-white text-xl mb-4 cursor-pointer">Serviços</a>
                <a href="/projetos" className="text-white text-xl mb-4 cursor-pointer">Projetos</a>
                <Button variant={"inverseTwo"} size={"lg"} onClick={handleLinkContactClick}>Contato</Button>
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
      <div className={`fixed w-full z-50 ${scrolled ? 'backdrop-filter backdrop-blur-xl bg-[#2F2E59] bg-opacity-30' : 'bg-transparent'}`}>
        <div className="hidden lg:flex flex-col text-[#22222B]">
          <div className={`w-full flex justify-between px-4 py-2 bg-[#2F2E59]`} style={{ fontFamily: "Mulish, sans-serif" }}>
            <h1 className="text-white">(43)99999-9999</h1>
            <h1 className="uppercase text-white">projetarmais@gmail.com</h1>
          </div>
          <div className='flex w-full px-4 justify-between items-center text-xl'>
            <Link to='/home'><img src="img/Logo.svg" className="h-16 w-16" alt="" /></Link>
            <div className='flex  items-center gap-12'>
              <a href="/home">Home</a>
              <Link to="/sobre-nos" onClick={handleLinkAboutClick}>Sobre nós</Link>
              <a href="/serviços">Serviços</a>
              <a href="/projetos">Projetos</a>
              <Button variant={"inverseTwo"} size={"lg"} onClick={handleLinkContactClick}>Contato</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderHome;
