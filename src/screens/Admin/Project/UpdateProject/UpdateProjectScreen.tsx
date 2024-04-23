import React, { useEffect, useState } from "react";
import { Button } from "../../../../components/ui/button";
import useProjectHook from "../../../../hooks/useProjectHook";
import { HiOutlineMinus, HiOutlinePlus } from "react-icons/hi";
import LoadingSpinner from "../../../../components/loading";

export const UpdateProjectScreen = () => {
  const { projectControllerUpdate, projectControllerFindOne } = useProjectHook();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState([""]);
  const [categories, setCategories] = useState([]);
  const [projectCategoryId, setProjectCategoryId] = useState('');
  const [selectedCategory, setSelectedCategory] = useState("");
  const [especificDetails, setEspecificDetails] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const query = new URLSearchParams(window.location.search);
  const projectId = query.get('id');

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await projectControllerFindOne(projectId);
        if (response.status === 200) {
          setName(response.data.name);
          setDescription(response.data.description);
          setEspecificDetails(response.data.especificDetails || "");
          setDetails(response.data.details || [""]);
          setLoading(false);
        } else {
          console.error("Error fetching project:", response.message);
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

  const addDetailInput = () => {
    setDetails([...details, ""]);
  };

  const handleDetailChange = (index, value) => {
    const updatedDetails = [...details];
    updatedDetails[index] = value;
    setDetails(updatedDetails);
  };

  const removeDetailInput = (indexToRemove) => {
    const updatedDetails = details.filter((_, index) => index !== indexToRemove);
    setDetails(updatedDetails);
  };

  const handleEspecificDetailsChange = (value) => {
    setEspecificDetails(value);
    setDetails(value.split("|"));
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
            <div className="flex items-center mt-2 gap-2 w-full">
              <input
                type="text"
                id="especificDetails"
                value={especificDetails}
                className="p-4 bg-transparent border border-primary rounded-xl text-primary w-full"
                onChange={(e) => handleEspecificDetailsChange(e.target.value)}
                autoComplete="off"
              />
              <Button onClick={addDetailInput}><HiOutlinePlus className="text-xl" /></Button>
            </div>
            {details.map((detail, index) => (
              <div key={index} className="flex items-center mt-2 gap-2 w-full">
                <input
                  type="text"
                  value={detail}
                  onChange={(e) => handleDetailChange(index, e.target.value)}
                  className="p-4 bg-transparent border border-primary rounded-xl text-primary w-full"
                />
                <Button onClick={() => removeDetailInput(index)} variant={"destructive"}><HiOutlineMinus className="text-xl" /></Button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProjectScreen;
