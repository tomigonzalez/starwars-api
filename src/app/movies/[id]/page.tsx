import { Films } from "@/types/films";
import { Planets } from "@/types/planets";

import { ChevronLeft, CircleUser, Clock } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Params {
  id: string;
}

const Page = async ({ params }: { params: Promise<Params> }) => {
  const { id } = await params;

  // Traer película
  const res = await fetch(`https://swapi.info/api/films/${id}`);
  const film: Films = await res.json();

  // Traer planetas en paralelo
  const planets: Planets[] = await Promise.all(
    film.planets.map(async (url: string) => {
      const res = await fetch(url, { cache: "no-store" });
      return res.json();
    })
  );

  // Función para formatear números
  const formatNumber = (num: number) => {
    if (isNaN(num)) return num;
    return new Intl.NumberFormat("es-ES").format(num);
  };

  return (
    <section className="w-full h-full flex justify-center">
      <div className="sm:w-[1114px] sm:h-[755px] w-[344px] h-[1029px]">
        <Link
          className="flex-row cursor-pointer w-full sm:w-1/2 flex hover:text-[#6F00ED]"
          href={"../"}
        >
          <ChevronLeft size={24} strokeWidth={3} />
          <h1 className="sm:text-[32px] text-[28px] leading-[20px] tracking-[-0.01em] ">
            {film.title}
          </h1>
        </Link>

        <div className="flex sm:flex-row flex-col justify-between mt-8 ">
          <section className="sm:w-[392px] sm:h-[417px] w-full flex gap-4 flex-col border-b-2 border-primary sm:pb-0 pb-6 sm:mb-0 mb-6">
            <h5 className="text-sm leading-[20px] tracking-[-0.01em]">
              Opening
            </h5>
            {film.opening_crawl.split(/\r\n\r\n/).map((paragraph, i) => (
              <p
                key={i}
                className="text-sm leading-[20px] tracking-[-0.01em] text-tertiary mb-3"
              >
                {paragraph}
              </p>
            ))}

            <div className="flex flex-row gap-2 ">
              <Clock className="bg-primary rounded-lg p-[4px]" />
              <p className="text-sm self-center">{film.release_date}</p>
            </div>
            <div className="flex flex-row gap-2 ">
              <CircleUser className="bg-primary rounded-lg p-[4px]" />
              <p className="text-sm self-center">{film.director}</p>
            </div>
            <div className="flex flex-row gap-2">
              <CircleUser className="bg-primary rounded-lg p-[4px]" />
              <p className="text-sm self-center">{film.producer}</p>
            </div>
          </section>

          <section className="sm:w-[607px] sm:h-[590px] flex gap-[22px] flex-col ">
            <h3 className="text-2xl">Planets</h3>
            {planets.map((planet, index) => (
              <div
                key={index}
                className="bg-primary rounded-2xl p-6 sm:w-[607px] w-[344px] h-[168px] gap-4 flex flex-row justify-between"
              >
                <div className="flex justify-between flex-col h-[120px]">
                  <h4 className="text-lg">{planet.name}</h4>
                  <p className="text-sm text-tertiary">
                    {formatNumber(planet.population)} población
                  </p>
                  <p className="text-sm text-tertiary">
                    {formatNumber(planet.diameter)} km de diámetro
                  </p>
                  <p className="text-sm text-tertiary">
                    Periodo de rotación: {planet.orbital_period} días
                  </p>
                </div>
                <button className="bg-[#6F00ED] hover:bg-[#6111bc] cursor-pointer backdrop-blur-xl rounded-xl w-[74px] h-8 text-sm">
                  Ver más
                </button>
              </div>
            ))}
          </section>
        </div>
      </div>
    </section>
  );
};

export default Page;
