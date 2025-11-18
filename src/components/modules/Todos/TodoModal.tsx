/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import MyBtn from "@/components/common/MyBtn";
import MyTitle from "@/components/common/MyTitle";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  useCreateTodoMutation,
  useUpdateTodoMutation,
} from "@/redux/features/todo/todoApi";
import { TToDo } from "@/types/data.type";
import { Trash } from "lucide-react";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { LuPlus } from "react-icons/lu";
import { toast } from "sonner";
import { FiEdit3 } from "react-icons/fi";

interface ToDoProps {
  data?: TToDo;
  type: "edit" | "create";
}

const TodoModal = ({ data, type }: ToDoProps) => {
  const [open, setOpen] = useState<boolean>(false);
  const [priority, setPriority] = useState<"low" | "extreme" | "moderate">(
    data?.priority ? data?.priority : "low"
  );
  const [createToDo] = useCreateTodoMutation();
  const [updateToDo] = useUpdateTodoMutation();

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading(
      `${type === "create" ? "Creating..." : "Updating..."}`
    );

    try {
      if (type === "create") {
        await createToDo({ ...data, priority }).unwrap();
      } else {
        await updateToDo({
          data: { ...data, priority },
          id: data?.id,
        }).unwrap();
      }
      toast.success(
        `${type === "create" ? "Created" : "Updated"} Successfully`,
        { id: toastId }
      );
      setOpen(false);
    } catch (err: any) {
      toast.error(
        err.data?.message ||
          `Failed to ${
            type === "create" ? "Create" : "Update"
          }, something is wrong`,
        {
          id: toastId,
        }
      );
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        {type === "create" ? (
          <DialogTrigger className="bg-primary px-4 py-2 rounded-lg text-white flex gap-2 items-center">
            <LuPlus className="text-xl" /> New Tack
          </DialogTrigger>
        ) : (
          <DialogTrigger className="text-lg bg-secondary hover:bg-blue-200 duration-300 transition p-2 rounded-lg text-primary">
            <FiEdit3 />
          </DialogTrigger>
        )}
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center gap-2">
              <MyTitle
                title={`${type === "create" ? "Add New" : "Edit"} Task`}
              />{" "}
              <button
                onClick={() => setOpen(false)}
                className="underline underline-offset-4"
              >
                Go Back
              </button>
            </DialogTitle>
            <DialogDescription>
              <div className="my-6">
                <MyFormWrapper
                  onSubmit={handleSubmit}
                  className="space-y-3 text-black"
                  defaultValues={data}
                >
                  <MyFormInput
                    name="title"
                    label="Title"
                    placeholder="Enter title..."
                  />
                  <MyFormInput type="date" name="todo_date" label="Date" />

                  <div className="space-y-2">
                    <p className="font-medium mb-1 text-base">Priority</p>

                    <div className="flex gap-5">
                      <div className="flex gap-1 items-center cursor-pointer">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>
                        <span>Extreme</span>
                        <input
                          type="checkbox"
                          checked={priority === "extreme"}
                          onChange={() => setPriority("extreme")}
                          className="h-4 w-4 ml-1"
                        />
                      </div>

                      <div className="flex gap-1 items-center cursor-pointer">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span>Moderate</span>
                        <input
                          type="checkbox"
                          checked={priority === "moderate"}
                          onChange={() => setPriority("moderate")}
                          className="h-4 w-4 ml-1"
                        />
                      </div>

                      <div className="flex gap-1 items-center cursor-pointer">
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                        <span>Low</span>
                        <input
                          type="checkbox"
                          checked={priority === "low"}
                          onChange={() => setPriority("low")}
                          className="h-4 w-4 ml-1"
                        />
                      </div>
                    </div>
                  </div>

                  <MyFormInput
                    type="textarea"
                    name="description"
                    rows={6}
                    label="Task Description"
                    placeholder="Start writing here....."
                  />

                  <div className="flex gap-5 items-center justify-between">
                    <MyBtn name="Done" />
                    <button
                      type="button"
                      onClick={() => setOpen(false)}
                      className="bg-red-500 p-2 rounded-lg text-white"
                    >
                      <Trash size={20} />
                    </button>
                  </div>
                </MyFormWrapper>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TodoModal;
