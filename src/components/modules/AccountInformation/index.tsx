/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import MyBtn from "@/components/common/MyBtn";
import MyTitle from "@/components/common/MyTitle";
import Spinner from "@/components/common/Spinner";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import {
  useGetMeQuery,
  useUpdateProfileMutation,
} from "@/redux/features/auth/authApi";
import { FaCamera } from "react-icons/fa6";
import { FieldValues } from "react-hook-form";
import { FaUpload } from "react-icons/fa6";
import { toast } from "sonner";

const AccountInformation = () => {
  const { data, isLoading } = useGetMeQuery(undefined);
  const [updateProfile] = useUpdateProfileMutation();

  const handleSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Updating");

    const formData = new FormData();
    Object.keys(data).forEach((key) => {
      if (key !== "profile_image") {
        formData.append(key, data[key]);
      }
    });

    if (data?.profile_image instanceof File) {
      formData.append("profile_image", data?.profile_image);
    }

    try {
      await updateProfile(formData).unwrap();
      toast.success("Updated Successfully", { id: toastId });
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to Update", { id: toastId });
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="max-w-[950px] mx-auto bg-white md:p-7 p-3 rounded-2xl md:space-y-8 space-y-4">
      <MyTitle title="Account Information" />

        <MyFormWrapper
          onSubmit={handleSubmit}
          defaultValues={data}
          className="md:space-y-8 space-y-5"
        >
          <div className=" inline-block gap-2 border p-3 rounded-2xl">
            <div className="flex gap-4 items-center">
              <div className="relative">
                <MyFormInput
                  type="file"
                  name="profile_image"
                  imagePreview={data?.profile_image}
                />
                <div className="absolute bottom-0 right-1 bg-primary text-white p-1 rounded-full">
                  <FaCamera size={15} />
                </div>
              </div>
              <div className="md:inline-block hidden md:px-4 px-2 md:py-2 py-1 bg-primary text-white flex gap-2 items-center rounded-lg">
                <FaUpload /> Upload New Photo
              </div>
            </div>
          </div>

          <div className="w-full border md:p-6 p-3 inline-block rounded-2xl space-y-4">
            <div className="flex md:flex-row flex-col gap-4 justify-between">
              <div className="flex-1">
                <MyFormInput name="first_name" label="First Name" />
              </div>

              <div className="flex-1">
                <MyFormInput name="last_name" label="Last Name" />
              </div>
            </div>
            <MyFormInput type="email" name="email" label="Email" disabled />

            <div className="flex md:flex-row flex-col gap-4 justify-between">
              <div className="flex-1">
                <MyFormInput name="address" label="Address" />
              </div>

              <div className="flex-1">
                <MyFormInput name="contact_number" label="Contact Number" />
              </div>
            </div>

            <MyFormInput type="date" name="birthday" label="Birthday" />

            <MyFormInput type="textarea" name="bio" label="Bio" />

            <div className="flex justify-center">
              <MyBtn name="Save Changes" />
            </div>
          </div>
        </MyFormWrapper>
     
    </div>
  );
};

export default AccountInformation;
