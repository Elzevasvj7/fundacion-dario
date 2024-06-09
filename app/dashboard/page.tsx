import Image from "next/image";
import React from "react";
export default function Dashboard() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <Image
        src={"/school.svg"}
        alt=""
        width={100}
        height={100}
        className="h-auto w-2/3"
      />
    </div>
  );
}
