import { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";
import useProjectHook from "../../../../hooks/useProjectHook";
import { HiOutlineMinus, HiOutlinePlus, HiOutlineX } from "react-icons/hi";
import LoadingSpinner from "../../../../components/loading";
import useCategoryHook from "../../../../hooks/useCategoryHook";

export const UpdateProjectScreen = () => {
  const {  projectControllerFindOne } = useProjectHook();
  const { categoryControllerFindAll } = useCategoryHook();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState([""]);
  const [categories, setCategories] = useState([]);
  const [selectedImages, setSelectedImages] = useState<File[]>([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);

  const query = new URLSearchParams(window.location.search);
  const projectId = query.get('id');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (projectId) {

          const response = await projectControllerFindOne(projectId);

          if (response.status === 200) {
            //@ts-ignore
            setName(response.data.name);
            //@ts-ignore
            setDescription(response.data.description);

            //@ts-ignore
            const detailsArray = response.data.especificDetails.split('|');
            // Remover primeiro elemento vazio, se houver
            if (detailsArray[0] === "") detailsArray.shift();
            setDetails(detailsArray);
            //@ts-ignore
            setSelectedCategory(response.data.projectCategoryId)
            const urls = await Promise.all(
              //@ts-ignore
              response.data.ProjectPhotos.map(async (photo: any) => {
                const buffer = new Uint8Array(photo.photos.data);
                const blob = new Blob([buffer], { type: 'image/png' });
                const url = URL.createObjectURL(blob);
                return url;
              })
            );
            setSelectedImages(urls)

            setLoading(false);
          } else {
            console.error("Error fetching project:", response.message);
          }
        }
      } catch (error) {
        console.error(error);
      }
    };


    if (projectId) {
      fetchProject();
    } else {
      setLoading(false);
    }
  }, [projectId]);
  //@ts-ignore


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

  const addDetailInput = () => {
    setDetails([...details, ""]);
  };
  //@ts-ignore
  const handleDetailChange = (index, value) => {
    const updatedDetails = [...details];
    updatedDetails[index] = value;
    setDetails(updatedDetails);
    setDetails(value.split("|"));
  };
  //@ts-ignore
  const removeDetailInput = (indexToRemove) => {
    const updatedDetails = details.filter((_, index) => index !== indexToRemove);
    setDetails(updatedDetails);
  };
  //@ts-ignore
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  //@ts-ignore
  const handleImageChange = (e) => {
    const files = e.target.files;
    //@ts-ignore
    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setSelectedImages(Array.from(files));
    //@ts-ignore
    setImageUrls(urls);
  };
  //@ts-ignore
  const removeImage = (indexToRemove) => {
    const updatedUrls = imageUrls.filter((_, index) => index !== indexToRemove);
    const updatedImages = selectedImages.filter((_, index) => index !== indexToRemove);

    setImageUrls(updatedUrls);
    setSelectedImages(updatedImages);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full h-full flex flex-col items-center p-8">
      <h1 style={{ fontFamily: "Adam, sans-serif" }} className="text-3xl text-[#545C99] font-bold uppercase">
        Edite seu projeto
      </h1>
      <div className="grid grid-cols-2 gap-4 justify-center items-center w-full">
        <div className="flex flex-col gap-8">
          <label htmlFor="name" className="flex flex-col uppercase w-full items-center justify-center" style={{ fontFamily: "Mulish, sans-serif" }}>
            <span className="flex items-start w-full text-primary">Nome do projeto:</span>
            <input
              type="text"
              id="name"
              value={name}
              className="p-4 bg-transparent border border-primary rounded-xl text-primary w-full"
              onChange={(e) => setName(e.target.value)}
              autoComplete="off"
            />
          </label>
          <label htmlFor="description" className="flex flex-col uppercase w-full items-center justify-center" style={{ fontFamily: "Mulish, sans-serif" }}>
            <span className="flex items-start w-full text-primary">Descrição:</span>
            <textarea
              id="description"
              rows={6}
              value={description}
              className="p-4 bg-transparent border border-primary rounded-xl text-primary w-full resize-none"
              onChange={(e) => setDescription(e.target.value)}
              autoComplete="off"
            />
          </label>
          <div className="flex flex-col uppercase w-full items-center justify-center" style={{ fontFamily: "Mulish, sans-serif" }}>
            <span className="flex items-start w-full text-primary">Detalhes específicos:</span>

            {details.map((detail, index) => (
              <div key={index} className="flex items-center mt-2 gap-2 w-full">
                <input
                  type="text"
                  value={detail}
                  onChange={(e) => handleDetailChange(index, e.target.value)}
                  className="p-4 bg-transparent border border-primary rounded-xl text-primary w-full"
                />
                <Button onClick={addDetailInput}><HiOutlinePlus className="text-xl" /></Button>
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
            {selectedImages.map((url, index) => (
              <div key={index} className="flex h-16 p-2 border border-primary items-center rounded-xl" >
                {/* @ts-ignore */}
                <img src={url} alt={`Imagem ${index}`} className="h-12 w-12 object-cover rounded-md" />
                <div className=" flex items-center w-full justify-between p-2">

                  <span className="text-primary">{selectedImages[index].name}</span>
                  <button
                    onClick={() => removeImage(index)}
                  >
                    <HiOutlineX className="text-xl text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end w-full mt-4">
          <Button type="submit" className="w-full" style={{ fontFamily: "Mulish, sans-serif" }} size={"lg"} >
            Criar
          </Button>
        </div>
      </div>
    </div>

  );
};

export default UpdateProjectScreen;
