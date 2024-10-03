import { HiChevronLeft, HiExclamationCircle } from "react-icons/hi";
import { Button } from "../../../../components/ui/button";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { validationSchema } from "./schema";
import useUserHook from "../../../../hooks/useUserHook";
import { Alert, AlertDescription, AlertTitle } from "../../../../components/ui/alert";
import { useState } from "react";

const NewUser = () => {
    const navigate = useNavigate();
    const { userControllerCreate } = useUserHook();
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleClickBack = () => {
        navigate('/admin');
    };

    const createUser = async (values: any) => {
        try {
            const response = await userControllerCreate(values.name, values.email, values.password);
            if (response?.status === 201) {
                navigate('/admin');
            } else {
                setMessage('Usuário já existente.');
            }
        } catch (err) {
            console.error(err);
            setError('Ocorreu um erro ao criar o usuário. Tente novamente.');
        }
    };

    return (
        <>
            <div className="w-full flex justify-start">
                <Button onClick={handleClickBack} variant={"link"}>
                    <HiChevronLeft />Voltar
                </Button>
            </div>
            <h1 style={{ fontFamily: "Adam, sans-serif" }} className="text-3xl text-[#545C99] font-bold uppercase">
                Novo Usuario
            </h1>

            {message && (
                <div className="w-full flex justify-center">
                    <Alert variant={"destructive"} className="mt-4 w-auto">
                        <AlertTitle>Erro!</AlertTitle>
                        <AlertDescription className="flex items-center gap-2">
                            <HiExclamationCircle className="text-xl" />
                            {message}
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

            <Formik
                initialValues={{ name: "", email: "", password: "" }}
                validationSchema={validationSchema}
                onSubmit={createUser}
            >
                {({ isSubmitting }) => (
                    <Form className="flex flex-col gap-4 justify-center items-center w-full">
                        <label htmlFor="name" className="flex flex-col uppercase w-full items-start justify-center" style={{ fontFamily: "Mulish, sans-serif" }}>
                            <span className="flex items-start text-primary">Nome:</span>
                            <Field
                                type="text"
                                name="name"
                                placeholder="Nome"
                                className="p-4 bg-transparent border border-primary w-full rounded-xl focus:outline-none text-primary"
                            />
                            <ErrorMessage name="name" component="div" className="text-red-500 mt-1 text-sm" />
                        </label>
                        <label htmlFor="email" className="flex flex-col uppercase w-full items-start justify-center" style={{ fontFamily: "Mulish, sans-serif" }}>
                            <span className="flex items-start text-primary">Email:</span>
                            <Field
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="p-4 bg-transparent border border-primary w-full rounded-xl focus:outline-none text-primary"
                            />
                            <ErrorMessage name="email" component="div" className="text-red-500 mt-1 text-sm" />
                        </label>
                        <label htmlFor="password" className="flex flex-col uppercase w-full items-start justify-center" style={{ fontFamily: "Mulish, sans-serif" }}>
                            <span className="flex items-start text-primary">Senha:</span>
                            <Field
                                type="password"
                                name="password"
                                placeholder="Senha"
                                className="p-4 bg-transparent border border-primary w-full rounded-xl focus:outline-none text-primary"
                            />
                            <ErrorMessage name="password" component="div" className="text-red-500 mt-1 text-sm" />
                        </label>

                        <div className="flex justify-end w-full">
                            <Button
                                type="submit"
                                disabled={isSubmitting}
                                style={{ fontFamily: "Mulish, sans-serif" }}
                                size={"lg"}
                            >
                                {isSubmitting ? 'Criando...' : 'Criar'}
                            </Button>
                        </div>
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default NewUser;
