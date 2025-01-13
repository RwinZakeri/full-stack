import TableHeader from "@/module/tasks_table_module/tableHeader";
import TaskItemsTable from "@/module/tasks_table_module/task_items_table";

const Tasks = () => {
  return (
    <div className="p-8 rounded-md border-[1px] shadow-md">
      <TableHeader />
      <TaskItemsTable />
    </div>
  );
};

export default Tasks;
