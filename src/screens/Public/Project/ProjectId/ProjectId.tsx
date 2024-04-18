import Footer from "../../../../components/Footer"
import HeaderHome from "../../../../components/HeaderHome"
import ProjectidScreen from "./ProejctIdScreen"

const ProjectId = () => {

  return (

    <div className="bg-[#F2F4FF]">
      <div className=" lg:bg-[#545C99]  lg:w-full lg:h-28">
        <HeaderHome />
      </div>
      <div className="min-h-[calc(100vh-0.5rem)] overflow-auto w-full">
        <ProjectidScreen />
      </div>
      <Footer />
    </div>
  )
}
export default ProjectId