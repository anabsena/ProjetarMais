import { HiArrowSmRight } from "react-icons/hi";
import { Button } from "../../../components/ui/button";

const ContactScreen = () => {
  const handleSendMessage = () => {
    const name = (document.getElementById('name') as HTMLInputElement).value;
    const message = (document.getElementById('description') as HTMLTextAreaElement).value;

    const phone = '5543998008930'; // Número de telefone do WhatsApp
    const text = `Olá, meu nome é ${name}. ${message}`; // Mensagem a ser enviada

    const url = `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

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
      <div className=" gap-2 mt-6 absolute top-12 right-8 hidden lg:flex">
        <a href="https://wa.me/5543998008930" target="_blank" rel="noopener noreferrer"><img src="img/icon-whatsapp.png" className="w-16 h-16" alt="" /></a>
        <a href="https://www.instagram.com/projetarmais.arq/" target="_blank" rel="noopener noreferrer"> <img src="img/icon-instagram.png" className="w-16 h-16" alt="" /></a>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 p-8 gap-8 ">
        <div className="grid grid-cols-2 gap-20 items-center" style={{ fontFamily: "Mulish, sans-serif" }}>
          <h1 className="col-span-2 text-[#DADDF2] text-4xl ">Conte suas ideias e transforme os seus sonhos em realidade!</h1>

          <div className=" col-span-2 sm:col-span-1">
            <h1 className="text-[#EDD253]">Telefone</h1>
            <p className="text-[#CACEED]">(43)99800-8930</p>
          </div>
          <div className="sm:col-span-1">
            <h1 className="text-[#EDD253]">Email</h1>
            <p className="text-[#CACEED] uppercase">projetarmais.arq@gmail.com</p>
          </div>
          <div className="col-span-2">
            <h1 className="text-[#EDD253]">Endereço</h1>
            <p className="text-[#CACEED]">Rua Professora Diva Proença, 1175 - Sala 01 - Ivaiporã/PR</p>
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
        
          <textarea
            id="description"
            placeholder="Conte aqui"
            rows={6}
            className="p-4 bg-transparent border border-[#B4B9E0] w-full sm:w-[80%] rounded-xl focus:outline-none"

          />
          <div className="w-[80%] flex justify-end">

            <Button variant={"inverseTwo"} size={"lg"} onClick={handleSendMessage}>Enviar <HiArrowSmRight /></Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactScreen;
