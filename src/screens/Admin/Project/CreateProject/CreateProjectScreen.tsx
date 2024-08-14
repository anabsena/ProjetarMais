import { useEffect, useState } from "react";
import useProjectHook from "../../../../hooks/useProjectHook";
import { Button } from "../../../../components/ui/button";
import useCategoryHook from "../../../../hooks/useCategoryHook";
import { HiOutlineMinus, HiOutlinePlus, HiOutlineX } from "react-icons/hi";
import usePhotoHook from "../../../../hooks/usePhotoHook";
import { useNavigate } from "react-router-dom";

const CreateProjectScreen = () => {
  const [name, setName] = useState("");
  const [details, setDetails] = useState([""]);
  //@ts-ignore
  const [description, setDescription] = useState("");
  const [especificDetails, setEspecificDetails] = useState("");
  const [categories, setCategories] = useState([]);
  const [projectCategoryId, setProjectCategoryId] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("");
  const [namePlaceholder, setNamePlaceholder] = useState("Nome do projeto");
  const [especificDetailsPlaceholder, setEspecificDetailsPlaceholder] = useState("Detalhes específicos");
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const { projectControllerCreate } = useProjectHook();
  const { categoryControllerFindAll } = useCategoryHook();
  const { photoControllerCreate } = usePhotoHook();
  const navigate = useNavigate();

  const createProject = async () => {
    const allDetails = [especificDetails, ...details];
    const especificDetailsString = allDetails.join('|');
    const response = await projectControllerCreate(name, description, especificDetailsString, projectCategoryId);
    if (response?.status === 201 && response.data?.id) {
      await photosProject(response.data?.id);
      navigate('/projects');
    }
  };

  const photosProject = async (projectId: string) => {
    for (const image of selectedImages) {
      const response = await photoControllerCreate(projectId, image);
      if (response?.status === 'success') {
      }
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryControllerFindAll('', 1, 10);
        //@ts-ignore
        setCategories(response.data.data);
      } catch (err) {
        console.error("Erro ao buscar categorias:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleFocus = (setState: React.Dispatch<React.SetStateAction<string>>) => {
    setState("");
  };

  const handleBlur = (setState: React.Dispatch<React.SetStateAction<string>>, value: string) => {
    if (!value) {
      setState((prev) => prev);
    }
  };

  const addDetailInput = () => {
    setDetails([...details, ""]);
  };

  const removeDetailInput = (indexToRemove: number) => {
    const updatedDetails = details.filter((_, index) => index !== indexToRemove);
    setDetails(updatedDetails);
  };

  const handleDetailChange = (index: number, value: string) => {
    const updatedDetails = [...details];
    updatedDetails[index] = value;
    setDetails(updatedDetails);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const urls = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => [...prevImages, ...files]);
    setImageUrls((prevUrls) => [...prevUrls, ...urls]);
  };

  const removeImage = (indexToRemove: number) => {
    const updatedUrls = imageUrls.filter((_, index) => index !== indexToRemove);
    const updatedImages = selectedImages.filter((_, index) => index !== indexToRemove);
    setImageUrls(updatedUrls);
    setSelectedImages(updatedImages);
  };

  const handleSubmit = async () => {
    const projectId = await createProject();
    //@ts-ignore
    if (projectId) {
      await photosProject(projectId);
    }
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
    setProjectCategoryId(e.target.value);
  };

  return (
    <div className="w-full h-full flex flex-col items-center p-8">
      <h1 style={{ fontFamily: "Adam, sans-serif" }} className="text-3xl text-[#545C99] font-bold uppercase">
        Crie seus projetos
      </h1>

      <div className="grid grid-cols-2 gap-4 justify-center items-center w-full">
        <div className="flex flex-col gap-8">
          <label htmlFor="name" className="flex flex-col uppercase w-full items-center justify-center" style={{ fontFamily: "Mulish, sans-serif" }}>
            <span className="flex items-start w-full text-primary">Nome do projeto:</span>
            <input
              type="text"
              id="name"
              placeholder={namePlaceholder}
              value={name}
              className="p-4 bg-transparent border border-primary rounded-xl text-primary w-full"
              onChange={(e) => setName(e.target.value)}
              onFocus={() => handleFocus(setNamePlaceholder)}
              onBlur={(e) => handleBlur(setNamePlaceholder, e.target.value)}
              autoComplete="off"
            />
          </label>

          <div className="flex flex-col uppercase w-full items-center justify-center" style={{ fontFamily: "Mulish, sans-serif" }}>
            <span className="flex items-start w-full text-primary">Detalhes específicos:</span>

            <div className="flex items-center mt-2 gap-2 w-full">
              <input
                type="text"
                id="especificDetails"
                placeholder={especificDetailsPlaceholder}
                value={especificDetails}
                className="p-4 bg-transparent border border-primary rounded-xl text-primary w-full"
                onChange={(e) => setEspecificDetails(e.target.value)}
                onFocus={() => handleFocus(setEspecificDetailsPlaceholder)}
                onBlur={(e) => handleBlur(setEspecificDetailsPlaceholder, e.target.value)}
                autoComplete="off"
              />
              <Button onClick={addDetailInput}><HiOutlinePlus className="text-xl" /></Button>
            </div>

            {details.map((detail, index) => (
              <div key={index} className="flex items-center mt-2 gap-2 w-full">
                <input
                  type="text"
                  placeholder={especificDetailsPlaceholder}
                  value={detail}
                  onChange={(e) => handleDetailChange(index, e.target.value)}
                  onFocus={() => handleFocus(setEspecificDetailsPlaceholder)}
                  onBlur={(e) => handleBlur(setEspecificDetailsPlaceholder, e.target.value)}
                  className="p-4 bg-transparent border border-primary rounded-xl text-primary w-full"
                />
                <Button onClick={() => removeDetailInput(index)} variant={"destructive"}><HiOutlineMinus className="text-xl" /></Button>
              </div>
            ))}
          </div>

          <label htmlFor="category" className="flex flex-col uppercase w-full items-center justify-center" style={{ fontFamily: "Mulish, sans-serif" }}>
            <span className="flex items-start w-full text-primary">Categoria:</span>
            <select
              id="category"
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="p-4 bg-transparent border border-primary text-primary w-full rounded-xl focus:outline-none"
            >
              <option value="">Selecione uma categoria</option>
              {categories.map((cat) => (
                //@ts-ignore
                <option key={cat.id} value={cat.id}>
                  {/* @ts-ignore */}
                  {cat.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="w-full flex flex-col  h-full items-center">
          <label htmlFor="image" className="flex flex-col uppercase w-full items-center justify-center mt-4" style={{ fontFamily: "Mulish, sans-serif" }}>
            <span className="flex items-start w-full text-primary">Imagens do projeto:</span>
            <div className="relative w-full h-32 border border-dashed border-primary rounded-xl flex justify-center items-center cursor-pointer">
              <input
                type="file"
                id="image"
                accept="image/*"
                multiple
                onChange={handleImageChange}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              />
              <span className="text-xl text-primary">Faça upload das fotos do projeto</span>
            </div>
          </label>

          <div className="mt-4 flex flex-col w-full gap-4">
            {imageUrls.map((url, index) => (
              <div key={index} className="flex h-16 p-2 border border-primary items-center rounded-xl">
                <img src={url} alt={`Imagem ${index}`} className="h-12 w-12 object-cover rounded-md" />
                <div className=" flex items-center w-full justify-between p-2">
                  <span className="text-primary">{selectedImages[index].name}</span>
                  <button onClick={() => removeImage(index)}>
                    <HiOutlineX className="text-xl text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end w-full mt-4">
        <Button type="submit" className="w-full" onClick={handleSubmit} style={{ fontFamily: "Mulish, sans-serif" }} size={"lg"}>
          Criar
        </Button>
      </div>
    </div>
  );
};

export default CreateProjectScreen;
