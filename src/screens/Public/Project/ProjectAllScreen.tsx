import { useEffect, useState } from "react";
import useProjectHook from "../../../hooks/useProjectHook";
import { Button } from "../../../components/ui/button";
import { HiArrowSmRight, HiSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../components/loading";
import { BASE_IMAGE_URL } from "../../../constants/app.constant";

interface Projects {
  id: string;
  name: string;
  details: string;
  description: string;
  ProjectPhotos: { photoUrl: string }[];
}

const ProjectAllScreen = () => {
  const { projectControllerFindAll } = useProjectHook();

  const [projects, setProjects] = useState<Projects[]>([]);
  const [hoverProjectId, setHoverProjectId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const clipPathStyle = { clipPath: 'polygon(0% 0%, 100% 100%, 80% 100%, 0% 100%)' };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectControllerFindAll('', '', '', 1, 10);
        if (response.status === 200) {
          const mappedProjects: Projects[] = response.data.data.map((project: Projects) => ({
            ...project,
            details: '',
          }));

          setProjects(mappedProjects);
          setIsLoading(false);
        } else {
          console.error("Error fetching projects:", response.message);
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
        setIsLoading(false);
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

  const handleClickViewProject = (projectId: string) => {
    navigate(`/projetos/projeto?id=${projectId}`);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex flex-col mb-4">
      <img src="img/icon-arq.svg" className="absolute top-28 right-0 hidden sm:flex" alt="Icon" />
      <div className="flex flex-col w-full items-start mt-28 lg:my-8 z-30">
        <h1 className="uppercase text-[#2F2E59] text-4xl px-4" style={{ fontFamily: "Mulish, sans-serif" }}>
          Projetos
        </h1>
        <img src="img/separador-title-project.svg" alt="Separador" className="z-10" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 h-auto px-4 gap-12 md:px-32 flex-grow">
        <div className="flex items-center gap-2 lg:col-span-3 2xl:col-span-4 justify-end mb-4 z-50">
          <input
            type="text"
            placeholder="Pesquisar"
            value={searchTerm}
            onChange={handleSearchChange}
            className="p-2 border bg-transparent border-secondary text-secondary rounded-xl focus:outline-none"
          />
          <HiSearch className="text-primary text-3xl" />
        </div>
        {currentProjects.length === 0 ? (
          <div className="text-center text-primary mt-4" style={{ fontFamily: "Mulish, sans-serif" }}>
            Nenhum projeto encontrado
          </div>
        ) : (
          currentProjects.map((project) => {
            const projectPhoto = project.ProjectPhotos[0]?.photoUrl ? BASE_IMAGE_URL + project.ProjectPhotos[0].photoUrl : null;

            return (
              <div className="relative" key={project.id}
                onMouseEnter={() => setHoverProjectId(project.id)}
                onMouseLeave={() => setHoverProjectId(null)}>
                <div className="rounded-lg overflow-hidden">
                  {projectPhoto ? (
                    <img
                      src={projectPhoto}
                      className='w-full h-64 object-cover rounded-t-xl'
                      alt={project.name}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-200 rounded-t-xl"></div>
                  )}
                </div>
                <div className="">
                  <h2 className="text-xl text-center text-primary pt-4" style={{ fontFamily: "Mulish, sans-serif" }}>{project.name}</h2>
                </div>
                {hoverProjectId === project.id && (
                  <div className="absolute top-0 left-0 w-full h-64 bg-[#9BA1D1] rounded-lg bg-opacity-90 text-white p-2 flex flex-col justify-end items-start gap-4"
                    style={{ ...clipPathStyle, fontFamily: "Mulish, sans-serif" }}>
                    <Button variant={"inverseTwo"} className="mb-4" onClick={() => handleClickViewProject(project.id)}>
                      Ver mais <HiArrowSmRight />
                    </Button>
                  </div>
                )}
              </div>
            );
          })
        )}
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
