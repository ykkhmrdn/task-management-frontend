import { Button } from "@/components/ui/button";
import { TaskList } from "./task-list";
import { Task } from "@/types/task";

interface BoardColumnProps {
  title: string;
  color: string;
  tasks: Task[];
  onAddTask: () => void;
  onTaskComplete: (id: string, completed: boolean) => void;
  onTaskDelete: (id: string) => void;
  onTasksReorder: (tasks: { _id: string; order: number }[]) => void;
}

export function BoardColumn({
  title,
  color,
  tasks,
  onAddTask,
  onTaskComplete,
  onTaskDelete,
  onTasksReorder,
}: BoardColumnProps) {
  return (
    <div className="board-column flex flex-col min-h-[500px]">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-2 h-8 rounded-full" style={{ background: color }} />
          <h3 className="font-medium text-gray-900">{title}</h3>
          <span className="px-2 py-0.5 text-xs rounded-full bg-gray-100 text-gray-600">
            {tasks.length}
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onAddTask}
          className="text-white hover:bg-white/10"
        ></Button>
      </div>

      <TaskList
        tasks={tasks}
        onTaskComplete={onTaskComplete}
        onTaskDelete={onTaskDelete}
        onTasksReorder={onTasksReorder}
      />
    </div>
  );
}
