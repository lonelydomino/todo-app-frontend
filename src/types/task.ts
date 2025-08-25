export interface Task {
  id: number;
  title: string;
  color: string;
  completed: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskData {
  title: string;
  color: string;
}

export interface UpdateTaskData {
  title?: string;
  color?: string;
  completed?: boolean;
}
