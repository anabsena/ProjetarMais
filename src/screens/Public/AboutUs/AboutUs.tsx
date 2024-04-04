
import Footer from "../../../components/Footer"
import HeaderHome from "../../../components/HeaderHome"
import AboutUsScreen from "./AboutUseScreen"

const AboutUs = () => {
    return (
        <div className=" bg-[#F2F4FF]">
            <div className="w-full relative min-h-screen overflow-hidden ">
                <div className="   lg:bg-[#545C99]  lg:w-full lg:h-28">

                    <HeaderHome />
                </div>
                <AboutUsScreen />
                <Footer />
            </div>

        </div>
    )
}
export default AboutUs