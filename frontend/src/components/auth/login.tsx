import CustomeButton from "@/module/button/Button";
import DefaultInput from "@/module/inputs/inputDefaut";
import { AuthFormProps, AuthType } from "@/types/global";

const Login = ({ setPosition }: AuthFormProps) => {
  return (
    <div className="w-full">
      <form className="flex gap-2 w-full flex-col">
        <div className="flex gap-2">
          <DefaultInput placeholder="user name" />
          <DefaultInput placeholder="password" />
        </div>
        <CustomeButton text={"Login"} type={3} />
      </form>
      <p
        onClick={() => setPosition(AuthType.register)}
        className="text-xs mt-4 cursor-pointer w-fit"
      >
        dont have account ? register
      </p>
    </div>
  );
};

export default Login;
