"use client";
import AXIOS from "@/configs/axios";
import TableHeader from "@/module/tasks_table_module/tableHeader";
import { DataTableDemo } from "@/module/tasks_table_module/task_items_table";
import { useQuery } from "@tanstack/react-query";

const Tasks = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const response = await AXIOS.get("/todo");
      return response.data;
    },
  });

  return (
    <div className="p-8 rounded-md border-[1px] shadow-md">
      <TableHeader />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <DataTableDemo data={data} isLoading={isLoading} />
      )}
    </div>
  );
};

export default Tasks;
