
import Footer from "../../../components/Footer"
import HeaderHome from "../../../components/HeaderHome"
import AboutUsScreen from "./AboutUseScreen"

const AboutUs = () => {
    return (
        <div className=" bg-[#F2F4FF]">
            <div className="w-full relative min-h-screen overflow-hidden ">
                <div className="  lg:bg-[#9BA1D1]/40  lg:w-full lg:h-36">

                    <HeaderHome />
                </div>
                <AboutUsScreen />
                <Footer />
            </div>

        </div>
    )
}
export default AboutUs