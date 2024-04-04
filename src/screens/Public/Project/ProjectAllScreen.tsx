import { useEffect, useState } from "react";
import useProjectHook from "../../../hooks/useProjectHook";

export const ProjectAllScreen = () => {
    const [projects, setProjects] = useState([]);
    const [photoOne, setPhotoOne] = useState<string[]>([]);
    const [hoverProjectId, setHoverProjectId] = useState<string | null>(null);
    const { projectControllerFindAll } = useProjectHook();

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await projectControllerFindAll('', '', '', 1, 10);
                if (response.status === 200) {
                    setProjects(response.data.data);
                    const photoUrls = response.data.data.map((photo) => {
                        const photoFirst = photo.ProjectPhotos[0].photos.data;
                        const buffer = new Uint8Array(photoFirst);
                        const blob = new Blob([buffer], { type: 'image/png' });
                        const url = URL.createObjectURL(blob);
                        return url;
                    });
                    setPhotoOne(photoUrls);
                    console.log('projetos', response.data.data);
                } else {
                    console.error("Error fetching projects:", response.message);
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);

    return (
        <div>
            <div className="flex flex-col w-auto items-start mt-28 lg:my-8 z-30 ">
                <h1 className="uppercase text-[#2F2E59] text-4xl px-4" style={{ fontFamily: "Mulish, sans-serif" }}>
                    Projetos
                </h1>
                <img src="img/separador-title-project.svg" alt="" className="" />
            </div>
            <div>
                <div className="grid grid-cols-1 lg:grid-cols-4 h-48 md:px-32 gap-12">
                    {projects.map((project, index) => (
                        <div className="rounded-lg relative" key={project.id}
                             onMouseEnter={() => setHoverProjectId(project.id)}
                             onMouseLeave={() => setHoverProjectId(null)}>
                            <img
                                src={photoOne[index]}
                                className='w-full h-48 rounded-xl object-cover'
                                alt=""
                            />
                            {hoverProjectId === project.id && (
                                <div className="absolute inset-0 bg-[#9BA1D1] bg-opacity-90 text-white p-2 flex items-center justify-center">
                                    {project.name}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProjectAllScreen;