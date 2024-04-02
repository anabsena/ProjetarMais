import { HiArrowSmRight, HiOutlineOfficeBuilding } from "react-icons/hi";
import HeaderHome from "../../../components/HeaderHome";
import { Button } from "../../../components/ui/button";
import useCategoryHook from "../../../hooks/useCategoryHook";
import { useEffect, useState } from "react";

export const Home = () => {

  const { categoryControllerFindAll } = useCategoryHook()
  const [category, setCategory] = useState([]);


  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await categoryControllerFindAll('', 1, 10);
        console.log(response);
        if (response.status === 200) {
          //@ts-ignore
          setCategory(response.data.data)
        }
      } catch (error) {

      }
    };

    fetchCategory();
  }, []);
  return (
    <div className=" bg-[#F2F4FF]">
      <div className="w-full relative min-h-screen overflow-hidden">
        <HeaderHome />
        <div id="home" className="w-full relative hidden lg:flex h-full">
          <div className="w-full absolute top-0 left-0 z-10">
            <img src="img/bg-initial.svg" className="h-full w-full object-cover" alt="" />
          </div>
          <div className="z-30 relative h-screen w-full flex items-center justify-between">
            <img src="img/Logotipo1.svg" className="w-1/3 " alt="" />
            <img src="img/bg-text-initial.svg" className="w-1/2 absolute right-0 object-cover" alt="" />
            <div className=" w-96 xl:w-[500px] 2xl:w-[600px] mt-20 flex flex-col gap-4 z-30 pr-4 2xl:pr-36 text-[#0E0E12]">
              <h1 style={{ fontFamily: "Adam, sans-serif" }} className=" font-bold text-xl xl:text-2xl 2xl:text-3xl ">
                There are many variations of passages of Lorem Ipsum available
              </h1>
              <p style={{ fontFamily: "Mulish, sans-serif" }} className="text-md ">
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour
              </p>
              <div>
                <Button className="" size={"lg"}>
                  Saiba mais
                </Button>
              </div>
            </div>
            <div className="w-full absolute flex justify-center bottom-8">
              <div className="flex gap-2 ">
                <a href="https://wa.me/5543998008930"  target="_blank" rel="noopener noreferrer"><img src="img/icon-whatsapp.png" alt="" /></a>
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
                <img src="img/icon-whatsapp.png" className="w-10 h-10" alt="" />
                <img src="img/icon-instagram.png" className="w-10 h-10" alt="" />
              </div>
            </div>
          </div>
          <div className="w-full flex z-30 justify-end mt-8">
            <div className="w-2/3 z-30 text-[#0E0E12] flex flex-col sm:gap-8">
              <h1 style={{ fontFamily: "Adam, sans-serif" }} className=" font-bold text-xl sm:text-3xl">
                There are many variations of passages of Lorem Ipsum available
              </h1>
              <p style={{ fontFamily: "Mulish, sans-serif" }} className="text-[12px] sm:text-lg">
                There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour
              </p>

            </div>
          </div>
          <div className="z-30 absolute bottom-20">
            <Button className="px-12 flex items-center gap-2" size={"lg"}>
              <span> Saiba mais</span> <HiArrowSmRight />
            </Button>
          </div>
          <div className="absolute opacity-45 -bottom-20">
            <img src="img/bg-predio.svg" className="w-3/4 " alt="" />
          </div>
        </div>



      </div>
      <div className="w-full min-h-screen xl:flex-row items-start xl:items-center justify-start xl:justify-center flex flex-col relative">
        <div className="flex flex-col w-full items-center xl:hidden mt-4">
          <h1 className="uppercase text-[#2F2E59] font-bold text-4xl " style={{ fontFamily: "Adam, sans-serif" }}>
            Sobre nós
          </h1>
          <img src="img/separador-title.svg" alt="" className="mb-8" />
        </div>
        <div className="w-full absolute left-0 hidden xl:flex">
          <h1 className="uppercase text-[#2F2E59] font-bold text-6xl flex flex-col leading-10 justify-center items-center pl-4" style={{ fontFamily: "Adam, sans-serif" }}>
            <span>S</span><br />
            <span>O</span><br />
            <span>B</span><br />
            <span>R</span><br />
            <span>E</span><br /><br />
            <span>N</span><br />
            <span>O</span><br />
            <span>S</span>
          </h1>
        </div>
        <div className="flex flex-col w-full h-full items-end justify-center md:items-start xl:items-center md:justify-start xl:justify-center md:pl-4">
          <div className="p-4  md:w-3/5 xl:w-1/2 z-30 xl:mr-96 2xl:mr-64">
            <img src="img/Img-escritorio.png" className=" " alt="" />
          </div>
          <div className="w-full h-96 min-[320px]:h-[600px] sm:w-[700px] sm:h-[700px] md:absolute md:right-0 z-10">
            <div style={{
              backgroundImage: "url('img/bg-sobre.svg')",
              backgroundRepeat: "no-repeat",
              backgroundSize: "contain",
            }} className="flex justify-center items-center h-full w-full ">
              <p className=" w-64 md:text-sm text-[12px] mb-48 min-[420px]:mb-0">
                There are many variations of passages of Lorem Ipsum available There are many variations of passages of Lorem Ipsum available. There are many variations of passages of Lorem Ipsum available There are many variations of passages of Lorem Ipsum available. There are many variations of passages of Lorem Ipsum available There are many variations of passages of Lorem Ipsum available
              </p>
            </div>
          </div>


        </div>
      </div>
      <div className="flex flex-col">

        <div className="w-full sm:h-56 relative flex justify-center">
          <img src="img/top-sobre-nos.svg" className="w-full object-cover absolute z-10" alt="" />
          <div className="flex flex-col items-center z-30">
            <h1 className="uppercase text-[#27264D] font-bold text-4xl mt-12 sm:mt-24" style={{ fontFamily: "Adam, sans-serif" }}>
              Quem somos
            </h1>
            <img src="img/separador-title.svg" alt="" />
          </div>
        </div>
        <div className="w-full  bg-[#9BA1D1] flex flex-col items-center justify-center relative sm:gap-12">
          <img src="img/Icon-project.svg" className=" z-30 absolute top-0 right-0 hidden md:flex" alt="" />
          <img src="img/Icon-planta.svg" className=" z-30 absolute bottom-2 left-8 hidden md:flex" alt="" />
          <img src="img/Detalhes.svg" className=" z-30 absolute hidden w-56 -mt-12 md:flex" alt="" />
          <div className="h-full z-30 text-black flex flex-col mt-8 sm:mt-0 items-center  justify-center">
            <div className="flex items-center w-full gap-4 flex-col-reverse justify-center md:flex-row">
              <div className="sm:w-[410px] md:h-[537px] p-4 relative flex justify-center md:block">
                <img src="img/mais_azul.svg" className="absolute top-0 left-0 w-36 hidden md:flex" alt="" />
                <img src="img/Andressa.jpg" className="md:absolute bottom-0 right-0 w-80 h-[450px] object-cover" alt="" />
              </div>
              <div className="sm:w-[395px] p-4">
                <h1 style={{ fontFamily: "Alice", fontSize: "36px" }}>Andressa Belo</h1>
                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour
                  There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour</p>
              </div>
            </div>
            <div className="flex items-center md:-mt-20  flex-col justify-center md:flex-row">

              <div className="sm:w-[395px] p-4">
                <h1 style={{ fontFamily: "Alice", fontSize: "36px" }}>Monica Goes</h1>
                <p>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour
                  There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour</p>
              </div>
              <div className="sm:w-[395px] md:h-[537px] p-4 relative flex justify-center sm:block">
                <img src="img/mais_branco.svg" className="absolute top-0 right-0 w-36 hidden md:flex" alt="" />
                <img src="img/Monica.jpg" className="md:absolute bottom-0 left-0 w-80 h-[450px] object-cover" alt="" />
              </div>
            </div>

          </div>
          <Button variant={"inverseTwo"} size={"lg"}>Saiba mais <HiArrowSmRight /></Button>
          <div>

          </div>
        </div>
      </div>
      <div style={{
        backgroundImage: "url('img/bg-mais.svg')",
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
      }} className="flex flex-col justify-start items-center  min-h-screen w-full gap-8 z-10">
        <div className="flex flex-col w-auto items-center mt-4 z-30 ">
          <h1 className="uppercase text-[#2F2E59] font-bold text-4xl px-4" style={{ fontFamily: "Adam, sans-serif" }}>
            O que fazemos de melhor
          </h1>
          <img src="img/separador-title.svg" alt="" className="mb-8 w-full" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full gap-4  px-32 ">
          {category.map((category) => (
            // @ts-ignore
            <div key={category.id} className="bg-[#9BA1D1] p-2 w-full h-full rounded-xl ">
              <div className="border-2 border-[#F4E393] p-8 w-full rounded-lg flex flex-col items-center gap-4">
                <HiOutlineOfficeBuilding className="text-8xl" />
                {/* @ts-ignore */}
                <h1 className="text-2xl">{category.name}</h1>
              </div>
            </div>
          ))}
        </div>
        <Button className="px-12 flex items-center gap-2" variant={"inverseTwo"} size={"lg"}>Saber mais <HiArrowSmRight /></Button>
        <div className="w-full p-4 mt-4 ">
          <div className="flex flex-col  items-start mt-4 z-30 ">
            <h1 className="uppercase text-[#2F2E59] font-bold text-4xl " style={{ fontFamily: "Adam, sans-serif" }}>
              Projetos
            </h1>
            <img src="img/separador-title-project.svg" className="mb-8" alt="" />
          </div>
          <div className="grid  grid-cols-1 lg:grid-cols-3  h-48 px-32 gap-12">
            <div className="bg-[#2F2E59] rounded-lg"></div>
            <div className="bg-[#9BA1D1] rounded-lg"></div>
            <div className="bg-[#2F2E59] rounded-lg"></div>
          </div>
        </div>
        <Button variant={"inverseTwo"} size={"lg"}>Ver todos <HiArrowSmRight /></Button>
        <div>
        </div>
      </div>
      <div style={{
        backgroundImage: "url('img/bg-fale-conosco.svg')",
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }} className="flex flex-col justify-center items-center  min-h-screen w-full z-10">
        <div className="flex flex-col w-full items-start mt-8 pl-8 z-30 ">
          <h1 className="uppercase text-white  text-4xl " style={{ fontFamily: "Adam, sans-serif" }}>
            Fale conosco
          </h1>
          <img src="img/separador-title-project.svg" className="mb-8" alt="" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 p-8 gap-8 ">
          <div className="grid grid-cols-2 gap-20 items-center" style={{ fontFamily: "Mulish, sans-serif" }}>
            <h1 className="col-span-2 text-[#DADDF2] text-4xl ">Conte suas ideias e transforme os seus sonhos em realidade!</h1>

            <div className="col-span-1">
              <h1 className="text-[#EDD253]">Telefone</h1>
              <p className="text-[#CACEED]">(43)99999-9999</p>
              <p className="text-[#CACEED]">(43)99999-9999</p>
            </div>
            <div className="col-span-1">
              <h1 className="text-[#EDD253]">Email</h1>
              <p className="text-[#CACEED] uppercase">projetarmais@gmail.com</p>
            </div>
            <div className="col-span-2">
              <h1 className="text-[#EDD253]">Endereço</h1>
              <p className="text-[#CACEED]">Rua João Wyclif, 111, Sala 408 - Gleba Fazenda Palhano, Londrina - PR, CEP: 86.050-450</p>
            </div>

          </div>
          <div className="flex flex-col items-center gap-4">
            <input type="text"
              id="email"
              placeholder="Email"
              className="p-4 bg-transparent border border-[#B4B9E0] w-[80%] rounded-xl focus:outline-none"
              autoComplete="off" />
            <input type="text"
              placeholder="Email"
              className="p-4 bg-transparent border border-[#B4B9E0] w-[80%] rounded-xl focus:outline-none" />


            <textarea
              id="description"
              placeholder="Descrição "
              rows={6}
              className="p-4 bg-transparent border border-[#B4B9E0] w-[80%] rounded-xl focus:outline-none"

            />
            <div className="w-[80%] flex justify-end">

              <Button variant={"inverseTwo"} size={"lg"}>Enviar <HiArrowSmRight /></Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};