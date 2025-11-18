import React from "react";
import { LiaNetworkWiredSolid } from "react-icons/lia";

const Spinner = () => {
  return (
    <div className="md:py-10 py-5 flex justify-center items-center">
      <div className="animate-spin">
        <LiaNetworkWiredSolid className="text-primary text-4xl" />
      </div>
    </div>
  );
};

export default Spinner;
