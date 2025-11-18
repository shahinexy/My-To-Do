import { TToDo } from "@/types/data.type";
import TodoModal from "./TodoModal";
import DeleteModal from "@/components/common/DeleteModal";

const TodoCard = ({ data }: { data: TToDo }) => {
  return (
    <div className="bg-white p-6 rounded-lg flex flex-col justify-between gap-4">
      <div className="flex justify-between items-center gap-2">
        <h3 className="font-medium">{data?.title}</h3>
        <p
          className={`py-1 px-3 rounded-md text-sm capitalize ${
            data?.priority === "low"
              ? "bg-yellow-100 text-yellow-500"
              : data?.priority === "moderate"
              ? "bg-green-100 text-green-500"
              : "bg-red-100 text-red-600"
          }`}
        >
          {data?.priority}
        </p>
      </div>

      <p className="text-gray-500 text-sm">{data?.description}</p>

      <div className="flex gap-2 justify-between items-center">
        <p className="text-gray-500 text-sm">{data?.todo_date}</p>
        <div className="flex gap-3 items-center">
          <TodoModal data={data} type="edit" />
          <DeleteModal btn="icon" id={data?.id} type="todo" />
        </div>
      </div>
    </div>
  );
};

export default TodoCard;
