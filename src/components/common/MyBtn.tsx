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
      className={`px-20 text-base py-2 bg-primary text-white rounded-xl ${width}`}
    >
      {name}
    </button>
  );
};

export default MyBtn;
