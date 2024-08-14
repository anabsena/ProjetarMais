import { useEffect } from "react"
import useProjectHook from "../../../../hooks/useProjectHook"
import useQuery from "../../../../hooks/useQuery"

const ViewProjectScreen = () => {

    const { projectControllerFindOne } = useProjectHook()
    const query = useQuery()
    const projectId = query.get('id');
    useEffect(() => {
        const fecthProject = async () => {
            //@ts-ignore
            const response = await projectControllerFindOne(projectId)
        }
        fecthProject()
    }, [])
    return (
        <div>
            oi
        </div>
    )
}
export default ViewProjectScreen