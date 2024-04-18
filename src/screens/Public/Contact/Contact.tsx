import Footer from "../../../components/Footer"
import HeaderHome from "../../../components/HeaderHome"
import ContactScreen from "./ContactScreen"


const Contact = () => {
  return (
    <div>
      <div className=" lg:bg-[#9BA1D1]/80  lg:w-full lg:h-36">
        <HeaderHome />
      </div>
        <ContactScreen />
      <Footer />

    </div>
  )
}

export default Contact