/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import { useRegisterMutation } from "@/redux/features/auth/authApi";
import { registerSchema } from "@/schema/signUp.schema";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";
import { zodResolver } from '@hookform/resolvers/zod';
 
const RegisterForm = () => {
  const [register] = useRegisterMutation();
  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Registering...");

    const formData = new FormData();

    formData.append("first_name", data.firstName);
    formData.append("last_name", data.lastName);
    formData.append("email", data.email);
    formData.append("password", data.password);

    try {
      await register(formData).unwrap();
      router.push("/login");
      toast.success("Registered Successfully", { id: toastId });
    } catch (err: any) {
      toast.error(
        err.data?.message || "Failed to Register, something is wrong",
        { id: toastId }
      );
    }
  };
  return (
    <div className="sm:w-[500px] w-full md:space-y-8 space-y-6">
      <div className="space-y-3 text-center">
        <h1 className="md:text-3xl text-2xl md:font-bold font-semibold">
          Create your account
        </h1>
        <p>Start managing your tasks efficiently</p>
      </div>
      <MyFormWrapper
        onSubmit={onSubmit}
        className="w-full"
        resolver={zodResolver(registerSchema)}
      >
        <div className="flex gap-2 justify-between">
          <MyFormInput name="firstName" label="First Name" />

          <MyFormInput name="lastName" label="Last Name" />
        </div>
        <MyFormInput type="email" name="email" label="Email" />

        <MyFormInput type="password" name="password" label="Password" />

        <MyFormInput
          type="password"
          name="confirmPassword"
          label="Confirm Password"
        />

        <button className="w-full bg-primary rounded-lg py-3 font-medium text-white my-5">
          Log In
        </button>
        <p className="text-center ">
          Already have an account?{" "}
          <Link href={"/login"} className="text-primary font-medium">
            Log in
          </Link>
        </p>
      </MyFormWrapper>
    </div>
  );
};

export default RegisterForm;
