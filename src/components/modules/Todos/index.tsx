"use client";
import MyTitle from "@/components/common/MyTitle";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import { FieldValues } from "react-hook-form";
import { CiSearch } from "react-icons/ci";
import { useAllToDosQuery } from "@/redux/features/todo/todoApi";
import Spinner from "@/components/common/Spinner";
import TodoModal from "./TodoModal";
import { TToDo } from "@/types/data.type";
import Image from "next/image";
import TodoCard from "./TodoCard";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";
import { BsArrowDownUp } from "react-icons/bs";
import { addDays, format } from "date-fns";

type Checked = DropdownMenuCheckboxItemProps["checked"];

const Todos = () => {
  const { data, isLoading } = useAllToDosQuery(undefined);
  const [dateRange, setDateRange] = useState<Checked>(true);
 
  const today = format(new Date(), "yyyy-MM-dd");
  const in5Days = format(addDays(new Date(), 5), "yyyy-MM-dd");
  const in10Days = format(addDays(new Date(), 10), "yyyy-MM-dd");
  const in30Days = format(addDays(new Date(), 30), "yyyy-MM-dd");

  const handleSubmit = (data: FieldValues) => {
    console.log(data);
  };
  const todos: TToDo[] = data?.results;

  if (isLoading)
    return (
      <div className="h-[70vh] w-full flex items-center justify-center">
        <Spinner />
      </div>
    );
  return (
    <div className="md:space-y-8 space-y-5">
      <div className="flex justify-between items-center gap-5">
        <MyTitle title="Todos" />
        <TodoModal type="create" />
      </div>

      <div className="w-full flex gap-5 ">
        <MyFormWrapper onSubmit={handleSubmit} className="w-full flex flex-1">
          <MyFormInput
            name="search"
            placeholder="Search your task here..."
            inputClassName="rounded-r-none py-2 focus:ring-0 bg-white"
          />
          <button className="bg-primary p-1 rounded-r-lg text-white text-2xl px-3">
            <CiSearch />
          </button>
        </MyFormWrapper>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="bg-white border px-6 py-2 rounded-lg flex items-center gap-2">
              Filter By <BsArrowDownUp />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>Date</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuCheckboxItem
              checked={dateRange === today}
              onCheckedChange={() => setDateRange(today)}
            >
              Deadline Today
            </DropdownMenuCheckboxItem>

            <DropdownMenuCheckboxItem
              checked={dateRange === in5Days}
              onCheckedChange={() => setDateRange(in5Days)}
            >
              Expires in 5 days
            </DropdownMenuCheckboxItem>

            <DropdownMenuCheckboxItem
              checked={dateRange === in10Days}
              onCheckedChange={() => setDateRange(in10Days)}
            >
              Expires in 10 days
            </DropdownMenuCheckboxItem>

            <DropdownMenuCheckboxItem
              checked={dateRange === in30Days}
              onCheckedChange={() => setDateRange(in30Days)}
            >
              Expires in 30 days
            </DropdownMenuCheckboxItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {todos?.length < 1 && (
        <div className="bg-white rounded-xl px-3 md:py-28 py-16 flex flex-col gap-5 items-center justify-center">
          <Image
            src={"/images/no-list.png"}
            alt="No data found"
            width={500}
            height={500}
            className="w-44 h-44"
          />
          <h2 className="text-2xl">No todos yet</h2>
        </div>
      )}
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
        {todos?.map((todo: TToDo) => (
          <TodoCard key={todo?.id} data={todo} />
        ))}
      </div>
    </div>
  );
};

export default Todos;
