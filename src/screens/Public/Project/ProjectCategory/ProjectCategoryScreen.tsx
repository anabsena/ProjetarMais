import { useEffect, useState } from "react";
import useCategoryHook from "../../../../hooks/useCategoryHook";
import LoadingSpinner from "../../../../components/loading";


const ProjectCategoryScreen = () => {
  const [projects, setProjects] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [photoUrls, setPhotoUrls] = useState<(string | null)[]>([]);
  const query = new URLSearchParams(window.location.search);
  const { categoryControllerFindOne } = useCategoryHook();
  const categoryId = query.get('id');

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

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col w-auto items-center mt-28 lg:my-8  z-30 ">
        <h1 className="uppercase text-[#2F2E59]  text-4xl px-4" style={{ fontFamily: "Mulish, sans-serif" }}>
          Projetos da Categoria
        </h1>
        <img src="img/separador-title.svg" alt="" className="" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {projects.map((project, index) => (
          <div key={project.id} className="bg-white p-4 rounded shadow">
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
            <h2 className="text-xl font-semibold text-[#2F2E59] mb-2">{project.name}</h2>
            <p className="text-sm text-gray-600">{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectCategoryScreen;
