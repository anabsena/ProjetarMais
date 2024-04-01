import { useState } from "react";
import { Button } from "../../../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import useCategoryHook from "../../../../../hooks/useCategoryHook";
import { Alert, AlertDescription, AlertTitle } from "../../../../../components/ui/alert";
import { HiChevronLeft, HiExclamationCircle } from "react-icons/hi";

const CreateCategoryScreen = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { categoryControllerCreate } = useCategoryHook();
  const navigate = useNavigate();

  const createCategory = async () => {
    setSubmitting(true);
    setError(null);

    try {
      const response = await categoryControllerCreate(name, description);

      if (response?.status === 'success') {
        console.log(response);
        navigate('/categorys');
      } else {
        setMessage(true);
      }
    } catch (err) {
      setError("Ocorreu um erro ao criar a categoria.");
    }

    setSubmitting(false);
  };
  const handleClickBack = async () => {
    navigate('/categorys');
  }

  return (
    <div className="w-full h-full flex flex-col items-center p-8">
        <div className="w-full flex justify-start">
        <Button onClick={handleClickBack} variant={"link"}><HiChevronLeft />Voltar</Button>
        </div>
      <h1 style={{ fontFamily: "Adam, sans-serif" }} className="text-3xl text-[#545C99] font-bold uppercase">
        Crie suas categorias
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
            onClick={createCategory}
            disabled={submitting}
            style={{ fontFamily: "Mulish, sans-serif" }}
            size={"lg"}
          >
            {submitting ? 'Criando...' : 'Criar'}
          </Button>
        </div>
      </div>

      {message && (
        <div className="w-full flex justify-center">
          <Alert variant={"destructive"} className="mt-4 w-auto">
            <AlertTitle>Erro!</AlertTitle>
            <AlertDescription className="flex items-center gap-2">
              <HiExclamationCircle className="text-xl" />
              Categoria já existente.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {error && (
        <div className="w-full flex justify-center">
          <Alert variant={"destructive"} className="mt-4 w-auto">
            <AlertTitle>Erro!</AlertTitle>
            <AlertDescription className="flex items-center gap-2">
              <HiExclamationCircle className="text-xl" />
              {error}
            </AlertDescription>
          </Alert>
        </div>
      )}
    </div>
  );
};

export default CreateCategoryScreen;
