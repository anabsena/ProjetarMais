//@ts-ignore
import { HiArrowSmRight, HiOutlineOfficeBuilding } from "react-icons/hi";
//@ts-ignore
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
        if (response.data?.data) {
          setCategory(response.data.data);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, []);
  //@ts-ignore
  const getBackgroundColor = (id: string) => {
    const index = categories.findIndex(category => category.id === id);
    return Number(index + 1) % 2 === 0 ? true : false; // alternar entre azul e branco
  };
  //@ts-ignore
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
      {/* {categories.map((category) => (
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

      ))} */}
      <div style={{ backgroundColor: `#CACEED` }} >
        <div className={` w-full md:h-[60vh] flex flex-col gap-4 lg:gap-0 items-end p-4 relative  text-[#2F2E59] `}>
          <HiOutlineHomeModern size={'9xl'} className="absolute w-1/2 left-0 z-10 text-[#F2F4FF]/30" />
          <div className="flex flex-col w-10/12 md:w-5/12 items-end">
            <h1 className="text-xl md:text-4xl  mr-2 text-center lg:text-end z-40 pr-4" style={{ fontFamily: "Mulish, sans-serif" }}>
              Projeto arquitetônico
            </h1>
            <img src="img/detalhe-horizontal.svg" alt="" />
          </div>
          <div className="w-full flex justify-center h-full items-center z-30" style={{ fontFamily: "Mulish, sans-serif" }}>
            <p className="lg:w-1/2 text-center text-sm md:text-lg">O projeto arquitetônico é uma forma única de representar o seu sonho de modo técnico e detalhado, ou seja, torná-lo capaz de ser construído.
              Mas claro que, para que tudo isso se torne real, entendemos as características particulares de cada pessoa e do local para o desenvolvimento do projeto, proporcionando uma solução adequada e singular.
              O serviço de projeto arquitetônico normalmente inclui estudos de viabilidade, elaboração de plantas, cortes, estudo de fachada e elevações, além do acompanhamento das aprovações necessárias em órgãos públicos.
            </p>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: `#F2F4FF` }} >
        <div className={` w-full md:h-[60vh] flex flex-col gap-4 lg:gap-0 items-start p-4 relative mt-8 text-[#2F2E59] `}>
          <HiOutlineOfficeBuilding size={'9xl'} className="absolute z-10 w-1/2 right-1 text-[#C9CDED]/30" />

          <div className="flex flex-col w-10/12 md:w-5/12 items-start">
            <h1 className="text-xl md:text-4xl ml-2 text-center lg:text-start z-40 pr-4" style={{ fontFamily: "Mulish, sans-serif" }}>
              Projeto de interiores
            </h1>
            <img src="img/detalhe-horizontal.svg" alt="" />
          </div>

          <div className="w-full flex justify-center h-full items-center z-30" style={{ fontFamily: "Mulish, sans-serif" }}>
            <p className="lg:w-1/2 text-center md:text-lg text-sm">No projeto de interiores, projetamos espaços residenciais, comerciais e corporativos. Independente da sua finalidade, o objetivo é organizar e otimizar os espaços, tornando-os visualmente atraentes, confortáveis e funcionais, alinhando os gostos e vontades do cliente, proporcionando um projeto único e com personalidade.
              O serviço de projeto de interiores normalmente inclui layout do espaço, mobiliários planejados, mobiliários soltos, cores e texturas, forro e iluminação, revestimentos de parede e piso, decoração e acessórios.
            </p>
          </div>

        </div>
      </div>
      <div style={{ backgroundColor: `#CACEED` }} >
        <div className={` w-full md:h-[60vh] flex flex-col gap-4 lg:gap-0 items-end p-4 relative  text-[#2F2E59] `}>
          <HiOutlineHomeModern size={'9xl'} className="absolute w-1/2 left-0 z-10 text-[#F2F4FF]/30" />
          <div className="flex flex-col w-10/12 md:w-5/12 items-end">
            <h1 className="text-xl md:text-4xl  mr-2 text-center lg:text-end z-40 pr-4" style={{ fontFamily: "Mulish, sans-serif" }}>
              Reformas e intervenções
            </h1>
            <img src="img/detalhe-horizontal.svg" alt="" />
          </div>
          <div className="w-full flex justify-center h-full items-center z-30" style={{ fontFamily: "Mulish, sans-serif" }}>
            <p className="lg:w-1/2 text-center text-sm md:text-lg">
              Um projeto de reforma e intervenções tem como objetivo modificar ou melhorar uma estrutura já existente, visando aprimorar a funcionalidade, estética e segurança.
              Qualquer intervenção tem a capacidade de causar uma grande transformação no espaço. Esse projeto é fundamental para melhorar a utilidade e valorizar o imóvel, garantindo que a estrutura esteja de acordo com as normas e regulamentações atualizadas.
            </p>
          </div>
        </div>
      </div>
      <div style={{ backgroundColor: `#F2F4FF` }} >
        <div className={` w-full md:h-[60vh] flex flex-col gap-4 lg:gap-0 items-start p-4 relative mt-8 text-[#2F2E59] `}>
          <HiOutlineOfficeBuilding size={'9xl'} className="absolute z-10 w-1/2 right-1 text-[#C9CDED]/30" />

          <div className="flex flex-col w-10/12 md:w-5/12 items-start">
            <h1 className="text-xl md:text-4xl ml-2 text-center lg:text-start z-40 pr-4" style={{ fontFamily: "Mulish, sans-serif" }}>
              Projeto de paisagismo
            </h1>
            <img src="img/detalhe-horizontal.svg" alt="" />
          </div>

          <div className="w-full flex justify-center h-full items-center z-30" style={{ fontFamily: "Mulish, sans-serif" }}>
            <p className="lg:w-1/2 text-center md:text-lg text-sm">
              O projeto paisagístico tem como objetivo criar espaços externos atraentes e funcionais. Abrange a concepção e organização de elementos naturais em harmonia com a construção, como por exemplo, plantas, árvores, caminhos, mobiliário e iluminação, a fim de proporcionar um ambiente esteticamente agradável e adequado às necessidades específicas do local.
              Eles desempenham um papel essencial na criação de ambientes ao ar livre que promovem o bem-estar, a conectividade com a natureza e a valorização estética dos espaços exteriores.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ServicesScreen;
