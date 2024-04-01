import { Header } from "../../../../components/Header"
import { Menu } from "../../../../components/Menu"
import NewUserScreen from "./NewUserScreen"

const NewUser = () => {
    return(

        <div className="bg-[#F2F4FF]">
        <Header/>
        <div className="flex">
          <Menu/>
        <div className="h-[calc(100vh-4rem)] overflow-auto w-full">
          <NewUserScreen/>
        </div>
      </div>
      </div>
    )
}
export default NewUser