import { ButtonTypeGlobal } from "@/types/global";

const CustomeButton = ({
  theme = "light",
  text,
  onClick,
  type = ButtonTypeGlobal.button,
}: {
  theme?: "dark" | "light";
  text: string;
  onClick?: () => void;
  gtime?: number;
  type?: ButtonTypeGlobal;
}) => {
  // @ts-ignore
  const handleClick = (event) => {
    event.preventDefault();
    if (onClick) {
      onClick();
    }
  };

  // Map enum to string
  const buttonTypeMap: Record<ButtonTypeGlobal, "button" | "reset" | "submit"> =
    {
      [ButtonTypeGlobal.button]: "button",
      [ButtonTypeGlobal.reset]: "reset",
      [ButtonTypeGlobal.submit]: "submit",
    };

  return (
    <button
      type={buttonTypeMap[type]} // Map enum to valid string type
      onClick={handleClick}
      className={`block ${
        theme === "dark"
          ? "bg-primary-black text-primary-white"
          : "bg-primary-white text-primary-black hover:bg-[#dbdbdb] transition-all duration-200 ease-linear"
      } px-4 py-2 rounded text-xs mt-2 w-fit`}
    >
      {text}
    </button>
  );
};

export default CustomeButton;
