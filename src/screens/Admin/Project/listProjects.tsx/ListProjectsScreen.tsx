import { useEffect, useState } from "react";
import useProjectHook from "../../../../hooks/useProjectHook";
import { HiOutlineArrowCircleRight, HiOutlineDotsVertical, HiOutlineOfficeBuilding, HiOutlinePencilAlt, HiOutlinePlus, HiOutlineXCircle, HiSearch } from "react-icons/hi";
import { Button } from "../../../../components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "../../../../components/loading";

const ListProjectsScreen = () => {
  const { projectControllerFindAll } = useProjectHook();

  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [projectsPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await projectControllerFindAll('', '', '', 1, 10);
        if (response.status === 200) {
          setProjects(response.data.data);
          setLoading(false); // Definindo loading como false após carregar os projetos
        } else {
          console.error("Error fetching projects:", response.message);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchProjects();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleOpenModal = (project) => {
    setSelectedProject(project);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
    setShowModal(false);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleClickNewProject = () => {
    navigate('/new-project');
  };

  const handleClickViewProject = (projectId) => {
    navigate(`/project?id=${projectId}`);
  };

  const handleDeleteProject = async (projectId) => {
    // Implement the delete logic here
  };

  const filteredProjects = projects.filter(project =>
    project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = filteredProjects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(filteredProjects.length / projectsPerPage);

  if (loading) {
    return <LoadingSpinner />; // Exibir o spinner de carregamento se os projetos ainda estão sendo carregados
  }

  return (
    <div className="w-full h-full flex flex-col items-center p-8">
      <h1 style={{ fontFamily: "Adam, sans-serif" }} className="text-3xl text-[#545C99] font-bold uppercase">
        Projetos Publicados
      </h1>
      <div className="flex items-center gap-2 w-full justify-end">
        <Button onClick={handleClickNewProject}><HiOutlinePlus />Novo projeto</Button>
        <input
          type="text"
          placeholder="Pesquisar"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 bg-transparent border border-secondary text-secondary rounded-xl focus:outline-none"
        />
        <HiSearch className="text-primary text-3xl" />
      </div>
      {currentProjects.map((project) => (
        <div key={project.id} className="bg-gradient-to-r cursor-pointer from-[#636BA6] to-[#1E1D40] w-full rounded-xl p-4 flex gap-4 mt-4 items-center justify-between">
          <div className="flex gap-4 ">
            <HiOutlineOfficeBuilding className="text-6xl text-[#D9B341]" />
            <div>
              <h1 className="text-xl text-[#F2F4FF] font-semibold" style={{ fontFamily: "Adam, sans-serif" }}>
                Nome: {project.name}
              </h1>
              <h1 className="text-md text-[#F2F4FF]" style={{ fontFamily: "Mulish, sans-serif" }}>
                Descrição: {project.description}
              </h1>
            </div>
          </div>
          <div className="relative">
            <HiOutlineDotsVertical
              className="text-4xl text-[#EDD253] cursor-pointer"
              onClick={() => {
                if (showModal && selectedProject && selectedProject.id === project.id) {
                  handleCloseModal();
                } else {
                  handleOpenModal(project);
                }
              }}
            />
            {showModal && selectedProject && selectedProject.id === project.id && (
              <div className="absolute right-0 mt-2 w-48 bg-[#1E1D40] rounded-xl shadow-lg z-10 border border-[#D9B341]">
                <div className="flex flex-col gap-4 p-2">
                <Link to={`/projetos/editProject?id=${project.id}`}><h1 className="flex gap-2 items-center" ><HiOutlinePencilAlt className="text-xl text-[#D9B341]" />Editar</h1></Link>
                  <h1 className="flex gap-2 items-center" onClick={() => handleDeleteProject(project.id)}><HiOutlineXCircle className="text-xl text-[#D9B341]" />Excluir</h1>
                  <Link to={`/projetos/projetoId?id=${project.id}`}><h1 className="flex gap-2 items-center" ><HiOutlineArrowCircleRight className="text-xl text-[#D9B341]" />Ver projeto</h1></Link>
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
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
}

export default ListProjectsScreen;
