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
  red: "bg-red-900/20 border-red-500/30 text-red-400",
  blue: "bg-blue-900/20 border-blue-500/30 text-blue-400",
  green: "bg-green-900/20 border-green-500/30 text-green-400",
  yellow: "bg-yellow-900/20 border-yellow-500/30 text-yellow-400",
  purple: "bg-purple-900/20 border-purple-500/30 text-purple-400",
  pink: "bg-pink-900/20 border-pink-500/30 text-pink-400",
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
      className={`bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-4 transition-all duration-200 hover:shadow-xl hover:border-gray-600 ${
        task.completed ? "opacity-75" : ""
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3 flex-1">
          {/* Completion Toggle */}
          <button
            onClick={() => onToggleCompletion(task.id, !task.completed)}
            className="transition-all duration-200 hover:scale-105"
            aria-label={
              task.completed ? "Mark as incomplete" : "Mark as complete"
            }
          >
            {task.completed ? (
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center"
                style={{ backgroundColor: "#5859bd" }}
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="white"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            ) : (
              <div className="w-6 h-6 rounded-full border-2 border-gray-400 hover:border-gray-300 transition-colors"></div>
            )}
          </button>

          {/* Task Content */}
          <div className="flex-1 min-w-0">
            <h3
              className={`text-lg font-medium ${
                task.completed ? "line-through text-gray-500" : "text-gray-100"
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
              <span className="text-xs text-gray-400">
                {new Date(task.createdAt).toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 ml-4">
          <button
            onClick={() => onEdit(task)}
            className="p-2 text-gray-400 hover:text-blue-400 hover:bg-blue-900/20 rounded-lg transition-colors"
            aria-label="Edit task"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(task.id)}
            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-900/20 rounded-lg transition-colors"
            aria-label="Delete task"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
