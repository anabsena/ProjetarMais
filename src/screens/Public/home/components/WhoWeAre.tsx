import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { HiArrowSmRight } from "react-icons/hi";

const WhoWeAre = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col">
      <div className="w-full sm:h-56 relative flex justify-center ">
        <img
          src="img/top-sobre-nos.svg"
          className="w-full object-cover absolute z-10"
          alt=""
        />
        <div className="flex flex-col items-center z-30">
          <h1
            className="uppercase text-[#27264D] font-bold text-4xl mt-12 sm:mt-24"
            style={{ fontFamily: "Adam, sans-serif" }}
          >
            Quem somos
          </h1>
          <img src="img/separador-title.svg" alt="" />
        </div>
      </div>
      <div className="w-full  bg-[#9BA1D1] flex flex-col items-center justify-center relative sm:gap-12 pb-8">
        <img
          src="img/Icon-project.svg"
          className=" z-30 absolute top-0 right-0 hidden md:flex"
          alt=""
        />
        <img
          src="img/Icon-planta.svg"
          className=" z-30 absolute bottom-2 left-8 hidden md:flex"
          alt=""
        />
        <img
          src="img/Detalhes.svg"
          className=" z-30 absolute hidden w-56 -mt-12 md:flex"
          alt=""
        />
        <div className="h-full z-30 text-black flex flex-col mt-8 sm:mt-0 items-center  justify-center">
          <div className="flex items-center w-full gap-4 flex-col-reverse justify-center md:flex-row">
            <div className="sm:w-[410px] md:h-[537px] p-4 relative flex justify-center md:block">
              <img
                src="/img/mais_azul.svg"
                className="absolute top-0 -left-16 w-36 hidden md:flex"
                alt=""
              />
              <img
                src="/img/Andressa.webp"
                className="md:absolute bottom-0 right-0 w-96 h-[450px] object-cover"
                alt=""
              />
            </div>
            <div className="sm:w-[395px] p-4">
              <h1 style={{ fontFamily: "Alice", fontSize: "36px" }}>
                Andressa Belo
              </h1>
              <div className="flex flex-col gap-2 text-sm text-justify">
                <p>
                  Me chamo Andressa Belo, sou formada em Arquitetura e Urbanismo
                  pela Universidade Unicesumar de Maringá no ano de 2021.
                </p>
                <p>
                  O interesse pela arte sempre esteve presente na minha vida,
                  sou apaixonada pela arquitetura e procuro demonstrar isso nos
                  projetos que realizo. Essa arte envolve criar, transformar
                  espaços e entender as necessidades e os gostos de cada pessoa
                  que vai morar ou trabalhar naquele espaço e assegurar que tudo
                  aconteça exatamente como desejado.
                </p>
                <p>
                  Eu escolhi a arquitetura porque sei da importância que ela tem
                  para a vida das pessoas e para a sociedade, é grandioso e
                  fascinante mergulhar nos sonhos dos outros e poder
                  transformá-los em realidade, participar dessa materialização é
                  gratificante
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center md:-mt-20   flex-col justify-center md:flex-row">
            <div className="sm:w-[400px] p-4">
              <h1 style={{ fontFamily: "Alice", fontSize: "36px" }}>
                Monica Goes
              </h1>
              <div className="flex flex-col gap-2 text-sm text-justify pr-6">
                <p>
                  Me chamo Mônica Goes, sou Arquiteta e Urbanista, amo criar
                  ambientes personalizados para cada cliente, com muita atenção
                  aos detalhes que refletem sua essência.
                </p>
                <p>
                  Minha jornada começou na faculdade Unicesumar - Maringá, onde
                  me formei no ano de 2019, e adivinhem justamente no ano que
                  enfrentamos a pandemia.{" "}
                </p>
                <p>
                  Ser arquiteta é um compromisso com a criação de espaços que
                  moldam experiências e influenciam comportamentos. É um caminho
                  desafiador, mas totalmente satisfatório ao ver cada cliente se
                  sentindo realizado ao entregar seu sonho em nossas mãos.
                </p>
                <p>
                  Para dizer o essencial, ser arquiteta é ser capaz de
                  transformar sonhos em realidade palpável, impactando
                  positivamente na vida das pessoas e ao nosso redor.
                </p>
              </div>
            </div>
            <div className="sm:w-[395px] md:h-[537px] p-4 relative flex justify-center sm:block">
              <img
                src="img/mais_branco.svg"
                className="absolute top-0 -right-16 w-36 hidden md:flex"
                alt=""
              />
              <img
                src="img/Monica.webp"
                className="md:absolute bottom-0 left-0 w-96 h-[450px] object-cover"
                alt=""
              />
            </div>
          </div>
        </div>
        <Button
          variant={"inverseTwo"}
          size={"lg"}
          onClick={() => navigate("/sobre-nos")}
        >
          Saiba mais <HiArrowSmRight />
        </Button>
        <div></div>
      </div>
    </div>
  );
};

export default WhoWeAre;
