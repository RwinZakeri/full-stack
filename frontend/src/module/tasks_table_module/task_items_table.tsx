import { PlusIcon } from "@/assets/icons/svgExport";

const TaskItemsTable = () => {
  const changeHandler = () => {};
  return (
    <div className="w-full mt-8">
      <div className="flex items-center gap-3 h-[30px] ">
        <div className="w-fit h-full">
          <input
            type="text"
            placeholder="Filter todos..."
            className="w-56 h-[22px] border-[1px] text-sm px-3 py-1 box-content rounded-md  border-solid border-primart-gray focus-visible:outline-[#84848b] focus-visible:outline-[1px] shadow-sm"
          />
        </div>
        <button className="flex hover:bg-btn-bg-hover items-center border-dashed text-[12px] border-[1px] h-full box-content px-3 rounded-[6px] gap-2 capitalize">
          <PlusIcon />
          <p>Add</p>
        </button>
      </div>
      {/* main items */}
      <table className="w-full mt-[18px] block table-auto rounded-lg border-collapse caption-bottom">
        <thead className="bg-blue-500 border-[1px] rounded-lg border-solid border-black px-8">
          <tr className="rounded-lg px-98">
            <th className="w-4 mt-1 text-left flex items-center">
              <label className="container">
                <input type="checkbox" />
                <span className="checkmark"></span>
              </label>
            </th>
            <th className="w-fit text-left ">hello</th>
            <th className="w-fit text-left ">hello</th>
            <th className="w-fit text-left ">hello</th>
            <th className="w-fit text-left ">hello</th>
            <th className="w-fit text-left ">hello</th>
          </tr>
        </thead>
      </table>
    </div>
  );
};

export default TaskItemsTable;
