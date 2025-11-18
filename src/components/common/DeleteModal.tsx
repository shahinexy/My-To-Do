/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import { useDeleteTodoMutation } from "@/redux/features/todo/todoApi";
import { useState } from "react";
import { RiDeleteBin7Line } from "react-icons/ri";
import { HiOutlineQuestionMarkCircle } from "react-icons/hi";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

interface DeleteModalProps {
  id: string | number;
  type: "todo" | "user";
  btn: "icon" | "btn";
}

const DeleteModal = ({ id, type, btn }: DeleteModalProps) => {
  const [open, setOpen] = useState(false);
  const [deleteTodo] = useDeleteTodoMutation();

  const handleDelete = async () => {
    const toastId = toast.loading("Deleting...");
    try {
      await deleteTodo(id).unwrap();

      toast.success("Deleted successfully", { id: toastId });
      setOpen(false);
    } catch (err: any) {
      toast.error(err?.data?.message || `Failed to delete ${type}`, {
        id: toastId,
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {btn === "icon" ? (
        <DialogTrigger asChild>
          <button className="p-2 rounded-lg bg-secondary hover:bg-red-200 duration-300 transition">
            <RiDeleteBin7Line className="text-lg text-red-500" />
          </button>
        </DialogTrigger>
      ) : (
        <DialogTrigger asChild>
          <Button variant="destructive" className="w-full md:w-2/5">
            Delete
          </Button>
        </DialogTrigger>
      )}

      <DialogContent className="max-w-[430px] rounded-2xl">
        <DialogHeader className="flex justify-center">
          <div className="flex justify-center">
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center"
              style={{ backgroundColor: "#E2ECF8" }}
            >
              <HiOutlineQuestionMarkCircle
                className="text-4xl"
                style={{ color: "#5272FF" }}
              />
            </div>
          </div>

          <DialogTitle className="text-center text-xl font-semibold mt-4">
            Are you sure?
          </DialogTitle>

          <DialogDescription className="text-center text-gray-500 mt-2">
            Do you really want to delete this{" "}
            <span style={{ color: "#5272FF" }} className="font-medium">
              {type}
            </span>
            ? This action cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <div className="mt-6 flex justify-center gap-4">
          <Button
            variant="outline"
            className="w-28"
            onClick={() => setOpen(false)}
          >
            Cancel
          </Button>

          <Button
            className="w-28 text-white"
            style={{ backgroundColor: "#5272FF" }}
            onClick={handleDelete}
          >
            Confirm
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteModal;
