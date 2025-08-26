"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, Edit, Rocket, FileText } from "lucide-react";
import { Task } from "@/types/task";
import { api } from "@/services/api";
import TaskCard from "@/components/TaskCard";
import CreateTaskButton from "@/components/CreateTaskButton";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const fetchedTasks = await api.getTasks();
      setTasks(fetchedTasks);
      setError(null);
    } catch (err) {
      setError("Failed to fetch tasks");
      console.error("Error fetching tasks:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggleCompletion = async (id: number, completed: boolean) => {
    try {
      await api.toggleTaskCompletion(id, completed);
      setTasks(
        tasks.map((task) => (task.id === id ? { ...task, completed } : task))
      );
    } catch (err) {
      console.error("Error toggling task completion:", err);
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      try {
        await api.deleteTask(id);
        setTasks(tasks.filter((task) => task.id !== id));
      } catch (err) {
        console.error("Error deleting task:", err);
      }
    }
  };

  const handleEditTask = (task: Task) => {
    router.push(`/edit/${task.id}`);
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const totalCount = tasks.length;

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-gray-400">Loading tasks...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-xl text-red-400">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Black Header Bar */}
      <header className="bg-black shadow-lg border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-8 py-12">
          <div className="flex flex-col items-center space-y-6">
            {/* App Title with Rocket Icon */}
            <div className="flex items-center">
              <div className="w-8 h-8 mr-3 flex items-center justify-center">
                <img src="/rocket.png" alt="Rocket Logo" className="w-8 h-8" />
              </div>
              <h1 className="text-4xl font-black">
                <span style={{ color: "#51a8dc" }}>Todo</span>
                <span style={{ color: "#5e5ed3" }}> App</span>
              </h1>
            </div>
          </div>
        </div>

        {/* Create Task Button positioned on the bottom border */}
        <div className="flex justify-center -mb-6">
          <CreateTaskButton />
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Task Summary Counters positioned on opposite sides of the line */}
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-medium" style={{ color: "#51a8dc" }}>
              Tasks
            </span>
            <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-medium">
              {totalCount}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-purple-500 text-lg font-medium">
              Completed
            </span>
            <span className="bg-gray-700 text-white px-3 py-1 rounded-full text-sm font-medium">
              {completedCount}
            </span>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-b border-gray-700 mb-8"></div>

        {/* Task List or Empty State */}
        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="text-center py-16">
              <div className="flex justify-center mb-4">
                <FileText className="w-16 h-16 text-gray-600" />
              </div>
              <div className="text-gray-400 text-lg mb-2">
                You don't have any tasks registered yet.
              </div>
              <div className="text-gray-500 text-base">
                Create tasks and organize your to-do items.
              </div>
            </div>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onToggleCompletion={handleToggleCompletion}
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
