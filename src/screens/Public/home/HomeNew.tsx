import Footer from "../../../components/Footer"
import HeaderHome from "../../../components/HeaderHome"
import ContactScreen from "../Contact/ContactScreen"
import AboutUs from "./components/AboutUs"
import Services from "./components/Services"
import StartHome from "./components/Start"
import WhoWeAre from "./components/WhoWeAre"


const HomeNew = () => {
  return (
    <div className=" bg-[#F2F4FF]">
      <div className="w-full relative min-h-screen overflow-hidden">
        <HeaderHome />
        <StartHome/>
        <AboutUs/>
        <WhoWeAre/>
        <Services/>
        <ContactScreen />
        <Footer />
    </div>
    </div>
  )
}

export default HomeNew
