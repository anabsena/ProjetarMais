import Footer from "../../../components/Footer"
import HeaderHome from "../../../components/HeaderHome"
import { ProjectAllScreen } from "./ProjectAllScreen"


const ProjectAll = () => {
  return (
    <div className="bg-[#F2F4FF] ">
    <div className=" lg:bg-[#545C99]  lg:w-full lg:h-28">
      <HeaderHome />
    </div>
    <ProjectAllScreen />
    <Footer />

  </div>
  )
}

export default ProjectAll