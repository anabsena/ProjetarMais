import { useEffect, useRef, useState } from "react";
import {
  HiArrowSmRight,
  HiChevronLeft,
  HiChevronRight,
  HiOutlineHome,
  HiOutlineOfficeBuilding,
} from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import useProjectHook from "../../../../hooks/useProjectHook";
import { BASE_IMAGE_URL } from "../../../../constants/app.constant";
import useCategoryHook from "../../../../hooks/useCategoryHook";
import { PiFlowerLotus } from "react-icons/pi";
import Slider from "react-slick";
import {
  ResponseCategoryDto,
  ResponsePhotoDto,
  ResponseProjectDto,
} from "../../../../services/api-back";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { IoHomeOutline } from "react-icons/io5";

const Services = () => {
  const [category, setCategory] = useState<ResponseCategoryDto[]>();
  const [projects, setProjects] = useState<ResponseProjectDto[]>();
  const [photoOne, setPhotoOne] = useState<ResponsePhotoDto[]>([]);
  let sliderRef = useRef<Slider | null>(null);
  const next = () => {
    sliderRef.current?.slickNext();
  };

  const previous = () => {
    sliderRef.current?.slickPrev();
  };
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 400,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { projectControllerFindAll } = useProjectHook();
  const { categoryControllerFindAll } = useCategoryHook();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await categoryControllerFindAll("", 1, 10);
        if (response.status === 200) {
          setCategory(response.data?.data);
          console.log(response)
        }
      } catch (error) {}
    };

    const fetchProjects = async () => {
      try {
        const response = await projectControllerFindAll("", "", "", 1, 4);
        if (response.status === 200) {
          const lastThreeProjects = response.data?.data.slice(-4);
          const photoUrls =
            lastThreeProjects &&
            lastThreeProjects.map((project: any) => {
              const projectPhotos = project.ProjectPhotos || [];
              const urls = projectPhotos.map(
                (photo: any) => BASE_IMAGE_URL + photo.photoUrl
              );
              return urls.length > 0 ? urls[0] : null;
            });

          setPhotoOne(photoUrls);
          setProjects(lastThreeProjects);
        } else {
          console.error("Error fetching projects:", response.message);
        }
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };

    fetchCategory();
    fetchProjects();
  }, []);
  const categoryIcons = {
    "Interiores Residencial ": <IoHomeOutline className="text-4xl transition-transform duration-300 hover:scale-150" />,
    "Interiores comercial": <HiOutlineBuildingOffice className="text-4xl transition-transform duration-300 hover:scale-150" />,
    "Paisagismo": <PiFlowerLotus className="text-4xl transition-transform duration-300 hover:scale-150" />,
    "Comercial": <HiOutlineOfficeBuilding className="text-4xl transition-transform duration-300 hover:scale-150" />,
    "Residencial": <IoHomeOutline className="text-4xl transition-transform duration-300 hover:scale-150" />,
  };
  return (
    <div
      style={{
        backgroundImage: "url('img/bg-mais.svg')",
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
      }}
      className="flex flex-col justify-start items-center min-h-screen w-full gap-8 z-10"
    >
      <div className="flex flex-col w-auto items-center mt-4 z-30">
        <h1
          className="uppercase text-[#2F2E59] font-bold text-4xl px-4 text-center"
          style={{ fontFamily: "Adam, sans-serif" }}
        >
          O que fazemos de melhor
        </h1>
        <img src="img/separador-title.svg" alt="" className="mb-8 w-full" />
      </div>
      <div className="flex gap-4 max-h-10">
        <button
          onClick={previous}
          className="rounded-full border border-[#9BA1D1] hover:bg-[#9BA1D1] flex items-center justify-center p-2 cursor-pointer"
        >
          <HiChevronLeft className="text-[#9BA1D1] hover:text-white" />
        </button>
        <button
          onClick={next}
          className="rounded-full border border-[#9BA1D1]  hover:bg-[#9BA1D1] flex items-center justify-center p-2 cursor-pointer"
        >
          <HiChevronRight className="text-[#9BA1D1] hover:text-white" />
        </button>
      </div>
      <div className="flex items-center xl:px-72 w-full">
        <div className="w-full flex-grow text-center">
          <Slider
            {...settings}
            ref={(slider) => {
              sliderRef.current = slider;
            }}
          >
            {category &&
              category.map((category) => (
                <Link
                  to={`/serviços/projeto?id=${category.id}`}
                  key={category.id}
                  className="flex flex-col items-center text-decoration-none w-24"
                >
                  <div className="flex flex-col items-center">
                    <div className="bg-[#9BA1D1] p-2 rounded-full w-28 h-28 flex justify-center items-center shadow-md hover:shadow-xl transition-shadow duration-300">
                      <div className="border-2 border-[#F4E393] p-4 rounded-full flex justify-center items-center w-full h-full">
                      {categoryIcons[category.name] || (
                        <HiOutlineOfficeBuilding className="text-4xl transition-transform duration-300 hover:scale-150" />
                        )}
                        </div>
                    </div>
                    <h1 className="text-lg text-center text-primary mt-1">
                      {category.name}
                    </h1>
                  </div>
                </Link>
              ))}
          </Slider>
        </div>
      </div>
      <div className="w-full p-4 mt-4">
        <div className="flex flex-col items-start mt-4 z-30">
          <h1
            className="uppercase text-[#2F2E59] font-bold text-4xl"
            style={{ fontFamily: "Adam, sans-serif" }}
          >
            Projetos
          </h1>
          <img src="img/separador-title-project.svg" className="mb-8" alt="" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-4 sm:h-64 md:px-32 gap-12">
          {projects &&
            projects.map((project, index) => (
              <div
                key={project.id}
                className="rounded-lg overflow-hidden flex flex-col text-center"
              >
                <img
                  src={photoOne[index]}
                  className="w-full h-64 object-cover"
                  alt=""
                  loading="lazy"
                />
                <h1 className="text-xl text-primary">{project.name}</h1>
              </div>
            ))}
        </div>
      </div>
      <Button
        variant={"inverseTwo"}
        onClick={() => navigate("/projetos")}
        size={"lg"}
      >
        Ver todos <HiArrowSmRight />
      </Button>
    </div>
  );
};

export default Services;
