import { Header } from "./Header";
import { Menu } from "./Menu";


interface PrivateTemplateProps {
  children: React.ReactNode;
}

const PrivateTemplate = ({ children }: PrivateTemplateProps) => {
  return (
    <div className="bg-[#F2F4FF] min-h-screen">
      <Header />
      <div className="flex">
        <Menu />
        <div className="h-[calc(100vh-4rem)] overflow-auto w-full">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PrivateTemplate;
