/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import MyFormCheckbox from "@/components/form/MyFormCheckbox";
import MyFormInput from "@/components/form/MyFormInput";
import MyFormWrapper from "@/components/form/MyFormWrapper";
import { useLoginMutation } from "@/redux/features/auth/authApi";
import { setUser, TUser } from "@/redux/features/auth/authSlice";
import { useAppDispatch } from "@/redux/hooks";
import { setCookie } from "@/utils/cookies";
import { verifyToken } from "@/utils/verifyToken";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FieldValues } from "react-hook-form";
import { toast } from "sonner";

const LoginForm = () => {
  const dispatch = useAppDispatch();
  const [login] = useLoginMutation();
  const router = useRouter();

  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("login...");

    try {
      const res = await login(data).unwrap();
      const user = verifyToken(res.access) as TUser;

      setCookie(res.access);
      dispatch(setUser({ user, token: res.access }));

      toast.success("Login success", { id: toastId });

      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to login", { id: toastId });
    }
  };
  return (
    <div className="sm:w-[500px] w-full md:space-y-8 space-y-6">
      <div className="space-y-3 text-center">
        <h1 className="md:text-3xl text-2xl md:font-bold font-semibold">
          Log in to your account
        </h1>
        <p>Start managing your tasks efficiently</p>
      </div>
      <MyFormWrapper onSubmit={onSubmit} className="w-full">
        <MyFormInput
          type="email"
          name="email"
          placeholder="Enter your email"
          label="Email"
        />

        <MyFormInput
          type="password"
          name="password"
          placeholder="Enter your password"
          label="Password"
        />

        <div className="flex gap-3 justify-between items-center">
          <div className="flex gap-2 items-center">
            <MyFormCheckbox name="remember" />
            Remember me
          </div>
          <p className="text-primary font-medium">Forgot your password?</p>
        </div>

        <button className="w-full bg-primary rounded-lg py-3 font-medium text-white my-5">
          Log In
        </button>
        <p className="text-center ">
          Don’t have an account?{" "}
          <Link href={"/register"} className="text-primary font-medium">
            Register now
          </Link>
        </p>
      </MyFormWrapper>
    </div>
  );
};

export default LoginForm;
