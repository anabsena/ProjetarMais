import { useEffect, useState } from "react";
import useCategoryHook from "../../../../hooks/useCategoryHook";
import LoadingSpinner from "../../../../components/loading";
import { Button } from "../../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { HiArrowSmRight } from "react-icons/hi";


const ProjectCategoryScreen = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [photoUrls, setPhotoUrls] = useState<(string | null)[]>([]);
  const [hoverProjectId, setHoverProjectId] = useState<string | null>(null);
  const query = new URLSearchParams(window.location.search);
  const { categoryControllerFindOne } = useCategoryHook();
  const navigate = useNavigate();
  const categoryId = query.get('id');
  const clipPathStyle = { clipPath: 'polygon(0% 0%, 100% 100%, 80% 100%, 0% 100%)' };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await categoryControllerFindOne(categoryId);
        if (response.status === 200) {
          setProjects(response.data.Project); // Alterado para Projects
          console.log('projetos', response.data.Project);
          const urls = await Promise.all(
            response.data.Project.map(async (photo) => {
                const photoFirst = photo.ProjectPhotos[0]?.photos?.data;
                if (!photoFirst) return null;
                const buffer = new Uint8Array(photoFirst);
                const blob = new Blob([buffer], { type: 'image/png' });
                const url = URL.createObjectURL(blob);
                return url;
            })
        );

        setPhotoUrls(urls);
          setIsLoading(false);
        } else {
          console.error("Error fetching projects:", response.message);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };
    if (categoryId) {
      fetchProjects();
    }
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  const handleClickViewProject = (projectId: string) => {
    navigate(`/projetos/projeto?id=${projectId}`);
};
  return (
    <div className="container mx-auto p-4">
       <div className="flex flex-col w-full items-start mt-28 lg:my-8 z-30 ">
                <h1 className="uppercase text-[#2F2E59] text-4xl px-4" style={{ fontFamily: "Mulish, sans-serif" }}>
                    Projetos da categoria
                </h1>
                <img src="/img/separador-title-project.svg" alt="" />
            </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 h-auto md:px-32 px-4 gap-12 flex-grow">
        {projects.map((project, index) => (
          <div className="relative" key={project.id}
          onMouseEnter={() => setHoverProjectId(project.id)}
          onMouseLeave={() => setHoverProjectId(null)}>
            <div className="rounded-lg">
             {photoUrls[index] ? (
                                <img
                                    src={photoUrls[index]}
                                    className='w-full h-64 object-cover rounded-xl'
                                    alt=""
                                    loading="lazy"
                                />
                              ) : (
                                <div className="w-full h-64 bg-gray-200"></div>
                            )}
                            </div>
                            {hoverProjectId === project.id && (
                            <div className="absolute top-0 left-0 bg-[#9BA1D1] bg-opacity-90 text-white p-2 w-full h-full rounded-lg flex flex-col justify-end items-start gap-4"
                                style={{ ...clipPathStyle, fontFamily: "Mulish, sans-serif" }}>
                                <span className="w-1/2 text-lg"> {project.name}</span>
                                <Button variant={"inverseTwo"} className="mb-4" onClick={() => handleClickViewProject(project.id)}>Ver mais<HiArrowSmRight /></Button>
                            </div>
                        )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCategoryScreen;
