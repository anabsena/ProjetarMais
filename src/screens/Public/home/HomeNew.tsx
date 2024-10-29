import { Helmet } from "react-helmet-async";
import Footer from "../../../components/Footer";
import HeaderHome from "../../../components/HeaderHome";
import ContactScreen from "../Contact/ContactScreen";
import AboutUs from "./components/AboutUs";
import Services from "./components/Services";
import StartHome from "./components/Start";
import WhoWeAre from "./components/WhoWeAre";

const HomeNew = () => {
  return (
    <div className=" bg-[#F2F4FF]">
      <Helmet>
        <title>
          Projetar Mais Arquitetura | Escritório de Arquitetura em Ivaiporã -
          Arquiteta Andressa e Mônica
        </title>
        <meta
          name="description"
          content="Projetar Mais Arquitetura oferece projetos residenciais, comerciais e corporativos em Ivaiporã e região. Comandado pelas arquitetas Andressa e Mônica, nosso escritório combina design inovador com funcionalidade."
        />
        <meta
          name="keywords"
          content="escritório de arquitetura Ivaiporã, arquiteta Andressa, arquiteta Mônica, Projetar Mais, arquitetura residencial, arquitetura comercial, design de interiores, arquitetura em Paraná"
        />
        <meta
          property="og:title"
          content="Projetar Mais Arquitetura | Escritório de Arquitetura em Ivaiporã - Arquiteta Andressa e Mônica"
        />
        <meta
          property="og:description"
          content="Projetar Mais Arquitetura oferece soluções de design e arquitetura para projetos residenciais e comerciais em Ivaiporã. Conheça nossos projetos inovadores."
        />
        <meta
          property="og:image"
          content="https://www.projetarmais.com.br/imagens/projeto-destaque.jpg"
        />
        <meta
          property="og:url"
          content="https://www.projetarmais.com.br/home"
        />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Projetar Mais Arquitetura | Escritório de Arquitetura em Ivaiporã - Arquiteta Andressa e Mônica"
        />
        <meta
          name="twitter:description"
          content="Arquitetura de qualidade para projetos residenciais, comerciais e corporativos em Ivaiporã e região, com as arquitetas Andressa e Mônica."
        />
        <meta
          name="twitter:image"
          content="https://www.projetarmais.com.br/imagens/projeto-destaque.jpg"
        />
        <link rel="canonical" href="https://www.projetarmais.com.br/home" />
      </Helmet>
      <div className="w-full relative min-h-screen overflow-hidden">
        <HeaderHome />
        <StartHome />
        <AboutUs />
        <WhoWeAre />
        <Services />
        <ContactScreen />
        <Footer />
      </div>
    </div>
  );
};

export default HomeNew;
