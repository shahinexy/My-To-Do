/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { setCookie } from "@/utils/cookies";
import { varifyToken } from "@/utils/verifyToken";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const RegisterForm = () => {
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("login...");

    try {
      const res = await login(data).unwrap();
      const user = varifyToken(res.data.token) as TUser;

      if (user?.role !== "ADMIN") {
        return toast.error("Unauthorize Access", { id: toastId });
      } else {
        setCookie(res.data.token);
        dispatch(setUser({ user, token: res.data.token }));

        toast.success("Login success", { id: toastId });

        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Faild to login", { id: toastId });
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
      <MyFormWrapper onSubmit={onSubmit} className="w-full">
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
