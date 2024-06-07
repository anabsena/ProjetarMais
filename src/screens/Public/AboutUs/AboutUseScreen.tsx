import LoadingSpinner from "../../../components/loading";
import { Button } from "../../../components/ui/button";
import { useEffect, useState } from "react";

const AboutUsScreen = () => {
    const [isLoading, setIsLoading] = useState(true);

    // Simula um carregamento inicial de 100ms
    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 100);

        return () => clearTimeout(timer);
    }, []);

    if (isLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="w-full flex flex-col justify-center items-center">
            <div className="flex flex-col w-auto items-center mt-28 lg:mt-4 z-30 ">
                <h1 className="uppercase text-[#2F2E59] font-bold text-4xl px-4" style={{ fontFamily: "Adam, sans-serif" }}>
                    Sobre nos
                </h1>
                <img src="img/separador-title.svg" alt="" className="" />
            </div>
            <img src="img/Inicio-sobre-nós.png" className="w-9/12 " alt="" />
            <div className="bg-[#CACEED] w-full md:h-[70vh] flex flex-col gap-4 lg:gap-0 items-start p-4 relative mt-8 text-[#2F2E59]">
                <img src="img/Logo.svg" className="absolute top-1 right-1 w-64 hidden lg:flex z-30" alt="" />
                <img src="img/icon-mais-duplo.svg" className="absolute bottom-1 left-1 w-64 hidden lg:flex z-30" alt="" />
                <h1 className="uppercase sm:text-5xl text-3xl font-bold text-center lg:text-start z-40" style={{ fontFamily: "Adam, sans-serif" }}>Muito prazer, <br className="hidden lg:flex" /> somos a projetar + arquitetura </h1>
                <div className="w-full flex justify-center h-full items-center" style={{ fontFamily: "Mulish, sans-serif" }}>
                    <p className="lg:w-1/2 text-center md:text-lg">Nós oferecemos um design personalizado e exclusivo, criando projetos únicos que refletem as necessidades e preferências individuais de cada cliente, resultando em espaços distintos e memoráveis. Além disso, adotamos uma abordagem multidisciplinar, integrando diversas áreas como arquitetura, design de interiores, paisagismo e engenharia para proporcionar soluções abrangentes e integradas aos nossos clientes. Priorizamos a experiência do cliente em todas as etapas do processo, garantindo sua satisfação desde o primeiro contato até a entrega final do projeto. Nosso compromisso com a qualidade e detalhamento é evidente em cada aspecto do projeto, assegurando excelência em todas as etapas, desde a concepção até a execução.</p>
                </div>
            </div>
            <div className=" w-full  flex   gap-32 items-center justify-center p-8 relative mt-8 text-[#2F2E59]">
                <img src="img/img-escritorio-meninas.jpg" className="w-96 hidden lg:flex rounded-xl" alt="" />
                <div className="flex flex-col justify-center  lg:text-start text-center w-full sm:w-96 gap-8">
                    <h1 className=" text-3xl font-normal" style={{ fontFamily: "Mulish, sans-serif" }}>Nossa parceria </h1>
                    <p className="sm:w-96" style={{ fontFamily: "Mulish, sans-serif" }}>Nos conhecemos em 2018 ainda na faculdade, mas não estudando juntas e sim através de uma carona de Maringá para Ivaiporã. Desde lá, fortalecemos nossa amizade e tivemos algumas experiências profissionais juntas, até encontrarmos um momento oportuno para ter o nosso escritório.</p>
                    <img src="/img/img-foto-meninas-reuniao.jpg" className="w-full md:w-auto rounded-xl" alt="" />
                </div>
                <img src="img/detalhe-lateral.svg" className="h-96 hidden lg:flex" alt="" />
            </div>
            <div className="flex">
                <img src="/img/img-foto-meninas.jpg" alt="" className="object-cover h-36 rounded-l-xl" />
                <img src="/img/img-foto-meninas-serias.jpg" alt="" className="object-cover h-36" />
                <img src="/img/img-meninas-obra-rindo.jpg" alt="" className="object-cover h-36" />
                <img src="/img/img-meninas-coque.jpg" alt="" className="object-cover h-36" />
                <img src="/img/img-meninas-obra-uniforme.jpg" alt="" className="object-cover h-36 rounded-r-xl" />
            </div>
            <div className="bg-[#CACEED] w-full  flex flex-col lg:flex-row gap-12 lg:gap-24 items-center justify-center p-4 relative mt-8 text-[#2F2E59]">
                <div className="flex flex-col gap-4 text-center lg:text-start">
                    <h1 className=" text-3xl font-normal" style={{ fontFamily: "Mulish, sans-serif" }}>Missão e valores</h1>
                    <p className="md:w-96" style={{ fontFamily: "Mulish, sans-serif" }}>Nosso propósito é transformar o seu sonho idealizado em uma arquitetura individualizada e especial, valorizando o conforto, o bem-estar, a funcionalidade e a estética, pois acreditamos que a arquitetura deve estar sempre em sintonia com esses princípios.</p>
                </div>
                <img src="img/img-meninas-obra-projeto.jpg" className="w-96 rounded-xl" alt="" />
                <img src="img/img-meninas-sorrindo-computador.jpg" className="w-96 rounded-xl" alt="" />
            </div>
            <div className="h-[50vh] w-full">
                <img src="img/img-pezinhos-obra.jpg" alt="" className="h-full w-full object-cover" />
            </div>
            <Button size={"lg"} className="mt-4 px-16 mb-8">Bora projetar?</Button>
        </div>
    )
}

export default AboutUsScreen;
