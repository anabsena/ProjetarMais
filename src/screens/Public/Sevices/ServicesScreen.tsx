import { HiArrowSmRight, HiHome, HiOfficeBuilding } from "react-icons/hi";
import { Button } from "../../../components/ui/button";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { useEffect, useState } from "react";
import useCategoryHook from "../../../hooks/useCategoryHook";

const ServicesScreen = () => {
  const [category, setCategory] = useState([]);
  const { categoryControllerFindAll } = useCategoryHook();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await categoryControllerFindAll("", 1, 10);
        console.log(response.data.data[8]);
        setCategory(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchCategory();
  }, []);

  return (
    <div>
      <div className="flex flex-col w-auto items-center mt-28 lg:mt-4 z-30 ">
        <h1 className="uppercase text-[#2F2E59] font-bold text-4xl px-4" style={{ fontFamily: "Adam, sans-serif" }}>
          Nossos serviços
        </h1>
        <img src="img/separador-title.svg" alt="" className="" />
      </div>
      {category.map((item, index) => (
        <div key={index}>
          <div className="bg-[#CACEED] w-full md:h-[70vh] flex flex-col gap-4 lg:gap-0 items-end p-4 relative mt-8 text-[#2F2E59] ">
            <HiOutlineHomeModern size={'9xl'} className="absolute right-1/3 z-10 text-[#F2F4FF]/30" />
            <div className="flex flex-col w-3/12 items-end">
              <h1 className=" text-4xl font-bold text-center lg:text-end z-40 pr-4" style={{ fontFamily: "Adam, sans-serif" }}>
                {item.name}
              </h1>
              <img src="img/detalhe-horizontal.svg" alt="" />
            </div>
            <div className="w-full flex justify-center h-full items-center z-30" style={{ fontFamily: "Mulish, sans-serif" }}>
              <p className="lg:w-1/2 text-center md:text-lg">{item.description}</p>
            </div>
            <Button variant={"inverseTwo"} size={"lg"} className="absolute bottom-8 right-8">
              Ver Projetos <HiArrowSmRight />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ServicesScreen;
