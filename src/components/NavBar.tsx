import Image from "next/image";
import React from "react";

const NavBar = () => {
  return (
    <div className="w-full flex justify-center mt-8 mb-8">
      <Image
        src={"/img/sw.webp"}
        priority
        height={120}
        width={85}
        alt="star-wars"
      />
    </div>
  );
};

export default NavBar;
