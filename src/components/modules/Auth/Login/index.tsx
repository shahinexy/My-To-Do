import Image from "next/image";
import LoginForm from "./LoginForm";

const Login = () => {
  return (
    <div className="flex items-center gap-6">
      <div className="lg:flex hidden items-center justify-center bg-secondary ">
        <Image
          src={"/images/login-img.png"}
          alt="register"
          width={600}
          height={600}
          className="max-h-screen"
        />
      </div>

      <div className="flex justify-center items-center flex-1 p-4">
        <LoginForm />
      </div>
    </div>
  );
};

export default Login;
