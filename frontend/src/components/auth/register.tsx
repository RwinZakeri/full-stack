import CustomeButton from "@/module/button/Button";
import DefaultInput from "@/module/inputs/inputDefaut";
import { AuthFormProps, AuthType } from "@/types/global";
import Form from "next/form";

const Register = ({ setPosition }: AuthFormProps) => {
  return (
    <>
      <Form className="flex flex-col gap-3">
        <div className="flex gap-3">
          <DefaultInput placeholder="user name" />
          <DefaultInput placeholder="email" />
        </div>
        <DefaultInput placeholder="password" />
        <DefaultInput placeholder="repassword" />
        <CustomeButton text="Register" type={3} />
      </Form>
      <p
        onClick={() => setPosition(AuthType.login)}
        className="text-xs mt-4 cursor-pointer w-fit"
      >
        have account ? login
      </p>
    </>
  );
};

export default Register;
