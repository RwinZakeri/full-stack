import Image from "next/image";

const TableHeader = () => {
  return (
    <div className="w-full">
      <h1 className="font-extrabold text-2xl text-primary-black">
        Welcome back!
      </h1>
      <div className="flex items-center justify-between">
        <p className="text-primary-gray">
          Here's a list of your tasks for this month!
        </p>
        <button className="w-9 h-9">
          <Image
            src={"/assets/profile/03.png"}
            alt="profile"
            className="w-full h-full rounded-full"
            width={25}
            height={25}
          />
        </button>
      </div>
    </div>
  );
};

export default TableHeader;
