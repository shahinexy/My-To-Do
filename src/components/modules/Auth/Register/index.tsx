import Image from "next/image";
import RegisterForm from "./RegisterForm";


const Register = () => {
    return (
    <div className="flex items-center gap-6">
      <div className="lg:flex hidden items-center justify-center bg-secondary ">
        <Image
          src={"/images/register-img.png"}
          alt="register"
          width={600}
          height={600}
          className="max-h-screen"
        />
      </div>

      <div className="flex justify-center items-center flex-1 p-4">
        <RegisterForm />
      </div>
    </div>
    );
};

export default Register;