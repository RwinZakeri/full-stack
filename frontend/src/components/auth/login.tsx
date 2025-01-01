import CustomeButton from "@/module/button/Button";
import DefaultInput from "@/module/inputs/inputDefaut";
import { AuthFormProps, AuthType } from "@/types/global";

const Login = ({ setPosition }: AuthFormProps) => {
  return (
    <div className="w-full">
      <form className="flex gap-2 w-full">
        <DefaultInput />
        <DefaultInput />
      </form>
      <CustomeButton text={"Submit"} />
      <p
        onClick={() => setPosition(AuthType.login)}
        className="text-xs mt-4 cursor-pointer"
      >
        dont have account ? register
      </p>
    </div>
  );
};

export default Login;
