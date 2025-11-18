/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useState } from "react";
import { TToDo } from "@/types/data.type";
import TodoModal from "./TodoModal";
import DeleteModal from "@/components/common/DeleteModal";
import { FaGripVertical } from "react-icons/fa6";
import { useUpdateTodoMutation } from "@/redux/features/todo/todoApi";

const TodoCard = ({ data }: { data: TToDo[] }) => {
  const [todos, setTodos] = useState(data);
  const [updatePosition] = useUpdateTodoMutation();

  const handleDragEnd = async (result: any) => {
    if (!result.destination) return;
    console.log(result);
    const items = Array.from(todos);
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);

    const updated = items.map((item, index) => ({
      ...item,
      position: index + 1,
    }));

    setTodos(updated);

    await updatePosition({
      data: { position: result?.source?.index },
      id: result?.draggableId,
    });
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="todoList">
        {(provided) => (
          <div
            className="grid lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 sm:gap-6 gap-3 py-3"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {todos.map((todo, index) => (
              <Draggable
                key={todo.id}
                draggableId={String(todo.id)}
                index={index}
              >
                {(provided) => (
                  <div
                    className="bg-white lg:p-6 sm:p-4 p-3 rounded-lg flex flex-col justify-between gap-4"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                  >
                    <div className="flex justify-between items-center gap-2">
                      <h3 className="font-medium">{todo?.title}</h3>

                      <div className="flex items-center gap-2">
                        <p
                          className={`py-1 px-3 rounded-md text-sm capitalize ${
                            todo?.priority === "low"
                              ? "bg-yellow-100 text-yellow-500"
                              : todo?.priority === "moderate"
                              ? "bg-green-100 text-green-500"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {todo?.priority}
                        </p>

                        {/* Drag Handle */}
                        <button
                          {...provided.dragHandleProps}
                          className="cursor-move"
                        >
                          <FaGripVertical />
                        </button>
                      </div>
                    </div>

                    <p className="text-gray-500 text-sm">{todo?.description}</p>

                    <div className="flex gap-2 justify-between items-center">
                      <p className="text-gray-500 text-sm">{todo?.todo_date}</p>
                      <div className="flex gap-3 items-center">
                        <TodoModal data={todo} type="edit" />
                        <DeleteModal btn="icon" id={todo?.id} type="todo" />
                      </div>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default TodoCard;
