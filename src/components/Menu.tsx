import { useEffect, useState } from "react";
import { HiOutlineFolderOpen, HiOutlineMenuAlt1, HiOutlineOfficeBuilding, HiOutlinePhotograph, HiOutlineUser, HiOutlineX } from "react-icons/hi";
import { Link } from "react-router-dom";

export const Menu = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isMenuOpen, setIsMenuOpen] = useState(!isMobile);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
      if (width >= 768) {
        setIsMenuOpen(true);
      } else {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <section 
      className="bg-secondary w-16 p-2 h-[93vh] flex flex-col justify-center items-center"  
      style={{ position: isMobile ? 'relative' : 'static' }}
    >
      {isMobile && (
        <div>
          <HiOutlineMenuAlt1 onClick={toggleMenu} className="fixed inset-0 top-4 left-1 text-3xl" />
        </div>
      )}
      {(isMenuOpen || !isMobile) && (
        <div style={{ position: isMobile ? 'absolute' : 'static' }} className="md:flex justify-center h-full bg-secondary md:bg-transparent z-50">
          {isMenuOpen && isMobile && (
            <>
              <HiOutlineX onClick={closeMenu} className="absolute top-2 left-2 text-3xl z-50" />
            </>
          )}
          <div className="flex flex-col w-full h-full pt-4 gap-4">
           <Link to="/admin">
            <HiOutlineUser className="text-3xl" />
          </Link>
          <hr className="bg-[#D9B341] h-0.5 rounded-full border-none"/>
          <Link to="/projects">
            <HiOutlineOfficeBuilding className="text-3xl" />
          </Link>
          <hr className="bg-[#D9B341] h-0.5 rounded-full border-none"/>
          <Link to="/categorys">
            <HiOutlineFolderOpen className="text-3xl" />
          </Link>
          </div> 
        </div>
      )}
    </section>
  );
};
