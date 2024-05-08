import { useEffect, useState } from "react"
import useCategoryHook from "../../../../../hooks/useCategoryHook"
import { Button } from "../../../../../components/ui/button";
import { useNavigate } from "react-router-dom";

export const UpdateCategoryScreen = () => {
  const { categoryControllerUpdate, categoryControllerFindOne } = useCategoryHook()
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const navigate = useNavigate();


  const query = new URLSearchParams(window.location.search);
  const categoryId = query.get('id');

  useEffect(() => {
    const fetchCategory = async () => {
      if (categoryId) {
        const response = await categoryControllerFindOne(categoryId)
        if (response.status === 200) {
          if (response.data) {
            {/* @ts-ignore */ }
            setName(response.data.name)
            {/* @ts-ignore */ }
            setDescription(response.data.description)
          }
        }
      }
    }
    fetchCategory()
  }, [])
  const updateCategory = async () => {
    if (categoryId) {
      const response = await categoryControllerUpdate(categoryId, name, description)
      if (response.data) {
        navigate('/categorys')
      }
    }
  }


  return (
    <div className="w-full h-full flex flex-col items-center p-8">
      <h1 style={{ fontFamily: "Adam, sans-serif" }} className="text-3xl text-[#545C99] font-bold uppercase">
        Edite sua categoria
      </h1>
      <div className="flex flex-col gap-4 justify-center items-center w-full">
        <label htmlFor="name" className="flex flex-col uppercase w-full items-start justify-center" style={{ fontFamily: "Mulish, sans-serif" }}>
          <span className="flex items-start text-primary">Nome da categoria:</span>
          <input
            type="text"
            id="name"
            placeholder="Nome da categoria"
            value={name}
            className="p-4 bg-transparent border border-primary w-full rounded-xl focus:outline-none text-primary"
            onChange={(e) => setName(e.target.value)}
            autoComplete="off"
          />
        </label>
        <label htmlFor="description" className="flex flex-col uppercase w-full items-start justify-center" style={{ fontFamily: "Mulish, sans-serif" }}>
          <span className="flex items-start text-primary">Descrição da categoria:</span>
          <textarea
            id="description"
            placeholder="Descrição da categoria"
            value={description}
            rows={6}
            className="p-4 bg-transparent border border-primary rounded-xl w-full focus:outline-none text-primary"
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <div className="flex justify-end w-full">
          <Button
            type="button"
            onClick={updateCategory}
            style={{ fontFamily: "Mulish, sans-serif" }}
            size={"lg"}
          >
            Criar
          </Button>
        </div>
      </div>
    </div>
  )
}