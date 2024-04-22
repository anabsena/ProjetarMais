import React, { useEffect, useState } from "react";
import useCategoryHook from "../../../../../hooks/useCategoryHook";
import { HiOutlineDotsVertical, HiOutlinePencilAlt, HiOutlinePlus, HiOutlineTag, HiOutlineXCircle, HiSearch } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../../../components/ui/button";  // Importando o componente de LoadingSpinner
import { limitCharacter } from "../../../../../utils/limitCharacter";
import LoadingSpinner from "../../../../../components/loading";

const ListCategoryScreen = () => {
  const { categoryControllerFindAll } = useCategoryHook();

  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true); // Estado para controlar o carregamento
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryControllerFindAll('', 1, 10);
        if (response.status === 200) {
          setCategories(response.data.data);
          setLoading(false); // Definindo loading como false após carregar as categorias
        } else {
          console.error("Error fetching categories:", response.message);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleOpenModal = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
    setShowModal(false);
  };

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleClickNewCategory = () => {
    navigate('/new-category');
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      // Adicionar a lógica de deleção aqui
      handleCloseModal();
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);
  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

  if (loading) {
    return <LoadingSpinner />; // Exibir o spinner de carregamento se as categorias ainda estão sendo carregadas
  }

  return (
    <div className="w-full h-full flex flex-col items-center p-8">
      <h1 style={{ fontFamily: "Adam, sans-serif" }} className="text-3xl text-[#545C99] font-bold uppercase">
        Categorias
      </h1>
      <div className="flex items-center gap-2 w-full justify-end">
        <Button onClick={handleClickNewCategory}><HiOutlinePlus />Nova categoria</Button>
        <input
          type="text"
          placeholder="Pesquisar"
          value={searchTerm}
          onChange={handleSearchChange}
          className="p-2 bg-transparent border border-secondary text-secondary rounded-xl focus:outline-none"
        />
        <HiSearch className="text-primary text-3xl" />
      </div>
      {currentCategories.map((category) => (
        <div key={category.id} className="bg-gradient-to-r cursor-pointer from-[#B4B9E0] to-[#636BA6] w-full rounded-xl p-4 flex gap-4 mt-4 items-center justify-between z-10">
          <div className="flex gap-4 ">
            <HiOutlineTag className="text-6xl text-[#08081A]" />
            <div>
              <h1 className="text-xl text-secondary font-bold" style={{ fontFamily: "Adam, sans-serif" }}>
                Nome: {category.name}
              </h1>
              <h1 className="text-md text-secondary" style={{ fontFamily: "Mulish, sans-serif" }}>
                Descrição: {limitCharacter(category.description, 120)}
              </h1>
            </div>
          </div>
          <div className="relative z-50">
            <HiOutlineDotsVertical
              className="text-4xl text-[#EDD253] cursor-pointer z-50"
              onClick={() => {
                if (showModal && selectedCategory && selectedCategory.id === category.id) {
                  handleCloseModal();
                } else {
                  handleOpenModal(category);
                }
              }}
            />
            {showModal && selectedCategory && selectedCategory.id === category.id && (
              <div className="absolute right-0 mt-2 w-48 bg-[#1E1D40] rounded-xl shadow-lg z-50 border border-[#D9B341]">
                <div className="flex flex-col gap-4 p-2">
                  <Link to={`/update-category?id=${category.id}`}>
                    <h1 className="flex gap-2 items-center">
                      <HiOutlinePencilAlt className="text-xl text-[#D9B341]" />
                      Editar
                    </h1>
                  </Link>
                  <button onClick={() => handleDeleteCategory(category.id)} className="flex gap-2 items-center">
                    <HiOutlineXCircle className="text-xl text-[#D9B341]" />
                    Excluir
                  </button>
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
};

export default ListCategoryScreen;
