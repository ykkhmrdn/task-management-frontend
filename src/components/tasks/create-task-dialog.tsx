import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { Task } from "@/types/task";

interface CreateTaskDialogProps {
  onTaskCreate: (task: Pick<Task, "title" | "description">) => void;
}

export function CreateTaskDialog({ onTaskCreate }: CreateTaskDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onTaskCreate({ title, description });
    setTitle("");
    setDescription("");
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gradient-primary text-white hover:opacity-90 transition-opacity rounded">
          <Plus className="mr-2 h-4 w-4" /> Add New Task
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white border-none shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Create New Task
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Title</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded"
              placeholder="Enter task title"
              required
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Description
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border-gray-200 focus:border-indigo-500 focus:ring-indigo-500 rounded"
              placeholder="Enter task description"
              required
            />
          </div>
          <div className="flex justify-end space-x-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              className="text-gray-700 border-gray-200 hover:bg-gray-50 rounded"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="gradient-primary text-white rounded"
            >
              Create Task
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
