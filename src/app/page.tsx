import Peliculas from "@/components/Peliculas";
import { Films } from "@/types/films";

export default async function Home() {
  const res = await fetch("https://swapi.info/api/films");
  const films: Films[] = await res.json();

  return (
    <div className="w-full h-full flex flex-col items-center gap-10">
      <h2 className="text-[24px] font-[500] tracking-[-1%]">
        Escoge una película
      </h2>
      <Peliculas films={films} />
    </div>
  );
}
