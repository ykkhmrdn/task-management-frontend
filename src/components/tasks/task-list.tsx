import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Task } from "@/types/task";
import { TaskItem } from "./task-item";

interface TaskListProps {
  tasks: Task[];
  onTasksReorder: (tasks: { _id: string; order: number }[]) => void;
  onTaskComplete: (id: string, completed: boolean) => void;
  onTaskDelete: (id: string) => void;
}

export function TaskList({
  tasks,
  onTasksReorder,
  onTaskComplete,
  onTaskDelete,
}: TaskListProps) {
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((task) => task._id === active.id);
      const newIndex = tasks.findIndex((task) => task._id === over.id);

      const updatedTasks = tasks.map((task, index) => ({
        _id: task._id,
        order:
          index === oldIndex
            ? newIndex
            : index >= Math.min(oldIndex, newIndex) &&
              index <= Math.max(oldIndex, newIndex)
            ? oldIndex < newIndex
              ? index - 1
              : index + 1
            : index,
      }));

      onTasksReorder(updatedTasks);
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={tasks.map((task) => task._id)}
        strategy={verticalListSortingStrategy}
      >
        <div className="space-y-3 p-2 rounded-lg">
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onComplete={onTaskComplete}
              onDelete={onTaskDelete}
            />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
}
