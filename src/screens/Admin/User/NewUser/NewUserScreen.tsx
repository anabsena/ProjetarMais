import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { HiChevronLeft, HiExclamationCircle } from "react-icons/hi";
import useUserHook from "../../../../hooks/useUserHook";
import { Button } from "../../../../components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "../../../../components/ui/alert";

const NewUserScreen = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const { userControllerCreate } = useUserHook();
    const navigate = useNavigate();

    const createUser = async () => {
        setSubmitting(true);
        setError(null);

        try {
            const response = await userControllerCreate(name, email, password);

            if (response?.status === 'success') {
                console.log(response);
                navigate('/categorys');
            } else {
                setMessage(true);
            }
        } catch (err) {
            setError("Ocorreu um erro ao criar o usuário.");
        }

        setSubmitting(false);
    };

    const handleClickBack = () => {
        navigate('/admin');
    };

    return (
        <div className="w-full h-full flex flex-col items-center p-8">
            <div className="w-full flex justify-start">
                <Button onClick={handleClickBack} variant={"link"}><HiChevronLeft />Voltar</Button>
            </div>
            <h1 style={{ fontFamily: "Adam, sans-serif" }} className="text-3xl text-[#545C99] font-bold uppercase">
                Novo Usuário
            </h1>

            <div className="flex flex-col gap-4 justify-center items-center w-full">
                <label htmlFor="name" className="flex flex-col uppercase w-full items-start justify-center" style={{ fontFamily: "Mulish, sans-serif" }}>
                    <span className="flex items-start text-primary">Nome:</span>
                    <input
                        type="text"
                        id="name"
                        placeholder="Nome"
                        value={name}
                        className="p-4 bg-transparent border border-primary w-full rounded-xl focus:outline-none text-primary"
                        onChange={(e) => setName(e.target.value)}
                        autoComplete="off"
                    />
                </label>
                <label htmlFor="email" className="flex flex-col uppercase w-full items-start justify-center" style={{ fontFamily: "Mulish, sans-serif" }}>
                    <span className="flex items-start text-primary">Email:</span>
                    <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={email}
                        className="p-4 bg-transparent border border-primary w-full rounded-xl focus:outline-none text-primary"
                        onChange={(e) => setEmail(e.target.value)}
                        autoComplete="off"
                    />
                </label>
                <label htmlFor="password" className="flex flex-col uppercase w-full items-start justify-center" style={{ fontFamily: "Mulish, sans-serif" }}>
                    <span className="flex items-start text-primary">Senha:</span>
                    <input
                        type="password"
                        id="password"
                        placeholder="Senha"
                        value={password}
                        className="p-4 bg-transparent border border-primary w-full rounded-xl focus:outline-none text-primary"
                        onChange={(e) => setPassword(e.target.value)}
                        autoComplete="off"
                    />
                </label>

                <div className="flex justify-end w-full">
                    <Button
                        type="button"
                        onClick={createUser}
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
                            Usuário já existente.
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

export default NewUserScreen;
