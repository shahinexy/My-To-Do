"use client";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FaGripVertical } from "react-icons/fa6";
import TodoModal from "./TodoModal";
import DeleteModal from "@/components/common/DeleteModal";
import { TToDo } from "@/types/data.type";

const TodoCard = ({ data }: { data: TToDo; idx: number }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: String(data.id) });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 50 : "auto",
  };
  return (
    <div
      ref={setNodeRef}
      style={style}
      className="w-full sm:w-[48%] lg:w-[32%] p-1 box-border touch-none"
    >
      <div
        className={`bg-white p-4 rounded-lg flex flex-col gap-3 shadow-sm ${
          isDragging ? "ring-2 ring-primary/40" : ""
        }`}
      >
        <div className="flex justify-between items-center">
          <h3 className="font-medium">{data.title}</h3>
          <div className="flex items-center gap-2">
            <p
              className={`py-1 px-3 rounded-md text-sm capitalize ${
                data?.priority === "low"
                  ? "bg-yellow-100 text-yellow-500"
                  : data?.priority === "moderate"
                  ? "bg-green-100 text-green-500"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {" "}
              {data.priority}{" "}
            </p>
            <button {...listeners} {...attributes} className="cursor-move p-1">
              <FaGripVertical />
            </button>
          </div>
        </div>

        <p className="text-gray-500 text-sm">{data.description}</p>

        <div className="flex justify-between items-center">
          <p className="text-gray-500 text-sm">{data.todo_date}</p>
          <div className="flex gap-2 items-center">
            <TodoModal data={data} type="edit" />
            <DeleteModal btn="icon" id={data.id} type="todo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
