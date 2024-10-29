import { useEffect, useState } from "react";
import useProjectHook from "../../../hooks/useProjectHook";
import { Button } from "../../../components/ui/button";
import useCategoryHook from "../../../hooks/useCategoryHook";
import {
  ResponseProjectDto,
} from "../../../services/api-back";
import { IoHomeOutline, IoSearchOutline } from "react-icons/io5";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { PiFlowerLotus } from "react-icons/pi";
import { HiArrowSmRight, HiOutlineOfficeBuilding } from "react-icons/hi";
import { BASE_IMAGE_URL } from "../../../constants/app.constant";
import {
  IoIosArrowDropleftCircle,
  IoIosArrowDroprightCircle,
} from "react-icons/io";
import { useNavigate } from "react-router-dom";
import useQuery from "../../../hooks/useQuery";

interface CategorysResponse {
  id: string;
  name: string;
  Project?: ResponseProjectDto[];
}
interface Filters {
  searchQuery: string;
  selectedCategory: string | null;
}

const ProjectAllNew = () => {
  const { projectControllerFindAll } = useProjectHook();
  const { categoryControllerFindAll, categoryControllerFindOne } =
    useCategoryHook();
  const [projects, setProjects] = useState<ResponseProjectDto[] | undefined>(
    []
  );
  const [categories, setCategories] = useState<CategorysResponse[] | undefined>(
    []
  );
  const [filters, setFilters] = useState<Filters>({
    searchQuery: "",
    selectedCategory: null,
  });
  const [pageInfo, setPageInfo] = useState({
    totalItems: 0,
    totalPages: 0,
    currentPage: 1,
    perPage: 12,
  });
  const navigate = useNavigate();
  const query = useQuery();
  const categoryId = query.get('id');
  const [typingTimeout, setTypingTimeout] = useState<null | ReturnType<typeof setTimeout>>(null);
  useEffect(() => {
    fetchCategories();
  }, []);
  useEffect(() => {
    if (categoryId) {
      setFilters((prev) => ({
        ...prev,
        selectedCategory: categoryId,
      }));
      setPageInfo((prev) => ({ ...prev, currentPage: 1 }));
    }
  }, [categoryId]);
  const fetchProjects = async () => {
    try {
      const { searchQuery, selectedCategory } = filters;
      const { perPage, currentPage } = pageInfo;
  
      let response;
      
      if (selectedCategory) {
        response = await categoryControllerFindOne(selectedCategory);
        // @ts-ignore
        setProjects(response.data?.Project || []);
      } else {
        response = await projectControllerFindAll(
          searchQuery,
          "",
          "",
          currentPage,
          perPage
        );
        // @ts-ignore
        const { data, pageInfo: responsePageInfo } = response.data;
        setProjects(data);
        setPageInfo((prev) => ({
          ...prev,
          totalItems: responsePageInfo.totalItems,
          totalPages: responsePageInfo.totalPages,
        }));
      }
    } catch (error) {
      console.error("Erro ao buscar projetos", error);
    }
  };
  

  const fetchCategories = async () => {
    try {
      const response = await categoryControllerFindAll("", 1, 10);
      if (response.status === 200) {
        setCategories(response.data?.data);
      }
    } catch (error) {
      console.error("Erro ao buscar categorias", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [pageInfo.currentPage, filters.selectedCategory]);

  const handleFilterChange = (e:any) => {
    const { value } = e.target;
    setFilters((prev) => ({ ...prev, searchQuery: value }));

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(
      setTimeout(() => {
        setPageInfo((prev) => ({ ...prev, currentPage: 1 }));
        fetchProjects();
      }, 1000)
    );
  };

  const handleCategoryClick = (categoryId: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedCategory: categoryId,
    }));
    setPageInfo((prev) => ({ ...prev, currentPage: 1 }));
    fetchProjects();
  };

  const handleClearFilters = () => {
    setFilters({ searchQuery: "", selectedCategory: null });
    setPageInfo((prev) => ({ ...prev, currentPage: 1 }));
    fetchProjects();
  };

  const handlePrevPage = () => {
    if (pageInfo.currentPage > 1) {
      setPageInfo((prev) => ({ ...prev, currentPage: prev.currentPage - 1 }));
    }
  };

  const handleNextPage = () => {
    if (pageInfo.currentPage < pageInfo.totalPages) {
      setPageInfo((prev) => ({ ...prev, currentPage: prev.currentPage + 1 }));
    }
  };
  const categoryIcons = {
    "Interiores Residencial": (
      <IoHomeOutline className="text-2xl transition-transform duration-300 hover:scale-150" />
    ),
    "Interiores comercial": (
      <HiOutlineBuildingOffice className="text-2xl transition-transform duration-300 hover:scale-150" />
    ),
    Paisagismo: (
      <PiFlowerLotus className="text-2xl transition-transform duration-300 hover:scale-150" />
    ),
    Comercial: (
      <HiOutlineOfficeBuilding className="text-2xl transition-transform duration-300 hover:scale-150" />
    ),
    Residencial: (
      <IoHomeOutline className="text-2xl transition-transform duration-300 hover:scale-150" />
    ),
  };

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <div className="flex flex-col w-full items-center lg:my-8 z-30">
        <h1
          className="uppercase text-[#2F2E59] text-4xl px-4"
          style={{ fontFamily: "Mulish, sans-serif" }}
        >
          Projetos
        </h1>
        <img src="img/separador-title.svg" alt="" className="mb-8" />
      </div>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex flex-wrap justify-center gap-2">
          <Button
            onClick={handleClearFilters}
            variant={filters.selectedCategory === null ? "default" : "link"}
            size={"lg"}
          >
            Todos
          </Button>
          {categories &&
            categories.map((category) => (
              <Button
                key={category.id}
                onClick={() => handleCategoryClick(category.id)}
                variant={
                  filters.selectedCategory === category.id ? "default" : "link"
                }
                size={"lg"}
                className="flex gap-2"
              >
                {/* @ts-ignore */}
                {categoryIcons[category.name] || (
                  <HiOutlineOfficeBuilding className="text-2xl transition-transform duration-300 hover:scale-150" />
                )}
                {category.name}
              </Button>
            ))}
        </div>
        <div className="w-full relative flex justify-end items-center">
          <input
            type="text"
            name="searchQuery"
            placeholder="Buscar por nome"
            value={filters.searchQuery}
            onChange={handleFilterChange}
            className="w-full p-2 rounded-lg bg-transparent text-secondary border border-gray-300 focus:border-transparent focus:ring-0"
          />
          <IoSearchOutline className="absolute text-gray-300 text-2xl right-2 " />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-center gap-2 xl:px-64 p-8">
        {projects &&
          projects.map((project) => {
            const projectPhoto = project.ProjectPhotos[0]?.photoUrl
              ? BASE_IMAGE_URL + project.ProjectPhotos[0].photoUrl
              : null;
            return (
              <div className="rounded-lg overflow-hidden relative" key={project.id}>
                <div className="rounded-lg overflow-hidden relative">
                  {projectPhoto ? (
                    <img
                      src={projectPhoto}
                      className="w-full h-64 object-cover"
                      alt={project.name}
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-64 bg-gray-200 "></div>
                  )}
                  <div className=" p-4 absolute inset-0 bg-gradient-to-t from-black to-transparent z-20 flex flex-col justify-end items-start opacity-0 hover:opacity-100 transition-opacity duration-300 text-start">
                    <h1 className="text-xl text-white">{project.name}</h1>
                    <Button
                      variant={"inverseTwo"}
                      onClick={() =>
                        navigate(`/projetos/projeto?id=${project.id}`)
                      }
                      className="mt-2"
                    >
                      Ver Projeto <HiArrowSmRight />
                    </Button>
                  </div>
                </div>
                <h2
                  className="text-lg text-center text-primary pt-4 "
                  style={{ fontFamily: "Mulish, sans-serif" }}
                >
                  {project.name}
                </h2>
              </div>
            );
          })}
      </div>

      <div className="flex justify-center items-center gap-2 pb-4">
        <IoIosArrowDropleftCircle
          className="text-secondary text-2xl"
          onClick={handlePrevPage}
        />

        <span className="text-secondary">
          {pageInfo.currentPage} de {pageInfo.totalPages}
        </span>

        <IoIosArrowDroprightCircle
          onClick={handleNextPage}
          className="text-secondary  text-2xl"
        />
      </div>
    </div>
  );
};

export default ProjectAllNew;
