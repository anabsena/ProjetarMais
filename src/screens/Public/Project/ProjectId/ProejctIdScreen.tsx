import { useEffect, useState } from "react";
import useQuery from "../../../../hooks/useQuery";
import useProjectHook from "../../../../hooks/useProjectHook";
import { HiOutlineForward } from "react-icons/hi2";

const ProjectidScreen = () => {
    const [project, setProject] = useState()
    const query = useQuery()
    const projectId = query.get('id');
    const { projectControllerFindOne } = useProjectHook()

    useEffect(() => {
        console.log(projectId)
        const fecthProject = async () => {
            //@ts-ignore
            const response = await projectControllerFindOne(projectId)
            //@ts-ignore
            setProject(response.data)
            console.log('project', response.data)
        }
        fecthProject()
    }, [])
    const renderSpecificDetails = (details: string) => {
        if (!details) return null; 

        const topics = details.split('|').map((topic, index) => (
            <div key={index} className="mb-4 flex items-center gap-1">
                <HiOutlineForward className="text-[#EDD253]"/> <h3 className=" ">{topic.trim()}</h3>
            </div>
        ));

        return <div className=" text-start " style={{ fontFamily: "Mulish, sans-serif" }}>
           {topics}
        </div>;
    }
    return (
        <div className="flex flex-col items-center mb-4">
            <img src="/img/icon-arq.svg" className="absolute top-28 right-0" alt="" />
            <div className="flex flex-col w-full items-start mt-28 lg:my-8 z-30 ">
                <h1 className="uppercase text-[#2F2E59] text-4xl px-4" style={{ fontFamily: "Mulish, sans-serif" }}>
                    {/* @ts-ignore */}
                    {project?.name}
                </h1>
                <img src="/img/separador-title-project.svg" alt="" className="" />
            </div>
            <div className="w-full grid grid-cols-2 gap-8   text-center text-[#08081A] p-4" style={{ fontFamily: "Mulish, sans-serif" }}>
                {/* @ts-ignore */}
                <div className="flex flex-col"><h1 className="text-xl w-full text-start flex items-center gap-2 uppercase font-bold mb-4"><img src="/img/mais_azul.svg" className="w-4 h-4" alt="" />Descrição</h1><span>{project?.description}</span></div>
                {/* @ts-ignore */}
                <div> <h1 className="text-xl w-full text-start flex items-center gap-2 uppercase font-bold mb-4"><img src="/img/mais_azul.svg" className="w-4 h-4" alt="" />Detalhes Técnicos</h1> <span>{renderSpecificDetails(project?.especificDetails)}</span></div>
            </div>
            <div className="grid grid-cols-4">
{/* @ts-ignore */}
            {project?.ProjectPhotos.map((photo)=>{
                const buffer = new Uint8Array(photo.photos.data);
                const blob = new Blob([buffer], { type: 'image/png' });
                const url = URL.createObjectURL(blob);
                return(
                <div className="rounded-xl h-64">
                    <img src={url} alt="" className="w-full h-full rounded-xl" />
                </div>
                )
            })}
            </div>
        </div>
    )
}
export default ProjectidScreen