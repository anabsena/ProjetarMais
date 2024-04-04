import Footer from "../../../components/Footer"
import HeaderHome from "../../../components/HeaderHome"
import { ProjectAllScreen } from "./ProjectAllScreen"


const ProjectAll = () => {
  return (
    <div className="bg-[#F2F4FF] h-[100vh]">
      <div className=" lg:bg-[#545C99]  lg:w-full lg:h-28">
        <HeaderHome />
      </div>
      <ProjectAllScreen />
      <div className="absolute bottom-0 w-full">
        <Footer />
      </div>
      

    </div>
  )
}

export default ProjectAll