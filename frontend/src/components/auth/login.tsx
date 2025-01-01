import { AuthFormProps } from "@/types/global";

const Login = ({ setPosition }: AuthFormProps) => {
  return (
    <div>
      <h1>Login Form</h1>
      <button onClick={() => setPosition(2)}>Go to Register</button>
    </div>
  );
};

export default Login;
