import AXIOS from "@/configs/axios";
import QueryKey from "@/configs/react-query/react.query.keys";
import CustomeButton from "@/module/button/Button";
import DefaultInput from "@/module/inputs/inputDefaut";
import { AuthFormProps, AuthType, RegisterReduderType } from "@/types/global";
import AuthValidator from "@/validations/authValidation";
import { useMutation } from "@tanstack/react-query";
import { useReducer, useState } from "react";
import { toast } from "react-toastify";

// Define types for the state and actions
type Action =
  | { type: "addTo"; name: keyof RegisterReduderType; value: string }
  | { type: "reset" };

// Define the initial state
const initialState: RegisterReduderType = {
  userName: "",
  email: "",
  password: "",
  repassword: "",
};

// Reducer function with types
const reducer = (
  state: RegisterReduderType,
  action: Action
): RegisterReduderType => {
  switch (action.type) {
    case "addTo":
      return { ...state, [action.name]: action.value };
    case "reset":
      return initialState;
    default:
      return state;
  }
};

const Register = ({ setPosition }: AuthFormProps) => {
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
      name: name as keyof RegisterReduderType,
      value: validatedValue,
    });
  };

  const registerInputs = [
    { id: 1, name: "userName", placeholder: "User name" },
    { id: 2, name: "email", placeholder: "Email" },
    { id: 3, name: "password", placeholder: "Password" },
    { id: 4, name: "repassword", placeholder: "Re-enter password" },
  ];

  const mutation = useMutation({
    mutationKey: [QueryKey.registerUser],
    mutationFn: async () => {
      const validationErrors = AuthValidator(state);

      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        throw new Error(`
        ${validationErrors?.userName || ""}   
        ${validationErrors?.email || ""}  
        ${validationErrors?.password || ""} 
        ${validationErrors?.repassword || ""}
        `);
      }

      // Make API call
      console.log(state);
      return await AXIOS.post("http://localhost:3001/users", state);
    },

    onError: (err) => {
      toast.error(`${err}`);
    },
    onSuccess: (res) => {
      toast.success("Registered successfully");
      console.log(res);
      dispatch({ type: "reset" }); // Reset form state
      setPosition(AuthType.login);
    },
  });

  return (
    <>
      <form
        className="flex flex-col gap-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="flex flex-col gap-3">
          {registerInputs.map((input) => (
            <div key={input.id} className="flex flex-col gap-1">
              <DefaultInput
                name={input.name}
                onChange={changeHandler}
                value={state[input.name as keyof RegisterReduderType] || ""}
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
          text="Register"
          type={3}
        />
      </form>
      <p
        onClick={() => setPosition(AuthType.login)}
        className="text-xs mt-4 cursor-pointer w-fit"
      >
        Have an account? Login
      </p>
    </>
  );
};

export default Register;
