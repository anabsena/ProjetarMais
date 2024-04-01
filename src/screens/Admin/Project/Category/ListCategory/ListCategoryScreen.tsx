import { useEffect, useState } from "react";
import useCategoryHook from "../../../../../hooks/useCategoryHook";
import { HiOutlineDotsVertical, HiOutlinePencilAlt, HiOutlinePhotograph, HiOutlinePlus, HiOutlineTag, HiOutlineXCircle, HiSearch } from "react-icons/hi";

import { useNavigate } from "react-router-dom";
import { Button } from "../../../../../components/ui/button";

const ListCategoryScreen = () => {
  const { categoryControllerFindAll } = useCategoryHook();

  const [category, setCategory] = useState([]);
  const [categoryId, setCategoryId] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(10);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await categoryControllerFindAll('', 1, 10);
        console.log(response)
        if (response.status === 200) {
          //@ts-ignore
          setCategory(response.data.data);
          setCategoryId(response.data.data.id);
          console.log(response.data.data.id);
        } else {
          console.error("Error fetching categories:", response.message);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategory();
  }, []);

  const handleSearchChange = (event: any) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handleOpenModal = (category: any) => {
    setSelectedCategory(category);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedCategory(null);
    setShowModal(false);
  };

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleClickNewCategory = () => {
    navigate('/new-category');
  };
  const handleCategoryClick = (categoryId) => {
    navigate(`/categoryId?id=${categoryId}`);
  };

  const filteredCategories = category.filter((category: any) =>
    //@ts-ignore
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //@ts-ignore
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);
  const totalPages = Math.ceil(filteredCategories.length / categoriesPerPage);

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
        <HiSearch className="text-primary text-3xl"/>
      </div>
      {currentCategories.map((category: any) => (
        //@ts-ignore
        <div key={category.id}  onClick={() => handleCategoryClick(category.id)} className="bg-gradient-to-r cursor-pointer from-[#B4B9E0] to-[#636BA6] w-full rounded-xl p-4 flex gap-4 mt-4 items-center justify-between">
          <div className="flex gap-4 ">
            <HiOutlineTag className="text-6xl text-[#08081A]"/>
            <div>
              <h1 className="text-xl text-secondary font-bold" style={{ fontFamily: "Adam, sans-serif" }}>
                {/* @ts-ignore */}
                Nome: {category.name}
              </h1>
              <h1 className="text-md text-secondary" style={{ fontFamily: "Mulish, sans-serif" }}>
                {/* @ts-ignore */}
                Descrição: {category.description}
              </h1>
            </div>
          </div>
          <div className="relative">
            <HiOutlineDotsVertical 
              className="text-4xl text-[#EDD253] cursor-pointer"
              onClick={() => {
                //@ts-ignore
                if (showModal && selectedCategory && selectedCategory.id === category.id) {
                  handleCloseModal();
                } else {
                  handleOpenModal(category);
                }
              }}
            />
            {/* @ts-ignore */}
            {showModal && selectedCategory && selectedCategory.id === category.id && (
              <div className="absolute right-0 mt-2 w-48 bg-[#1E1D40] rounded-xl shadow-lg z-10 border border-[#D9B341]">
                <div className="flex flex-col gap-4 p-2">
                  <h1 className="flex gap-2 items-center"><HiOutlinePencilAlt className="text-xl text-[#D9B341]"/>Editar</h1>
                  <h1 className="flex gap-2 items-center"><HiOutlineXCircle className="text-xl text-[#D9B341]"/>Excluir</h1>
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
