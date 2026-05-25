import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import useProjectHook from "../../../../hooks/useProjectHook";
import { HiChevronLeft, HiOutlineMinus, HiOutlinePlus, HiOutlineX } from "react-icons/hi";
import LoadingSpinner from "../../../../components/loading";
import { getPhotoImageSrc } from "../../../../utils/image";
import useCategoryHook from "../../../../hooks/useCategoryHook";
import usePhotoHook from "../../../../hooks/usePhotoHook";

type ExistingPhoto = {
  id: string;
  photoUrl: string;
};

export const UpdateProjectScreen = () => {
  const navigate = useNavigate();
  const { projectControllerFindOne, projectControllerUpdate } = useProjectHook();
  const { categoryControllerFindAll } = useCategoryHook();
  const { photoControllerCreate, photoControllerDelete } = usePhotoHook();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState<string[]>([""]);
  const [categories, setCategories] = useState<any[]>([]);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImageUrls, setNewImageUrls] = useState<string[]>([]);
  const [existingPhotos, setExistingPhotos] = useState<ExistingPhoto[]>([]);
  const [removedPhotoIds, setRemovedPhotoIds] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const query = new URLSearchParams(window.location.search);
  const projectId = query.get("id");

  useEffect(() => {
    const fetchProject = async () => {
      try {
        if (!projectId) {
          setLoading(false);
          return;
        }

        const response = await projectControllerFindOne(projectId);

        if (response.status === 200 && response.data) {
          setName(response.data.name || "");
          setDescription(response.data.description || "");
          setDetails((response.data.especificDetails || "").split("|").filter(Boolean));
          setSelectedCategory(response.data.projectCategoryId || "");
          setExistingPhotos(
            (response.data.ProjectPhotos || []).map((photo: any) => ({
              id: photo.id,
              photoUrl: getPhotoImageSrc(photo) || "",
            }))
          );
        } else {
          console.error("Error fetching project:", response.message);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [projectId]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await categoryControllerFindAll("", 1, 100);
        setCategories(response.data?.data || []);
      } catch (err) {
        console.error("Erro ao buscar categorias:", err);
      }
    };

    fetchCategories();
  }, []);

  const addDetailInput = () => {
    setDetails([...details, ""]);
  };

  const handleDetailChange = (index: number, value: string) => {
    const updatedDetails = [...details];
    updatedDetails[index] = value;
    setDetails(updatedDetails);
  };

  const removeDetailInput = (indexToRemove: number) => {
    const updatedDetails = details.filter((_, index) => index !== indexToRemove);
    setDetails(updatedDetails.length ? updatedDetails : [""]);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const urls = files.map((file) => URL.createObjectURL(file));

    setNewImages((prev) => [...prev, ...files]);
    setNewImageUrls((prev) => [...prev, ...urls]);
  };

  const removeExistingPhoto = (photoId: string) => {
    setRemovedPhotoIds((prev) => [...prev, photoId]);
    setExistingPhotos((prev) => prev.filter((photo) => photo.id !== photoId));
  };

  const removeNewImage = (indexToRemove: number) => {
    setNewImageUrls((prev) => prev.filter((_, index) => index !== indexToRemove));
    setNewImages((prev) => prev.filter((_, index) => index !== indexToRemove));
  };

  const handleSubmit = async () => {
    if (!projectId) return;

    setSubmitting(true);

    try {
      const especificDetails = details.filter(Boolean).join("|");

      const response = await projectControllerUpdate(
        projectId,
        name,
        description,
        especificDetails,
        selectedCategory
      );

      if (response.status !== 200) {
        console.error("Erro ao atualizar projeto:", response.message);
        return;
      }

      await Promise.all(removedPhotoIds.map((photoId) => photoControllerDelete(photoId)));
      const photoResponses = await Promise.all(newImages.map((file) => photoControllerCreate(projectId, file)));
      const failedUpload = photoResponses.find((photoResponse) => photoResponse.status === "error");

      if (failedUpload) {
        alert(failedUpload.message);
        return;
      }

      navigate("/projects");
    } catch (error) {
      console.error("Erro ao salvar projeto:", error);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="w-full h-full flex flex-col items-center p-8">
      <div className="w-full flex justify-start">
        <Button onClick={() => navigate("/projects")} variant={"link"}>
          <HiChevronLeft />Voltar
        </Button>
      </div>

      <h1 style={{ fontFamily: "Adam, sans-serif" }} className="text-3xl text-[#545C99] font-bold uppercase">
        Edite seu projeto
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 justify-center items-start w-full">
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
                <Button type="button" onClick={addDetailInput}><HiOutlinePlus className="text-xl" /></Button>
                <Button type="button" onClick={() => removeDetailInput(index)} variant={"destructive"}><HiOutlineMinus className="text-xl" /></Button>
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
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="w-full flex flex-col h-full items-center">
          <label htmlFor="image" className="flex flex-col uppercase w-full items-center justify-center mt-4 lg:mt-0" style={{ fontFamily: "Mulish, sans-serif" }}>
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
            {existingPhotos.map((photo) => (
              <div key={photo.id} className="flex h-16 p-2 border border-primary items-center rounded-xl">
                <img src={photo.photoUrl} alt="Imagem atual" className="h-12 w-12 object-cover rounded-md" />
                <div className="flex items-center w-full justify-between p-2">
                  <span className="text-primary">Imagem atual</span>
                  <button type="button" onClick={() => removeExistingPhoto(photo.id)}>
                    <HiOutlineX className="text-xl text-red-500" />
                  </button>
                </div>
              </div>
            ))}

            {newImageUrls.map((url, index) => (
              <div key={url} className="flex h-16 p-2 border border-primary items-center rounded-xl">
                <img src={url} alt={`Nova imagem ${index}`} className="h-12 w-12 object-cover rounded-md" />
                <div className="flex items-center w-full justify-between p-2">
                  <span className="text-primary">{newImages[index]?.name}</span>
                  <button type="button" onClick={() => removeNewImage(index)}>
                    <HiOutlineX className="text-xl text-red-500" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end w-full mt-4">
        <Button type="button" className="w-full" style={{ fontFamily: "Mulish, sans-serif" }} size={"lg"} disabled={submitting} onClick={handleSubmit}>
          {submitting ? "Salvando..." : "Salvar"}
        </Button>
      </div>
    </div>
  );
};

export default UpdateProjectScreen;
