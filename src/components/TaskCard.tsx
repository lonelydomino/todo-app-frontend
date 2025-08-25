"use client";

import { Task } from "@/types/task";
import { CheckCircle, Circle, Trash2, Edit } from "lucide-react";

interface TaskCardProps {
  task: Task;
  onToggleCompletion: (id: number, completed: boolean) => void;
  onDelete: (id: number) => void;
  onEdit: (task: Task) => void;
}

const colorClasses = {
  red: "bg-red-100 border-red-300 text-red-800",
  blue: "bg-blue-100 border-blue-300 text-blue-800",
  green: "bg-green-100 border-green-300 text-green-800",
  yellow: "bg-yellow-100 border-yellow-300 text-yellow-800",
  purple: "bg-purple-100 border-purple-300 text-purple-800",
  pink: "bg-pink-100 border-pink-300 text-pink-800",
};

export default function TaskCard({
  task,
  onToggleCompletion,
  onDelete,
  onEdit,
}: TaskCardProps) {
  const colorClass =
    colorClasses[task.color as keyof typeof colorClasses] || colorClasses.blue;

  return (
    <div
      className={`bg-white rounded-lg shadow-sm border-2 p-4 transition-all duration-200 hover:shadow-md ${
        task.completed ? "opacity-75" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          {/* Completion Toggle */}
          <button
            onClick={() => onToggleCompletion(task.id, !task.completed)}
            className="text-gray-400 hover:text-green-500 transition-colors"
            aria-label={
              task.completed ? "Mark as incomplete" : "Mark as complete"
            }
          >
            {task.completed ? (
              <CheckCircle className="w-6 h-6 text-green-500" />
            ) : (
              <Circle className="w-6 h-6" />
            )}
          </button>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <h3
              className={`text-lg font-medium ${
                task.completed ? "line-through text-gray-500" : "text-gray-900"
              }`}
            >
              {task.title}
            </h3>
            <div className="flex items-center space-x-2 mt-1">
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium border ${colorClass}`}
              >
                {task.color}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
            aria-label="Edit task"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

