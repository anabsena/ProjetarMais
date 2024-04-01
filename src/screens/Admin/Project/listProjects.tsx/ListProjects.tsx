import { Header } from "../../../../components/Header"
import { Menu } from "../../../../components/Menu"
import ListProjectsScreen from "./ListProjectsScreen"

const ListProjects = () => {
    return(

        <div className="bg-[#F2F4FF]">
        <Header/>
        <div className="flex">
          <Menu/>
        <div className="h-[calc(100vh-4rem)] overflow-auto w-full">
          <ListProjectsScreen/>
        </div>
      </div>
      </div>
    )
}
export default ListProjects