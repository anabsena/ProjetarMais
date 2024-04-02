import { HiArrowSmRight } from "react-icons/hi"
import { Button } from "../../../components/ui/button"

const ContactScreen = () => {
  return (
    <div style={{
      backgroundImage: "url('img/bg-fale-conosco.svg')",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    }} className="flex flex-col justify-center items-center relative lg:h-[75vh] w-full z-10">
      <div className="flex flex-col w-full items-start mt-28 lg:mt-4  pl-8 z-30 ">
        <h1 className="uppercase text-white  text-4xl " style={{ fontFamily: "Adam, sans-serif" }}>
          Fale conosco
        </h1>
        <img src="img/separador-title-project.svg" className="mb-8" alt="" />
      </div>
      <div className=" gap-2 mt-6 absolute top-24 right-8 hidden lg:flex">
        <a href="https://wa.me/5543998008930" target="_blank" rel="noopener noreferrer"><img src="img/icon-whatsapp.png" className="w-16 h-16" alt="" /></a>
        <a href="https://www.instagram.com/projetarmais.arq/" target="_blank" rel="noopener noreferrer"> <img src="img/icon-instagram.png" className="w-16 h-16" alt="" /></a>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 p-8 gap-8 ">
        <div className="grid grid-cols-2 gap-20 items-center" style={{ fontFamily: "Mulish, sans-serif" }}>
          <h1 className="col-span-2 text-[#DADDF2] text-4xl ">Conte suas ideias e transforme os seus sonhos em realidade!</h1>

          <div className=" col-span-2 sm:col-span-1">
            <h1 className="text-[#EDD253]">Telefone</h1>
            <p className="text-[#CACEED]">(43)99999-9999</p>
            <p className="text-[#CACEED]">(43)99999-9999</p>
          </div>
          <div className="sm:col-span-1">
            <h1 className="text-[#EDD253]">Email</h1>
            <p className="text-[#CACEED] uppercase">projetarmais@gmail.com</p>
          </div>
          <div className="col-span-2">
            <h1 className="text-[#EDD253]">Endereço</h1>
            <p className="text-[#CACEED]">Rua João Wyclif, 111, Sala 408 - Gleba Fazenda Palhano, Londrina - PR, CEP: 86.050-450</p>
          </div>
          <div className=" gap-2 col-span-2 lg:hidden flex">
            <a href="https://wa.me/5543998008930" target="_blank" rel="noopener noreferrer"><img src="img/icon-whatsapp.png" className="w-16 h-16" alt="" /></a>
            <a href="https://www.instagram.com/projetarmais.arq/" target="_blank" rel="noopener noreferrer"> <img src="img/icon-instagram.png" className="w-16 h-16" alt="" /></a>
          </div>
        </div>
        <div className="flex flex-col items-center gap-4">
          <input type="text"
            id="name"
            placeholder="Nome"
            className="p-4 bg-transparent border border-[#B4B9E0] w-full sm:w-[80%] rounded-xl focus:outline-none"
            autoComplete="off" />
          <input type="text"
            placeholder="Email"
            className="p-4 bg-transparent border border-[#B4B9E0] w-full sm:w-[80%] rounded-xl focus:outline-none" />


          <textarea
            id="description"
            placeholder="Descrição "
            rows={6}
            className="p-4 bg-transparent border border-[#B4B9E0] w-full sm:w-[80%] rounded-xl focus:outline-none"

          />
          <div className="w-[80%] flex justify-end">

            <Button variant={"inverseTwo"} size={"lg"}>Enviar <HiArrowSmRight /></Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ContactScreen