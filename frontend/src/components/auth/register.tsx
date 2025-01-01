import { AuthFormProps } from "@/types/global";

const Register = ({ setPosition }: AuthFormProps) => {
  return (
    <div>
      <h1>register</h1>
      <button onClick={() => setPosition(1)}>login</button>
    </div>
  );
};

export default Register;
