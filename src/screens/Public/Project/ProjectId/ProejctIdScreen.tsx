import { useEffect, useState } from "react";
import useQuery from "../../../../hooks/useQuery";
import useProjectHook from "../../../../hooks/useProjectHook";
import { HiOutlineForward } from "react-icons/hi2";
import LazyLoad from 'react-lazyload';
import { BASE_IMAGE_URL } from "../../../../constants/app.constant";

const ProjectidScreen = () => {
    const [project, setProject] = useState<any>(null);
    const [photoUrls, setPhotoUrls] = useState<string[]>([]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
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
        fetchProject();
    }, []);


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


    const handleImageClick = (url: string) => {
        setSelectedImage(url);
    };

    const handleCloseModal = () => {
        setSelectedImage(null);
    };

   

    return (
        <div className="flex flex-col items-center mb-4 min-h-[100vh]">
            <img src="/img/icon-arq.svg" className="absolute top-28 right-0 hidden lg:block" alt="Icon" />
            <div className="flex flex-col w-full items-start mt-28 lg:my-8 z-30 px-4">
                <h1 className="uppercase text-[#2F2E59] text-4xl" style={{ fontFamily: "Mulish, sans-serif" }}>
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
            <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 h-auto px-4 md:px-32 gap-12 flex-grow">
                {photoUrls.map((url, index) => (
                    <LazyLoad key={index} height={200} offset={100} once>
                        <div className="rounded-xl h-64 cursor-pointer" onClick={() => handleImageClick(url)}>
                            <img
                                src={url}
                                alt={`Project photo ${index + 1}`}
                                className="w-full h-full rounded-xl object-cover"
                                loading="lazy"
                            />
                        </div>
                    </LazyLoad>
                ))}
            </div>
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
                    <div className="relative md:max-w-[40%] md:h-max-[40%] mx-auto rounded-lg shadow-lg">
                        <button onClick={handleCloseModal} className="absolute right-2 -top-8 md:-right-4 text-white text-3xl font-bold">×</button>
                        <img src={selectedImage} alt="Selected" className="w-full h-full px-8 md:px-0 rounded-lg" />
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectidScreen;
