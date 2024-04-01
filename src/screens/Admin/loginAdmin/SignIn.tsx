import React, { useState } from "react";
import useAuthHook from "../../../hooks/useAuthHook";
import { HiExclamation, HiExclamationCircle } from "react-icons/hi";
import { Button } from "../../../components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "../../../components/ui/alert";

const SignIn = () => {
    const [message, setMessage] = useState<boolean>(false)
  const { signIn } = useAuthHook();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const OnSignIn = async () => {
    const response = await signIn(email, password);
    if (response?.status === 'success') {
      console.log(email, password)
  }else {
    setMessage(true)
  }
  };



  return (
    <div className="w-full h-[100vh] bg-[#2F2E59] flex justify-center items-center flex-col gap-4">
      <img src="img/Logotipo1.svg" alt="" />
    <div className="w-[70vw] h-[70%] flex flex-col  items-center gap-20 p-8 bg-primary rounded-2xl relative">
        <div className="flex flex-col items-center relative">
      <h1 style={{ fontFamily: "Adam, sans-serif" }} className="uppercase text-4xl font-bold">
        Seja bem vindo(a) administrador(a)
      </h1>
      <p className="font-thin text-xl" style={{ fontFamily: "Adam, sans-serif" }}>Insira seu login para continuar</p>
      {message &&
            <div className="w-full flex justify-center">
      <Alert variant={"destructive"} className="absolute top-20 w-auto">
        
        <AlertTitle>Erro!</AlertTitle>
        <AlertDescription className="flex items-center gap-2"><HiExclamationCircle className="text-xl"/>Email e/ou senha incorretos, tente novamente.</AlertDescription>
        </Alert>
              
            </div>
                  }
      </div>
      <div className="flex flex-col gap-4 justify-center items-center w-full">
        <label htmlFor="email" className="flex flex-col uppercase w-full items-center justify-center" style={{ fontFamily: "Mulish, sans-serif" }}>
         <span className="w-[80%] flex items-start">Email:</span> 
          <input
            type="text"
            id="email"
            placeholder="Email"
            value={email}
            className="p-4 bg-transparent border border-white w-[80%] rounded-xl focus:outline-none"
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="off"
          />
        </label>

        <label htmlFor="password" className="flex flex-col uppercase w-full items-center justify-center" style={{ fontFamily: "Mulish, sans-serif" }}>
        <span className="w-[80%] flex items-start">Senha:</span> 
          <input
            
            type="password"
            id="password"
            placeholder="Senha"
            value={password}
            className="p-4 bg-transparent border border-white w-[80%] rounded-xl focus:outline-none"
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="off"
          />
        </label>
<div className="w-[80%] flex justify-end">
        <Button type="submit" onClick={()=> OnSignIn()} style={{ fontFamily: "Mulish, sans-serif" }} size={"lg"} variant={"inverse"}>Entrar</Button>
        </div>
      </div>

      {submitting && <p>Logado com sucesso!</p>}
            <img src="img/MaisDuplo.svg" className="h-48 w-48 absolute bottom-0 left-0" alt="" />
    </div>
    </div>
  );
};

export default SignIn;
