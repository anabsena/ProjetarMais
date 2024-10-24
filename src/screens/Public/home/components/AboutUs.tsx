

const AboutUs = () => {
  return (
    <div>
       <div className="w-full md:min-h-screen xl:flex-row items-start xl:items-center justify-start xl:justify-center flex flex-col relative">
        <div className="flex flex-col w-full items-center xl:hidden mt-4">
          <h1 className="uppercase text-[#2F2E59] font-bold text-4xl " style={{ fontFamily: "Adam, sans-serif" }}>
            Sobre nos
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
    </div>
  )
}

export default AboutUs
