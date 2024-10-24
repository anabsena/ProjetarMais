
import { Button } from '../../../../components/ui/button'
import { HiArrowSmRight } from 'react-icons/hi'

const StartHome = () => {
  return (
    <div>
              <div id="home" className="w-full relative hidden lg:flex h-full">
          <div className="w-full absolute top-0 left-0 z-10">
            <img src="img/bg-initial.svg" className="h-full w-full object-cover" alt="" />
          </div>
          <div className="z-30 relative h-screen w-full flex items-center justify-between">
            <img src="img/Logotipo1.svg" className="w-1/3 " alt="" />
            <img src="img/bg-text-initial.svg" className="w-1/2 absolute right-0 object-cover" alt="" />
            <div className=" w-96 xl:w-[500px] 2xl:w-[600px] mt-20 flex flex-col gap-4 z-30 pr-4 2xl:pr-36 text-[#0E0E12]">
              <h1 style={{ fontFamily: "Adam, sans-serif" }} className=" font-bold text-xl xl:text-2xl 2xl:text-3xl ">
                Transforme seus sonhos em realidade com um projeto de arquitetura personalizado.
              </h1>
              <p style={{ fontFamily: "Mulish, sans-serif" }} className="text-md ">
                Refletindo sua personalidade e estilo de vida. Invista em um projeto de excelência e sinta a transformação que ele pode trazer para sua vida!
              </p>
              <div>
                <a href="https://wa.me/5543998008930" target="_blank" rel="noopener noreferrer">
                  <Button className="" size={"lg"}>
                    Saiba mais
                  </Button>
                </a>
              </div>
            </div>
            <div className="w-full absolute flex justify-center bottom-8">
              <div className="flex gap-2 ">
                <a href="https://wa.me/5543998008930" target="_blank" rel="noopener noreferrer"><img src="img/icon-whatsapp.png" alt="" /></a>
                <a href="https://www.instagram.com/projetarmais.arq/" target="_blank" rel="noopener noreferrer"><img src="img/icon-instagram.png" alt="" /></a>
              </div>
            </div>
          </div>

        </div>
        <div className="w-full relative lg:hidden flex flex-col min-h-screen justify-center items-center px-4 sm:gap-12 ">
          <div className="w-full h-full flex justify-center items-center absolute z-20">

            <img src="img/bg-initial-mobile.svg" className="h-3/4 w-full object-cover" alt="" />
          </div>

          <div className="flex flex-col w-full items-center sm:-mt-20">
            <div className="w-full z-30 flex justify-start ">
              <div className="w-2/3 h-full flex justify-center items-center z-30">
                <img src="img/Logotipo-mobile.png" className="w-full  object-cover" alt="" />
              </div>
              <div className="flex gap-2 mt-6">
                <a href="https://wa.me/5543998008930" target="_blank" rel="noopener noreferrer"><img src="img/icon-whatsapp.png" className="w-10 h-10" alt="" /></a>
                <a href="https://www.instagram.com/projetarmais.arq/" target="_blank" rel="noopener noreferrer"> <img src="img/icon-instagram.png" className="w-10 h-10" alt="" /></a>
              </div>
            </div>
          </div>
          <div className="w-full flex z-30 justify-end mt-8">
            <div className="w-2/3 z-30 text-[#0E0E12] flex flex-col sm:gap-8">
              <h1 style={{ fontFamily: "Adam, sans-serif" }} className=" font-bold text-xl sm:text-3xl">
                Transforme seus sonhos em realidade com um projeto de arquitetura personalizado.
              </h1>
              <p style={{ fontFamily: "Mulish, sans-serif" }} className="text-[12px] sm:text-lg">
                Refletindo sua personalidade e estilo de vida. Invista em um projeto de excelência e sinta a transformação que ele pode trazer para sua vida!
              </p>

            </div>
          </div>
          <div className="z-30 absolute bottom-20">
            <a href="https://wa.me/5543998008930" target="_blank" rel="noopener noreferrer">
              <Button
                className="px-12 flex items-center gap-2"
                size="lg"

              >
                <span>Saiba mais</span>
                <HiArrowSmRight />
              </Button>
            </a>
          </div>
          <div className="absolute opacity-45 -bottom-20">
            <img src="img/bg-predio.svg" className="w-3/4 " alt="" />
          </div>
        </div>
    </div>
  )
}

export default StartHome
