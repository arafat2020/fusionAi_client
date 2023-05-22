import Image from "next/image";
import React from "react";

function Logo({ size }) {
  return (
    <div
      className={` ${
        size ? ` h-[${size}px] w-[${size}px]` : "h-[100px] w-[100px] "
      }   overflow-hidden rounded-full  inline-block`}
    >
      <Image
        src="/logo.jpg"
        width={size ? size : 100}
        height={size ? size : 100}
      />
    </div>
  );
}

export default Logo;
