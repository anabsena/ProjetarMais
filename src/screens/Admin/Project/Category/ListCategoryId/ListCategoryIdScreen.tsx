import { useEffect, useState } from "react";
import useCategoryHook from "../../../../../hooks/useCategoryHook";
import { HiOutlineDotsVertical, HiOutlinePhotograph, HiOutlinePlus, HiOutlineXCircle, HiSearch } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../../components/ui/button";
import LoadingSpinner from "../../../../../components/loading";
import useProjectHook from "../../../../../hooks/useProjectHook";
import usePhotoHook from "../../../../../hooks/usePhotoHook";

const ListCategoryIdScreen = () => {
  const { categoryControllerFindOne } = useCategoryHook();
  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const {  projectControllerDelete, projectControllerFindOne } = useProjectHook();
  const { photoControllerDelete } = usePhotoHook()

  const query = new URLSearchParams(window.location.search);
  const categoryId = query.get('id');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        if (categoryId) {
          const response = await categoryControllerFindOne(categoryId);
          if (response.status === 200) {
            //@ts-ignore
            setProjects(response.data.Project);
            setLoading(false);
          } else {
            console.error("Error fetching projects:", response.message);
          }
        }
      } catch (error) {
        console.error(error);

      }
    };
    fetchProjects();
  }, [categoryId]);

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenModal = (project: any) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setShowModal(false);
  };

  if (loading) {
    return <LoadingSpinner />;
  }
  const handleDeleteProject = async (projectId: string) => {
    const project = await projectControllerFindOne(projectId);
    //@ts-ignore
    const imagesIds = project.data.ProjectPhotos.map(imagesId => imagesId.id)
    try {
      if (imagesIds && imagesIds.length > 0) {
        await Promise.all(imagesIds.map(async (image: any) => {
          const imageDeleteResponse = await photoControllerDelete(image);
          if (imageDeleteResponse.status !== 200) {
            console.error("Error deleting image:", imageDeleteResponse.message);
          }
        }));
      }

      const projectDeleteResponse = await projectControllerDelete(projectId);
      if (projectDeleteResponse.status === 200) {
        //@ts-ignore
        setProjects(projects.filter((project) => project.id !== projectId));
      } else {
        console.error("Error deleting project:", projectDeleteResponse.message);
      }
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center p-8">
      <h1 style={{ fontFamily: "Adam, sans-serif" }} className="text-3xl text-[#545C99] font-bold uppercase">
        Projetos da Categoria
      </h1>
      <div className="flex items-center gap-2 w-full justify-end">
        <Button onClick={() => navigate(`/new-project?categoryId=${categoryId}`)}><HiOutlinePlus />Novo projeto</Button>
        <input
          type="text"
          placeholder="Pesquisar"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 bg-transparent border border-secondary text-secondary rounded-xl focus:outline-none"
        />
        <HiSearch className="text-primary text-3xl" />
      </div>
      {projects.map((project) => (
        //@ts-ignore
        <div key={project.id} className="bg-gradient-to-r cursor-pointer from-[#636BA6] to-[#1E1D40] w-full rounded-xl p-4 flex gap-4 mt-4 items-center justify-between">
          <div className="flex gap-4 ">
            <HiOutlinePhotograph className="text-6xl text-[#D9B341]" />
            <div>
              <h1 className="text-xl text-[#F2F4FF] font-bold" style={{ fontFamily: "Adam, sans-serif" }}>
                {/* @ts-ignore */}
                Nome: {project.name}
              </h1>
              <h1 className="text-md text-[#F2F4FF]" style={{ fontFamily: "Mulish, sans-serif" }}>
                {/* @ts-ignore */}
                Descrição: {project.description}
              </h1>
            </div>
          </div>
          <div className="relative">
            <HiOutlineDotsVertical
              className="text-4xl text-[#EDD253] cursor-pointer"
              onClick={() => {
                {/* @ts-ignore */ }
                if (showModal && selectedProject && selectedProject.id === project.id) {
                  handleCloseModal();
                } else {
                  handleOpenModal(project);
                }
              }}
            />
            {/* @ts-ignore */}
            {showModal && selectedProject && selectedProject.id === project.id && (
              <div className="absolute right-0 mt-2 w-48 bg-[#1E1D40] rounded-xl shadow-lg z-10 border border-[#D9B341]">
                <div className="flex flex-col gap-4 p-2">
                  {/* @ts-ignore */}
                  <h1 className="flex gap-2 items-center" onClick={() => handleDeleteProject(project.id)}><HiOutlineXCircle className="text-xl text-[#D9B341]" />Excluir</h1>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListCategoryIdScreen;
