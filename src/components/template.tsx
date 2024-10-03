import { ReactNode } from "react";
import Footer from "./Footer";
import HeaderHome from "./HeaderHome";

interface PublicLayoutProps {
    children: ReactNode;
}
const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
    return (
        <div className="min-h-screen overflow-hidden bg-[#F2F4FF]">
            <div className="lg:bg-[#545C99]  lg:w-full lg:h-28">
                <HeaderHome />
            </div>
            <div className="">
                <main>{children}</main>
            </div>
            <Footer />
        </div>
    );
};

export default PublicLayout;
