"use client";

import React, { useState } from "react";
import { Films } from "@/types/films";
import { CircleStarIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface PeliculasProps {
  films: Films[];
}

const Peliculas = ({ films }: PeliculasProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleClick = (filmId: string) => {
    setLoading(true); // muestra loader
    router.push(`/movies/${filmId}`);
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <p className="text-white text-xl">Cargando película...</p>
        </div>
      )}
      <div className="grid sm:grid-cols-3 grid-cols-2 sm:gap-[10px] gap-[12px]">
        {films.map((film) => {
          const filmId = film.url.split("/").filter(Boolean).pop()!;

          return (
            <div
              key={film.url}
              onClick={() => handleClick(filmId)}
              className="cursor-pointer rounded-[12px] sm:w-[190px] w-[166px] h-[130px] sm:h-[150px] flex flex-col justify-center items-center gap-[10px] border border-secondary bg-primary hover:bg-secondary/10 transition"
            >
              <CircleStarIcon size={40} color="#5D5D5D" strokeWidth={1} />
              <p className="font-medium text-[14px] leading-[24px] tracking-[-0.01em] text-center">
                {film.title}
              </p>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default Peliculas;
