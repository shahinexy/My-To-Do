"use client";
import MyBtn from "@/components/common/MyBtn";
import MyTitle from "@/components/common/MyTitle";
import MyFormCheckbox from "@/components/form/MyFormCheckbox";
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
import { Trash } from "lucide-react";
import { useState } from "react";
import { FieldValues } from "react-hook-form";
import { LuPlus } from "react-icons/lu";

const TodoModal = () => {
  const [open, setOpen] = useState(false);

  const handleSubmit = (data: FieldValues) => {
    console.log(data);
  };
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="bg-primary px-4 py-2 rounded-lg text-white flex gap-2 items-center">
          <LuPlus className="text-xl" /> New Tack
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center gap-2">
              <MyTitle title="Add New Task" />{" "}
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
                      <div className="flex gap-1 items-center">
                        <div className="w-2 h-2 rounded-full bg-red-500"></div>

                        <MyFormCheckbox name="extreme" consentText="Extreme" />
                      </div>
                      <div className="flex gap-1 items-center">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>

                        <MyFormCheckbox
                          name="moderate"
                          consentText="Moderate"
                        />
                      </div>
                      <div className="flex gap-1 items-center">
                        <div className="w-2 h-2 rounded-full bg-yellow-500"></div>

                        <MyFormCheckbox name="low" consentText="Low" />
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
