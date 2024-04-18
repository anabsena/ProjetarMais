import React from "react";

const LoadingSpinner: React.FC = () => (
    <div className="flex justify-center items-center h-64 ">
        <img src="/img/mais_azul.svg" alt="Carregando..." className="animate-spin w-16 h-16" />
    </div>
);

export default LoadingSpinner;
