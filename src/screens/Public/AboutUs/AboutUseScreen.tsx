import { Button } from "../../../components/ui/button"

const AboutUsScreen = () => {
    return (
        <div className="w-full flex flex-col justify-center items-center">

            <div className="flex flex-col w-auto items-center mt-28 z-30 ">
                <h1 className="uppercase text-[#2F2E59] font-bold text-4xl px-4" style={{ fontFamily: "Adam, sans-serif" }}>
                    Sobre nos
                </h1>
                <img src="img/separador-title.svg" alt="" className="" />
            </div>
            <img src="img/Img-escritorio.png" className="w-10/12 " alt="" />
            <div className="bg-[#CACEED] w-full h-[70vh] flex flex-col  gap-24 items-start p-4 relative mt-8 text-[#2F2E59]">

                <img src="img/Logo.png" className="absolute top-1 right-1 w-64" alt="" />
                <img src="img/icon-mais-duplo.svg" className="absolute bottom-1 left-1 w-64" alt="" />
                <h1 className="uppercase text-5xl font-bold" style={{ fontFamily: "Adam, sans-serif" }}>Muito prazer, <br /> somos a projetar + arquitetura </h1>
                <div className="w-full flex justify-center" style={{ fontFamily: "Mulish, sans-serif" }}>

                    <p className="w-96 text-center">There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour</p>
                </div>
            </div>
            <div className=" w-full  flex   gap-32 items-center justify-center p-8 relative mt-8 text-[#2F2E59]">
                <img src="img/img-escritorio-meninas.jpg" className="w-96" alt="" />
                <div className="flex flex-col w-96 gap-8">
                    <h1 className=" text-3xl font-normal" style={{ fontFamily: "Mulish, sans-serif" }}>Nossa parceria </h1>
                    <p className="w-96" style={{ fontFamily: "Mulish, sans-serif" }}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour
                        There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour</p>
                    <img src="img/img-foto-meninas.jpg" className="" alt="" />
                </div>
<img src="img/detalhe-lateral.svg" className="h-96" alt="" />
                
            </div>
            <div className="bg-[#CACEED] w-full h-[70vh] flex   gap-24 items-center justify-center p-4 relative mt-8 text-[#2F2E59]">
                <div className="flex flex-col gap-4">

<h1 className=" text-3xl font-normal" style={{ fontFamily: "Mulish, sans-serif" }}>Missão e valores</h1>
<p className="w-96" style={{ fontFamily: "Mulish, sans-serif" }}>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour
There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour</p>
                </div>
                <img src="img/img-foto-meninas2.jpg" className="w-96" alt="" />
            </div>
            <Button size={"lg"} className="mt-4 px-16 mb-8">Bora projetar?</Button>
        </div>

    )
}
export default AboutUsScreen