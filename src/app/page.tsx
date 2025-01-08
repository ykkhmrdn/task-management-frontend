"use client";

import { useEffect, useState } from "react";
import { Task } from "@/types/task";
import { taskApi } from "@/lib/api";
import { BoardColumn } from "@/components/tasks/board-column";
import { useToast } from "@/hooks/use-toast";
import { CreateTaskDialog } from "@/components/tasks/create-task-dialog";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { toast } = useToast();
  const [isCreateDialogOpen, setCreateDialogOpen] = useState(false);

  const todoTasks = tasks.filter((t) => !t.isCompleted);
  const completedTasks = tasks.filter((t) => t.isCompleted);

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      const response = await taskApi.getTasks();
      if (response.success) {
        setTasks(response.data);
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load tasks",
        variant: "destructive",
      });
    }
  }

  async function handleCreateTask(
    newTask: Pick<Task, "title" | "description">
  ) {
    try {
      const response = await taskApi.createTask(newTask);
      if (response.success) {
        setTasks((prev) => [...prev, response.data]);
        toast({
          title: "Success",
          description: "Task created successfully",
        });
      }
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
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
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to reorder tasks",
        variant: "destructive",
      });
    }
  }

  return (
    <div className="board-container">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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
