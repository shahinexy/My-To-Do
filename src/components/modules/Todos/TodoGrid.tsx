"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  rectSortingStrategy,
} from "@dnd-kit/sortable";
import { TToDo } from "@/types/data.type";
import TodoCard from "./TodoCard";
import { useUpdateTodoMutation } from "@/redux/features/todo/todoApi";

const TodoGrid = ({ initial }: { initial: TToDo[] }) => {
  const [items, setItems] = useState<TToDo[]>(initial);
  const [updateToDo] = useUpdateTodoMutation();

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: { distance: 5 },
    }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 150, tolerance: 5 },
    }),
  );

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (active.id !== over.id) {
      const oldIndex = items.findIndex(
        (i) => String(i.id) === String(active.id)
      );
      const newIndex = items.findIndex((i) => String(i.id) === String(over.id));
      const newArr = arrayMove(items, oldIndex, newIndex)?.map((it, idx) => ({
        ...it,
        position: idx + 1,
      }));
      setItems(newArr);

      await updateToDo({
        data: { position: event?.over?.data?.current?.sortable?.index +1 },
        id: String(event?.active?.id),
      });

      console.log(event);
    }
  };
  return (
    <div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={items?.map((i) => String(i.id))}
          strategy={rectSortingStrategy}
        >
          <div className="flex flex-wrap gap-3 py-3">
            {items?.map((todo, idx) => (
              <TodoCard key={todo.id} data={todo} idx={idx} />
            ))}
          </div>
        </SortableContext>
      </DndContext>
    </div>
  );
};

export default TodoGrid;
