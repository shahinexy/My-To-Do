import React from "react";

const MyBtn = ({
  name,
  width = "w-auto",
}: {
  name: string;
  width?: string;
}) => {
  return (
    <button
      className={`md:px-20 px-8 text-base py-2 bg-primary text-white md:rounded-xl rounded-md whitespace-nowrap ${width}`}
    >
      {name}
    </button>
  );
};

export default MyBtn;
