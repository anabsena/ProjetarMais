import { ReactNode } from "react";
import Footer from "./Footer";
import HeaderHome from "./HeaderHome";

interface PublicLayoutProps {
    children: ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
    return (
        <div className="flex flex-col min-h-screen bg-[#F2F4FF]">
            <header className="lg:bg-[#545C99] lg:w-full lg:h-28">
                <HeaderHome />
            </header>
            <main className="flex-grow">
                {children}
            </main>
            <footer>
                <Footer />
            </footer>
        </div>
    );
};

export default PublicLayout;
