import { HiArrowSmRight, HiHome, HiOfficeBuilding } from "react-icons/hi"
import { Button } from "../../../components/ui/button"
import { HiOutlineHomeModern } from "react-icons/hi2";

const ServicesScreen = () => {
  
  return (
    <div>

      <div className="flex flex-col w-auto items-center mt-28 lg:mt-4 z-30 ">
        <h1 className="uppercase text-[#2F2E59] font-bold text-4xl px-4" style={{ fontFamily: "Adam, sans-serif" }}>
          Nossos serviços
        </h1>
        <img src="img/separador-title.svg" alt="" className="" />
      </div>
      <div>
        <div className="bg-[#CACEED] w-full md:h-[70vh] flex flex-col gap-4 lg:gap-0 items-end p-4 relative mt-8 text-[#2F2E59] ">
          <HiOutlineHomeModern size={'9xl'} className="absolute right-1/3 z-10 text-[#F2F4FF]/30" />
          <div className="flex flex-col w-3/12 items-end">

            <h1 className=" text-4xl font-bold text-center lg:text-end z-40 pr-4" style={{ fontFamily: "Adam, sans-serif" }}>Projetos arquitetônicos</h1>
            <img src="img/detalhe-horizontal.svg" alt="" />
          </div>
          <div className="w-full flex justify-center h-full items-center z-30" style={{ fontFamily: "Mulish, sans-serif" }}>

            <p className="lg:w-1/2 text-center md:text-lg">O projeto arquitetônico é uma forma única de representar o seu sonho de modo técnico e detalhado, ou seja, torná-lo capaz de ser construído.
              Mas claro que, para que tudo isso se torne real, entendemos as características particulares de cada pessoa e do local para o desenvolvimento do projeto, proporcionando uma solução adequada e singular.
              O serviço de projeto arquitetônico normalmente inclui estudos de viabilidade, elaboração de plantas, cortes, estudo de fachada e elevações, além do acompanhamento das aprovações necessárias em órgãos públicos.</p>
          </div>
          <Button variant={"inverseTwo"} size={"lg"} className="absolute bottom-8 right-8">Ver Projetos <HiArrowSmRight /></Button>
        </div>
      </div>
    </div>
  )
}

export default ServicesScreen
