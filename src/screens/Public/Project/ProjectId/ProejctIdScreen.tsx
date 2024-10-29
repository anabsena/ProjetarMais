import { useEffect, useState } from "react";
import useQuery from "../../../../hooks/useQuery";
import useProjectHook from "../../../../hooks/useProjectHook";
import { HiOutlineForward } from "react-icons/hi2";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import LazyLoad from 'react-lazyload';
import { BASE_IMAGE_URL } from "../../../../constants/app.constant";

const ProjectidScreen = () => {
    const [project, setProject] = useState<any>(null);
    const [photoUrls, setPhotoUrls] = useState<string[]>([]);
    const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
    const query = useQuery();
    const projectId = query.get('id');
    const { projectControllerFindOne } = useProjectHook();

    useEffect(() => {
        const fetchProject = async () => {
            try {
                //@ts-ignore
                const response = await projectControllerFindOne(projectId);
                setProject(response.data);
                //@ts-ignore
                const projectPhotos = response.data.ProjectPhotos || [];
                const urls = projectPhotos.map((photo: any) => BASE_IMAGE_URL + photo.photoUrl);
                setPhotoUrls(urls);
            } catch (error) {
                console.error("Error fetching project:", error);
            }
        };
        // Rolar para o topo da página
        window.scrollTo(0, 0);
        fetchProject();
    }, [projectId]); // Adicionando projectId como dependência para garantir que o efeito seja executado corretamente quando o ID do projeto mudar

    const renderSpecificDetails = (details: string) => {
        if (!details) return null;

        const topics = details.split('|').map((topic, index) => (
            <div key={index} className="mb-4 flex items-center gap-1">
                <HiOutlineForward className="text-[#EDD253]" /> <h3 className="">{topic.trim()}</h3>
            </div>
        ));

        return <div className="text-start" style={{ fontFamily: "Mulish, sans-serif" }}>
            {topics}
        </div>;
    };

    const handleImageClick = (index: number) => {
        setSelectedImageIndex(index);
    };

    const handleCloseModal = () => {
        setSelectedImageIndex(null);
    };

    const handlePrevImage = () => {
        if (selectedImageIndex !== null) {
            //@ts-ignore
            setSelectedImageIndex((prevIndex) => (prevIndex === 0 ? photoUrls.length - 1 : prevIndex - 1));
        }
    };

    const handleNextImage = () => {
        if (selectedImageIndex !== null) {
            //@ts-ignore
            setSelectedImageIndex((prevIndex) => (prevIndex === photoUrls.length - 1 ? 0 : prevIndex + 1));
        }
    };

    return (
        <div className="flex flex-col items-center mb-4 min-h-[100vh]">
            <img src="/img/icon-arq.svg" className="absolute top-28 right-0 hidden lg:block" alt="Icon" />
            <div className="flex flex-col w-full items-start mt-24 lg:my-8 z-30 px-4">
                <h1 className="uppercase text-[#2F2E59] text-3xl flex-wrap" 
                    style={{ fontFamily: "Mulish, sans-serif", wordBreak: "break-word", overflow: "hidden", whiteSpace: "normal" }}>
                    {project?.name || ''}
                </h1>
                <img src="/img/separador-title-project.svg" alt="Separador" className="" />
            </div>
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 text-center text-[#08081A] p-4" style={{ fontFamily: "Mulish, sans-serif" }}>
                <div>
                    <h1 className="text-xl w-full text-start flex items-center gap-2 uppercase font-bold mb-4">
                        <img src="/img/mais_azul.svg" className="w-4 h-4" alt="Mais" />Detalhes Técnicos
                    </h1>
                    <span>{renderSpecificDetails(project?.especificDetails || '')}</span>
                </div>
            </div>
            <div className="flex flex-wrap justify-center gap-2 xl:px-64 p-8">
                {photoUrls.map((url, index) => (
                    <LazyLoad key={index} height={200} offset={100} once>
                        <div className="rounded-lg h-64 cursor-pointer w-full" onClick={() => handleImageClick(index)}>
                            <img
                                src={url}
                                alt={`Project photo ${index + 1}`}
                                className="w-full h-full rounded-lg object-cover"
                                loading="lazy"
                            />
                        </div>
                    </LazyLoad>
                ))}
            </div>
            {selectedImageIndex !== null && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="relative md:max-w-[40%] md:h-max-[40%] mx-auto rounded-lg shadow-lg">
                        <button onClick={handleCloseModal} className="absolute right-2 -top-8 md:-right-4 text-white text-3xl font-bold">×</button>
                        <button onClick={handlePrevImage} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white text-3xl font-bold">
                            <IoChevronBack />
                        </button>
                        <img src={photoUrls[selectedImageIndex]} alt="Selected" className="w-full h-full px-8 md:px-0 rounded-lg" />
                        <button onClick={handleNextImage} className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white text-3xl font-bold">
                            <IoChevronForward />
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectidScreen;
