const DefaultInput = ({
  placeholder = "no placeholder set",
  onChange,
  name,
  value = "",
}: {
  placeholder?: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  name: string;
  value?: string;
}) => {
  return (
    <input
      type="text"
      onChange={onChange}
      name={name}
      value={value}
      className="w-full border-none outline-none rounded bg-primary-white focus:outline-primary-black ring-offset-4 ring-gray-300 focus:ring-1 text-sm focus:border-primary-black text-primary-black px-3 py-1.5"
      placeholder={placeholder}
    />
  );
};

export default DefaultInput;
