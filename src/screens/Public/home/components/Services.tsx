import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  HiArrowSmRight,
  HiChevronLeft,
  HiChevronRight,
  HiOutlineOfficeBuilding,
} from "react-icons/hi";
import { HiOutlineBuildingOffice } from "react-icons/hi2";
import { IoHomeOutline } from "react-icons/io5";
import { PiFlowerLotus } from "react-icons/pi";
import { Link, useNavigate } from "react-router-dom";
import Slider from "react-slick";

import { Button } from "../../../../components/ui/button";
import useCategoryHook from "../../../../hooks/useCategoryHook";
import useProjectHook from "../../../../hooks/useProjectHook";
import type {
  FirebaseCategory,
  FirebaseProject,
} from "../../../../services/firebase/types";
import { getProjectCoverImageSrc } from "../../../../utils/image";

const Services = () => {
  const [category, setCategory] = useState<FirebaseCategory[]>([]);
  const [projects, setProjects] = useState<FirebaseProject[]>([]);
  const [photoOne, setPhotoOne] = useState<(string | null)[]>([]);

  const sliderRef = useRef<Slider | null>(null);

  const { projectControllerFindAll } = useProjectHook();
  const { categoryControllerFindAll } = useCategoryHook();

  const navigate = useNavigate();

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

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await categoryControllerFindAll("", 1, 10);

        if (response.status === 200) {
          setCategory(response.data?.data ?? []);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    const fetchProjects = async () => {
      try {
        const response = await projectControllerFindAll("", "", "", 1, 3);

        if (response.status === 200) {
          const lastThreeProjects = response.data?.data.slice(-3) ?? [];

          const photoUrls = lastThreeProjects.map((project) =>
            getProjectCoverImageSrc(project)
          );

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
  }, [categoryControllerFindAll, projectControllerFindAll]);

  const categoryIcons: Record<string, ReactNode> = {
    "Interiores Residencial": (
      <IoHomeOutline className="text-4xl transition-transform duration-300 hover:scale-150" />
    ),
    "Interiores comercial": (
      <HiOutlineBuildingOffice className="text-4xl transition-transform duration-300 hover:scale-150" />
    ),
    Paisagismo: (
      <PiFlowerLotus className="text-4xl transition-transform duration-300 hover:scale-150" />
    ),
    Comercial: (
      <HiOutlineOfficeBuilding className="text-4xl transition-transform duration-300 hover:scale-150" />
    ),
    Residencial: (
      <IoHomeOutline className="text-4xl transition-transform duration-300 hover:scale-150" />
    ),
  };

  return (
    <div
      style={{
        backgroundImage: "url('img/bg-mais.svg')",
        backgroundRepeat: "repeat",
        backgroundSize: "cover",
      }}
      className="flex flex-col justify-center items-center min-h-screen w-full gap-4 z-10 relative"
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
          type="button"
          onClick={previous}
          className="rounded-full border border-[#9BA1D1] hover:bg-[#9BA1D1] flex items-center justify-center p-2 cursor-pointer"
        >
          <HiChevronLeft className="text-[#9BA1D1] hover:text-white" />
        </button>

        <button
          type="button"
          onClick={next}
          className="rounded-full border border-[#9BA1D1] hover:bg-[#9BA1D1] flex items-center justify-center p-2 cursor-pointer"
        >
          <HiChevronRight className="text-[#9BA1D1] hover:text-white" />
        </button>
      </div>

      <div className="flex items-center xl:px-72 w-full">
        <div className="w-full flex-grow text-center">
          <Slider
            {...settings}
            ref={(slider: Slider | null) => {
              sliderRef.current = slider;
            }}
          >
            {category.map((item) => (
              <Link
                to={`/projetos?id=${item.id}`}
                key={item.id}
                className="flex flex-col items-center text-decoration-none w-24"
              >
                <div className="flex flex-col items-center">
                  <div className="bg-[#9BA1D1] p-2 rounded-full w-32 h-32 flex justify-center items-center shadow-md hover:shadow-xl transition-shadow duration-300">
                    <div className="border-2 border-[#F4E393] p-4 rounded-full flex justify-center items-center w-full h-full">
                      {categoryIcons[item.name] ?? (
                        <HiOutlineOfficeBuilding className="text-5xl transition-transform duration-300 hover:scale-150" />
                      )}
                    </div>
                  </div>

                  <h1 className="text-lg text-center text-primary mt-1">
                    {item.name}
                  </h1>
                </div>
              </Link>
            ))}
          </Slider>
        </div>
      </div>

      <div className="w-full mt-4">
        <div className="w-full p-4 flex flex-col lg:flex-row justify-center gap-4 xl:px-72">
          {projects.map((project, index) => (
            <div
              key={project.id}
              className="relative rounded-lg overflow-hidden flex flex-col w-full"
            >
              <img
                src={photoOne[index] ?? "img/img-escritorio-home.png"}
                className="w-full h-64 object-cover transition duration-300 ease-in-out transform hover:scale-105"
                alt={project.name}
                loading="lazy"
              />

              <div className="p-4 absolute inset-0 bg-gradient-to-t from-black to-transparent z-20 flex flex-col justify-end items-start opacity-0 hover:opacity-100 transition-opacity duration-300 text-start">
                <h1 className="text-xl text-white">{project.name}</h1>

                <Button
                  variant="inverseTwo"
                  onClick={() => navigate(`/projetos/projeto?id=${project.id}`)}
                  className="mt-2"
                >
                  Ver Projeto <HiArrowSmRight />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Button
        variant="inverseTwo"
        onClick={() => navigate("/projetos")}
        size="lg"
        className="mb-4"
      >
        Ver todos <HiArrowSmRight />
      </Button>
    </div>
  );
};

export default Services;