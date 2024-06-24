import { HiArrowSmRight, HiOutlineOfficeBuilding } from "react-icons/hi";
import HeaderHome from "../../../components/HeaderHome";
import { Button } from "../../../components/ui/button";
import useCategoryHook from "../../../hooks/useCategoryHook";
import { useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import ContactScreen from "../Contact/ContactScreen";
import useProjectHook from "../../../hooks/useProjectHook";
import { Link, useNavigate } from "react-router-dom";
import { BASE_IMAGE_URL } from "../../../constants/app.constant";

export const Home = () => {

  const { categoryControllerFindAll } = useCategoryHook()
  const [category, setCategory] = useState([]);
  const [projects, setProjects] = useState([]);
  const [photoOne, setPhotoOne] = useState<string[]>([]);


  const { projectControllerFindAll } = useProjectHook()
  const navigate = useNavigate()


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
    const fetchProjects = async () => {
      try {
        const response = await projectControllerFindAll('', '', '', 1, 3);
        if (response.status === 200) {
          //@ts-ignore
          const lastThreeProjects = response.data.data.slice(-3);

          const photoUrls = lastThreeProjects.map((project: any) => {
            const projectPhotos = project.ProjectPhotos || [];
            const urls = projectPhotos.map((photo: any) => BASE_IMAGE_URL + photo.photoUrl);
            return urls.length > 0 ? urls[0] : null; // Aqui você pode ajustar conforme a estrutura de dados
          });

          setPhotoOne(photoUrls);
          //@ts-ignore
          setProjects(lastThreeProjects);
          //@ts-ignore
        } else {
          console.error("Error fetching projects:", response.message);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchCategory();
    fetchProjects()
  }, []);

  const handleClickViewAllProjects = () => {
    navigate('/projetos')
  }
  const handleClickViewAllCateorys = () => {
    navigate('/serviços')
  }
  const handleClickViewAboutUs = () => {
    navigate('/sobre-nos')
  }

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
      <div className="w-full md:min-h-screen xl:flex-row items-start xl:items-center justify-start xl:justify-center flex flex-col relative">
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
        <div className="flex flex-col w-full items-center justify-center md:items-start xl:items-center md:justify-start xl:justify-center md:pl-4">
          <div className="p-4  md:w-1/2 z-30 xl:mr-96 2xl:mr-64">
            <img src="img/img-escritorio-home.png" className=" " alt="" />
          </div>
          <div className="h-96 w-full md:w-1/2 2xl:w-2/5 md:absolute md:right-0 z-10">
            <img src="/img/sobre-nos.png" alt="" className="w-full object-cover" />
          </div>

        </div>
      </div>
      <div className="flex flex-col">

        <div className="w-full sm:h-56 relative flex justify-center ">
          <img src="img/top-sobre-nos.svg" className="w-full object-cover absolute z-10" alt="" />
          <div className="flex flex-col items-center z-30">
            <h1 className="uppercase text-[#27264D] font-bold text-4xl mt-12 sm:mt-24" style={{ fontFamily: "Adam, sans-serif" }}>
              Quem somos
            </h1>
            <img src="img/separador-title.svg" alt="" />
          </div>
        </div>
        <div className="w-full  bg-[#9BA1D1] flex flex-col items-center justify-center relative sm:gap-12 pb-8">
          <img src="img/Icon-project.svg" className=" z-30 absolute top-0 right-0 hidden md:flex" alt="" />
          <img src="img/Icon-planta.svg" className=" z-30 absolute bottom-2 left-8 hidden md:flex" alt="" />
          <img src="img/Detalhes.svg" className=" z-30 absolute hidden w-56 -mt-12 md:flex" alt="" />
          <div className="h-full z-30 text-black flex flex-col mt-8 sm:mt-0 items-center  justify-center">
            <div className="flex items-center w-full gap-4 flex-col-reverse justify-center md:flex-row">
              <div className="sm:w-[410px] md:h-[537px] p-4 relative flex justify-center md:block">
                <img src="/img/mais_azul.svg" className="absolute top-0 left-0 w-36 hidden md:flex" alt="" />
                <img src="/img/Andressa.jpg" className="md:absolute bottom-0 right-0 w-80 h-[450px] object-cover" alt="" />
              </div>
              <div className="sm:w-[395px] p-4">
                <h1 style={{ fontFamily: "Alice", fontSize: "36px" }}>Andressa Belo</h1>
                <div className="flex flex-col gap-2 text-sm text-justify">
                  <p>Me chamo Andressa Belo, sou formada em Arquitetura e Urbanismo pela Universidade Unicesumar de Maringá no ano de 2021.</p>
                  <p>O interesse pela arte sempre esteve presente na minha vida, sou apaixonada pela arquitetura e procuro demonstrar isso nos projetos que realizo. Essa arte envolve criar, transformar espaços e entender as necessidades e os gostos de cada pessoa que vai morar ou trabalhar naquele espaço e assegurar que tudo aconteça exatamente como desejado.</p>
                  <p>Eu escolhi a arquitetura porque sei da importância que ela tem para a vida das pessoas e para a sociedade, é grandioso e fascinante mergulhar nos sonhos dos outros e poder transformá-los em realidade, participar dessa materialização é gratificante</p>
                </div>
              </div>
            </div>
            <div className="flex items-center md:-mt-20   flex-col justify-center md:flex-row">

              <div className="sm:w-[400px] p-4">
                <h1 style={{ fontFamily: "Alice", fontSize: "36px" }}>Monica Goes</h1>
                <div className="flex flex-col gap-2 text-sm text-justify pr-6">
                  <p>Me chamo Mônica Goes, sou Arquiteta e Urbanista, amo criar ambientes personalizados para cada cliente, com muita atenção aos detalhes que refletem sua essência.
                  </p>
                  <p>Minha jornada começou na faculdade Unicesumar - Maringá, onde me formei no ano de 2019, e adivinhem justamente no ano que enfrentamos a pandemia. </p>
                  <p>Ser arquiteta é um compromisso com a criação de espaços que moldam experiências e influenciam comportamentos. É um caminho desafiador, mas totalmente satisfatório ao ver cada cliente se sentindo realizado ao entregar seu sonho em nossas mãos.</p>
                  <p>Para dizer o essencial, ser arquiteta é ser capaz de transformar sonhos em realidade palpável, impactando positivamente na vida das pessoas e ao nosso redor.</p>
                </div>
              </div>
              <div className="sm:w-[395px] md:h-[537px] p-4 relative flex justify-center sm:block">
                <img src="img/mais_branco.svg" className="absolute top-0 right-0 w-36 hidden md:flex" alt="" />
                <img src="img/Monica.jpg" className="md:absolute bottom-0 left-0 w-80 h-[450px] object-cover" alt="" />
              </div>
            </div>

          </div>
          <Button variant={"inverseTwo"} size={"lg"} onClick={handleClickViewAboutUs}>Saiba mais <HiArrowSmRight /></Button>
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-4 p-4 xl:px-32  ">
          {category.map((category) => (
            // @ts-ignore
            <div key={category.id} className="bg-[#9BA1D1] p-2 w-full md:h-full rounded-xl ">
              {/* @ts-ignore */}
              <Link to={`/serviços/projeto?id=${category.id}`}>
                <div className="border-2 border-[#F4E393] p-8 w-full h-full rounded-lg flex flex-col items-center gap-4">
                  <HiOutlineOfficeBuilding className="text-4xl md:text-8xl" />
                  {/* @ts-ignore */}
                  <h1 className="text-lg md:text-2xl text-center">{category.name}</h1>
                </div>
              </Link>
            </div>
          ))}
        </div>
        <Button className="px-12 flex items-center gap-2" variant={"inverseTwo"} size={"lg"} onClick={handleClickViewAllCateorys}>Saber mais <HiArrowSmRight /></Button>
        <div className="w-full p-4 mt-4 ">
          <div className="flex flex-col  items-start mt-4 z-30 ">
            <h1 className="uppercase text-[#2F2E59] font-bold text-4xl " style={{ fontFamily: "Adam, sans-serif" }}>
              Projetos
            </h1>
            <img src="img/separador-title-project.svg" className="mb-8" alt="" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 sm:h-64 md:px-32 gap-12">
            {projects.map((project, index) => (
              // @ts-ignore
              <div key={project.id} className="rounded-lg overflow-hidden flex flex-col text-center">
                <img
                  src={photoOne[index]}
                  className="w-full h-64 object-cover"
                  alt=""
                  loading="lazy"
                />
                <h1 className="text-xl text-primary">
                  {/* @ts-ignore */}
                  {project.name}
                </h1>
              </div>
            ))}
          </div>
        </div>
        <Button variant={"inverseTwo"} onClick={handleClickViewAllProjects} size={"lg"}>Ver todos <HiArrowSmRight /></Button>
        <div>
        </div>
      </div>
      <ContactScreen />
      <Footer />
    </div>
  );
};