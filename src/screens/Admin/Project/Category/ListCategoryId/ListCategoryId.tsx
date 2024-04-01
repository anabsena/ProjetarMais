import { Header } from "../../../../../components/Header"
import { Menu } from "../../../../../components/Menu"
import ListCategoryIdScreen from "./ListCategoryIdScreen"


const ListCategoryId = ()=>{
    return(
        <div className="bg-[#F2F4FF]">
        <Header/>
        <div className="flex">
          <Menu/>
        <div className="h-[calc(100vh-4rem)] overflow-auto w-full">
          <ListCategoryIdScreen/>
        </div>
      </div>
      </div>
    )
}
export default ListCategoryId