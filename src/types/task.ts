export interface Task {
  _id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  order: number;
  relatedTasks: Task[];
  createdAt: string;
  updatedAt: string;
}
