import { AuthFormProps, AuthType } from "@/types/global";

const Register = ({ setPosition }: AuthFormProps) => {
  return (
    <div>
      <h1>register</h1>
      <button onClick={() => setPosition(AuthType.login)}>login</button>
    </div>
  );
};

export default Register;
