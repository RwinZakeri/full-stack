"use client";
import AXIOS from "@/configs/axios";
import QueryKey from "@/configs/react-query/react.query.keys";
import CustomeButton from "@/module/button/Button";
import DefaultInput from "@/module/inputs/inputDefaut";
import { AuthFormProps, AuthType, LoginReducerType } from "@/types/global";
import AuthValidator from "@/validations/authValidation";
import { useMutation } from "@tanstack/react-query";
import { useReducer, useState } from "react";
import { toast } from "react-toastify";

// Define types for the state and actions
type Action =
  | { type: "addTo"; name: keyof LoginReducerType; value: string }
  | { type: "reset" };

// Define the initial state
const initialState: LoginReducerType = {
  userName: "",
  password: "",
};

// Reducer function with types
const reducer = (state: LoginReducerType, action: Action): LoginReducerType => {
  switch (action.type) {
    case "addTo":
      return { ...state, [action.name]: action.value };
    case "reset":
      return initialState;
    default:
      return state;
  }
};

const Login = ({ setPosition }: AuthFormProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const validatedValue = value.trim();
    // Clear errors for the current field if any
    setErrors((prev) => ({ ...prev, [name]: "" }));

    // Update state
    dispatch({
      type: "addTo",
      name: name as keyof LoginReducerType,
      value: validatedValue,
    });
  };

  const loginInputs = [
    { id: 1, name: "userName", placeholder: "User Name" },
    { id: 2, name: "password", placeholder: "Password", type: "password" },
  ];

  const mutation = useMutation({
    mutationKey: [QueryKey.loginUser],
    mutationFn: async () => {
      const validationErrors = AuthValidator(state, "login");

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        throw new Error("Validation failed");
      }

      // Make API call
      const response = await AXIOS.post("/login", state);
      return response;
    },
    onError: () => {
      toast.error("Failed to log in");
    },
    onSuccess: (data) => {
      console.log(data);
      toast.success("Logged in successfully");

      // Save token to localStorage upon successful login
      localStorage.setItem("token", data.data.token);

      // Reset form state if desired
      dispatch({ type: "reset" });
    },
  });

  return (
    <>
      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-3">
          {loginInputs.map((input) => (
            <div key={input.id} className="flex flex-col gap-1">
              <DefaultInput
                name={input.name}
                onChange={changeHandler}
                value={state[input.name as keyof LoginReducerType] || ""}
                placeholder={input.placeholder}
              />
              {errors[input.name] && (
                <p className="text-red-500 text-sm">{errors[input.name]}</p>
              )}
            </div>
          ))}
        </div>

        <CustomeButton
          onClick={() => mutation.mutate()}
          text="Login"
          type={3}
        />
      </form>
      <p
        onClick={() => setPosition(AuthType.register)}
        className="text-xs mt-4 cursor-pointer w-fit"
      >
        Don't have an account? Register
      </p>
    </>
  );
};

export default Login;
