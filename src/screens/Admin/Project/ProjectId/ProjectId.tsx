
import { Header } from "../../../../components/Header"
import { Menu } from "../../../../components/Menu"
import ProjectidAdminScreen from "./ProejctIdScreen"

const ProjectIdAdmin = () => {

  return (

    <div className="bg-[#F2F4FF]">
        <Header/>
        <div className="flex">
          <Menu/>
        <div className="h-[calc(100vh-4rem)] overflow-auto w-full">
          <ProjectidAdminScreen/>
        </div>
      </div>
      </div>
  )
}
export default ProjectIdAdmin