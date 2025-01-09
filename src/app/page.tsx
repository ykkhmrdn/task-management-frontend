// page.tsx
"use client";

import { useEffect, useState, useCallback } from "react";
import { Task } from "@/types/task";
import { taskApi } from "@/lib/api";
import { BoardColumn } from "@/components/tasks/board-column";
import { useToast } from "@/hooks/use-toast";
import { CreateTaskDialog } from "@/components/tasks/create-task-dialog";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading] = useState(true);
  const { toast } = useToast();
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);

  const todoTasks = tasks.filter((t) => !t.isCompleted);
  const completedTasks = tasks.filter((t) => t.isCompleted);

  const loadTasks = useCallback(async () => {
    try {
      const response = await taskApi.getTasks();
      if (response.success) {
        setTasks(response.data);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to load tasks",
        variant: "destructive",
      });
    }
  }, [toast]); // Tambahkan dependency toast

  useEffect(() => {
    loadTasks();
  }, [loadTasks]);

  async function handleCreateTask(
    newTask: Pick<Task, "title" | "description">
  ) {
    try {
      const response = await taskApi.createTask({
        ...newTask,
        order: -1,
      });
      if (response.success) {
        await loadTasks();
        setCreateDialogOpen(false);
        toast({
          title: "Success",
          description: "Task created successfully",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to create task",
        variant: "destructive",
      });
    }
  }

  async function handleTaskComplete(id: string, completed: boolean) {
    try {
      const response = await taskApi.updateTask(id, { isCompleted: completed });
      if (response.success) {
        setTasks((prev) =>
          prev.map((task) =>
            task._id === id ? { ...task, isCompleted: completed } : task
          )
        );
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
    }
  }

  async function handleTaskDelete(id: string) {
    try {
      const response = await taskApi.deleteTask(id);
      if (response.success) {
        setTasks((prev) => prev.filter((task) => task._id !== id));
        toast({
          title: "Success",
          description: "Task deleted successfully",
        });
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      });
    }
  }

  async function handleTasksReorder(updates: { _id: string; order: number }[]) {
    try {
      const response = await taskApi.reorderTasks(updates);
      if (response.success) {
        setTasks(response.data);
      }
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to reorder tasks",
        variant: "destructive",
      });
    }
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white">
      <nav className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Task Management
            </h1>
            <CreateTaskDialog
              open={isCreateDialogOpen}
              onOpenChange={setCreateDialogOpen}
              onTaskCreate={handleCreateTask}
            />
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <BoardColumn
            title="To Do"
            color="var(--accent-purple)"
            tasks={todoTasks}
            onAddTask={() => setCreateDialogOpen(true)}
            onTaskComplete={handleTaskComplete}
            onTaskDelete={handleTaskDelete}
            onTasksReorder={handleTasksReorder}
          />
          <BoardColumn
            title="Completed"
            color="var(--accent-blue)"
            tasks={completedTasks}
            onAddTask={() => setCreateDialogOpen(true)}
            onTaskComplete={handleTaskComplete}
            onTaskDelete={handleTaskDelete}
            onTasksReorder={handleTasksReorder}
          />
        </div>
      </main>
    </div>
  );
}
