"use client";
import MyTitle from "@/components/common/MyTitle";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import { FieldValues } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import TodoModal from "./TodoModal";

const Todos = () => {
  const handleSubmit = (data: FieldValues) => {
    console.log(data);
  };
  return (
    <div className="md:space-y-8 space-y-5">
      <div className="flex justify-between items-center gap-5">
        <MyTitle title="Todos" />
        <TodoModal />
      </div>

      <div className="flex gap-5 ">
        <MyFormWrapper onSubmit={handleSubmit} className="w-full flex flex-1">
          <MyFormInput
            name="search"
            placeholder="Search your task here..."
            inputClassName="rounded-r-none py-2 focus:ring-0"
          />
          <button className="bg-primary p-1 rounded-r-lg text-white text-2xl px-3">
            <CiSearch />
          </button>
        </MyFormWrapper>
      </div>
    </div>
  );
};

export default Todos;
