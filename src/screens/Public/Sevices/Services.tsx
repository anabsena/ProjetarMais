import Footer from "../../../components/Footer"
import HeaderHome from "../../../components/HeaderHome"
import ServicesScreen from "./ServicesScreen"


const Services = () => {
  return (
    <div className="bg-[#F2F4FF]">
      <div className=" lg:bg-[#545C99]  lg:w-full lg:h-28">
        <HeaderHome />
      </div>
      <ServicesScreen />
      <Footer />

    </div>
  )
}

export default Services