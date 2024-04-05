import { useEffect, useState } from "react";
import useProjectHook from "../../../hooks/useProjectHook";
import { Button } from "../../../components/ui/button";
import { HiArrowSmRight, HiSearch } from "react-icons/hi";

interface Projects {
    id: string;
    name: string;
    details: string;
    description: string;
}

export const ProjectAllScreen = () => {
    const { projectControllerFindAll } = useProjectHook();

    const [projects, setProjects] = useState<Projects[]>([]);
    const [photoOne, setPhotoOne] = useState<string[]>([]);
    const [hoverProjectId, setHoverProjectId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [projectsPerPage] = useState(10);

    const clipPathStyle = { clipPath: 'polygon(0% 0%, 100% 100%, 80% 100%, 0% 100%)' };

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await projectControllerFindAll('', '', '', 1, 10);
                if (response.status === 200) {
                    //@ts-ignore
                    const mappedProjects = response.data.data.map((project) => ({
                        ...project,
                        details: '',  // Defina a propriedade 'details' conforme necessário
                    }));

                    setProjects(mappedProjects);
                    //@ts-ignore
                    const photoUrls = response.data.data.map((photo) => {
                        //@ts-ignore
                        const photoFirst = photo.ProjectPhotos[0].photos.data;
                        const buffer = new Uint8Array(photoFirst);
                        const blob = new Blob([buffer], { type: 'image/png' });
                        const url = URL.createObjectURL(blob);
                        return url;
                    });

                    setPhotoOne(photoUrls);
                    console.log('projetos', mappedProjects);
                } else {
                    console.error("Error fetching projects:", response.message);
                }
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };

        fetchProjects();
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    const paginate = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    const filteredProjects = projects.filter(project =>
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const indexOfLastProject = currentPage * projectsPerPage;
    const indexOfFirstProject = indexOfLastProject - projectsPerPage;
    const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
    const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

    return (
        <div className="flex flex-col items-center mb-4">
            <div className="flex flex-col w-full items-start mt-28 lg:my-8 z-30 ">
                <h1 className="uppercase text-[#2F2E59] text-4xl px-4" style={{ fontFamily: "Mulish, sans-serif" }}>
                    Projetos
                </h1>
                <img src="img/separador-title-project.svg" alt="" className="" />
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 h-auto md:px-32 gap-12 flex-grow">
                <div className="flex items-center gap-2 lg:col-span-3 2xl:col-span-4 justify-end mb-4">
                    <input
                        type="text"
                        placeholder="Pesquisar"
                        value={searchTerm}
                        onChange={handleSearchChange}
                        className="p-2 bg-transparent border border-secondary text-secondary rounded-xl focus:outline-none"
                    />
                    <HiSearch className="text-primary text-3xl" />
                </div>
                {currentProjects.map((project, index) => (
                    <div className="relative" key={project.id}
                        onMouseEnter={() => setHoverProjectId(project.id)}
                        onMouseLeave={() => setHoverProjectId(null)}>
                        <div className="rounded-lg">
                            <img
                                src={photoOne[index]}
                                className='w-full h-64 object-cover'
                                alt=""
                            />
                        </div>
                        {hoverProjectId === project.id && (
                            <div className="absolute top-0 left-0 bg-[#9BA1D1] bg-opacity-90 text-white p-2 w-full h-full rounded-lg flex flex-col justify-end items-start gap-4"
                                style={{ ...clipPathStyle, fontFamily: "Mulish, sans-serif" }}>
                                <span className="w-1/2 text-lg"> {project.name}</span>
                                <Button variant={"inverseTwo"} className="mb-4">Ver mais<HiArrowSmRight /></Button>
                            </div>
                        )}
                    </div>
                ))}
            </div>
            
            {totalPages > 1 && (
                <div className="mt-4">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                            key={page}
                            onClick={() => paginate(page)}
                            className={`mx-1 p-2 rounded-md ${currentPage === page ? 'bg-[#636BA6] text-white' : 'bg-[#1E1D40] text-[#F2F4FF]'}`}
                        >
                            {page}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProjectAllScreen;
