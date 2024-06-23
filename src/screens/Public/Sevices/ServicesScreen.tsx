import { HiArrowSmRight, HiOutlineOfficeBuilding } from "react-icons/hi";
import { Button } from "../../../components/ui/button";
import { HiOutlineHomeModern } from "react-icons/hi2";
import { useEffect, useState } from "react";
import useCategoryHook from "../../../hooks/useCategoryHook";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/loading";
 // Importando o componente de loading

interface Category {
  id: string;
  name: string;
  description: string;
}

const ServicesScreen = () => {
  const [categories, setCategory] = useState<Category[]>([]);
  const { categoryControllerFindAll } = useCategoryHook();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await categoryControllerFindAll("", 1, 10);
        if(response.data?.data){
          setCategory(response.data.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, []);

  const getBackgroundColor = (id: string) => {
    const index = categories.findIndex(category => category.id === id);
    return Number(index + 1) % 2 === 0 ? true : false; // alternar entre azul e branco
  };

  const handleClickProject = (categoryId: string) => {
    navigate(`/serviços/projeto?id=${categoryId}`);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <div className="flex flex-col w-auto items-center mt-28 lg:my-8  z-30 ">
        <h1 className="uppercase text-[#2F2E59]  text-4xl px-4" style={{ fontFamily: "Mulish, sans-serif" }}>
          Nossos serviços
        </h1>
        <img src="img/separador-title.svg" alt="" className="" />
      </div>
      {categories.map((category) => (
        !getBackgroundColor(category.id) ?

          <div key={category.id} style={{ backgroundColor: `#CACEED` }} >
            <div className={` w-full md:h-[60vh] flex flex-col gap-4 lg:gap-0 items-end p-4 relative  text-[#2F2E59] `}>
              <HiOutlineHomeModern size={'9xl'} className="absolute w-1/2 left-0 z-10 text-[#F2F4FF]/30" />
              <div className="flex flex-col w-10/12 md:w-5/12 items-end">
                <h1 className="text-xl md:text-4xl  mr-2 text-center lg:text-end z-40 pr-4" style={{ fontFamily: "Mulish, sans-serif" }}>
                  {category.name}
                </h1>
                <img src="img/detalhe-horizontal.svg" alt="" />
              </div>
              <div className="w-full flex justify-center h-full items-center z-30" style={{ fontFamily: "Mulish, sans-serif" }}>
                <p className="lg:w-1/2 text-center text-sm md:text-lg">{category.description}</p>
              </div>
              <Button variant={"inverseTwo"} size={"lg"} onClick={() => handleClickProject(category.id)} className="md:absolute bottom-8 right-8 z-40">
                Ver Projetos <HiArrowSmRight />
              </Button>
            </div>
          </div>

          :

          <div key={category.id} style={{ backgroundColor: `#F2F4FF` }} >
            <div className={` w-full md:h-[60vh] flex flex-col gap-4 lg:gap-0 items-start p-4 relative mt-8 text-[#2F2E59] `}>
              <HiOutlineOfficeBuilding size={'9xl'} className="absolute z-10 w-1/2 right-1 text-[#C9CDED]/30" />

              <div className="flex flex-col w-10/12 md:w-5/12 items-start">
                <h1 className="text-xl md:text-4xl ml-2 text-center lg:text-start z-40 pr-4" style={{ fontFamily: "Mulish, sans-serif" }}>
                  {category.name}
                </h1>
                <img src="img/detalhe-horizontal.svg" alt="" />
              </div>

              <div className="w-full flex justify-center h-full items-center z-30" style={{ fontFamily: "Mulish, sans-serif" }}>
                <p className="lg:w-1/2 text-center md:text-lg text-sm">{category.description}</p>
              </div>
              <Button variant={"inverseTwo"} size={"lg"} onClick={() => handleClickProject(category.id)} className="md:absolute bottom-8 left-8 z-40">
                Ver Projetos <HiArrowSmRight />
              </Button>
            </div>
          </div>

      ))}
    </div>
  );
};

export default ServicesScreen;
