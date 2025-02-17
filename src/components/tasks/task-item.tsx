import { Task } from "@/types/task";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GripVertical, Trash2 } from "lucide-react";

interface TaskItemProps {
  task: Task;
  onComplete: (id: string, completed: boolean) => void;
  onDelete: (id: string) => void;
}

export function TaskItem({ task, onComplete, onDelete }: TaskItemProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: task._id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={`
        ${isDragging ? "opacity-50" : ""}
        ${
          task.isCompleted
            ? "border-blue-200 hover:border-blue-300"
            : "border-purple-200 hover:border-purple-300"
        }
      `}
    >
      <div className="flex items-center gap-4 p-4">
        <div {...attributes} {...listeners} className="cursor-grab">
          <GripVertical className="h-5 w-5 text-muted-foreground" />
        </div>

        <Checkbox
          checked={task.isCompleted}
          onCheckedChange={(checked) => onComplete(task._id, Boolean(checked))}
          className={task.isCompleted ? "border-blue-500" : "border-purple-500"}
        />

        <div className="flex-1 space-y-1">
          <h3
            className={`font-medium ${
              task.isCompleted ? "line-through text-muted-foreground" : ""
            }`}
          >
            {task.title}
          </h3>
          <p className="text-sm text-muted-foreground">{task.description}</p>
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={() => onDelete(task._id)}
          className={`
            ${
              task.isCompleted
                ? "text-blue-600 hover:text-blue-700 "
                : "text-purple-600 hover:text-purple-700 "
            }
          `}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
}
