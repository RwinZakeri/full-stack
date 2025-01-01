const CustomeButton = ({
  theme = "light",
  text,
  onClick,
  gtime = 0, // Delay in milliseconds
}: {
  theme?: "dark" | "light";
  text: string;
  onClick?: () => void;
  gtime?: number;
}) => {
  const handleClick = () => {
    if (onClick) {
      setTimeout(() => {
        onClick();
      }, gtime);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`block ${
        theme === "dark"
          ? "bg-primary-black text-primary-white"
          : "bg-primary-white text-primary-black"
      } px-4 py-2 rounded text-xs mt-2`}
    >
      {text}
    </button>
  );
};

export default CustomeButton;
