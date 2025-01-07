"use client";

import { useEffect, useState } from "react";
import { Task } from "@/types/task";
import { taskApi } from "@/lib/api";
import { TaskList } from "@/components/tasks/task-list";
import { CreateTaskDialog } from "@/components/tasks/create-task-dialog";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const { toast } = useToast();

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
    <main className="container mx-auto py-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Task Management</h1>
          <CreateTaskDialog onTaskCreate={handleCreateTask} />
        </div>

        {tasks.length === 0 ? (
          <div className="text-center py-10 text-muted-foreground">
            No tasks yet. Create one to get started!
          </div>
        ) : (
          <TaskList
            tasks={tasks}
            onTaskComplete={handleTaskComplete}
            onTaskDelete={handleTaskDelete}
            onTasksReorder={handleTasksReorder}
          />
        )}
      </div>
    </main>
  );
}
