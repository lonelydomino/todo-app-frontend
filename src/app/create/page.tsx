"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Rocket } from "lucide-react";
import { api } from "@/services/api";

const colorOptions = [
  { value: "red", label: "Red", className: "bg-red-500" },
  { value: "blue", label: "Blue", className: "bg-blue-500" },
  { value: "green", label: "Green", className: "bg-green-500" },
  { value: "yellow", label: "Yellow", className: "bg-yellow-500" },
  { value: "purple", label: "Purple", className: "bg-purple-500" },
  { value: "pink", label: "Pink", className: "bg-pink-500" },
];

export default function CreateTaskPage() {
  const [title, setTitle] = useState("");
  const [color, setColor] = useState("blue");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      setError("Title is required");
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await api.createTask({ title: title.trim(), color });
      router.push("/");
    } catch (err) {
      setError("Failed to create task");
      console.error("Error creating task:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push("/");
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Black Header Bar */}
      <header className="bg-black shadow-lg border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="flex items-center justify-center space-x-12">
            {/* App Title with Rocket Icon */}
            <div className="flex items-center">
              <Rocket className="w-8 h-8 mr-3 bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent" />
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
                Todo App
              </h1>
            </div>

            {/* Back Button */}
            <button
              onClick={handleBack}
              className="inline-flex items-center space-x-2 px-4 py-2 text-gray-300 bg-gray-800 hover:bg-gray-700 rounded-md transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-8">
        {/* Page Title */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-100">Create New Task</h2>
        </div>

        {/* Form */}
        <div className="bg-gray-800 rounded-lg shadow-lg border border-gray-700 p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Task Title *
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 placeholder-gray-400"
                placeholder="Enter task title..."
                required
              />
            </div>

            {/* Color Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Color
              </label>
              <div className="grid grid-cols-3 gap-3">
                {colorOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`relative cursor-pointer rounded-lg p-3 border-2 transition-all ${
                      color === option.value
                        ? "border-blue-500 shadow-lg shadow-blue-500/25"
                        : "border-gray-600 hover:border-gray-500"
                    }`}
                  >
                    <input
                      type="radio"
                      name="color"
                      value={option.value}
                      checked={color === option.value}
                      onChange={(e) => setColor(e.target.value)}
                      className="sr-only"
                    />
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-4 h-4 rounded-full ${option.className}`}
                      ></div>
                      <span className="text-sm font-medium text-gray-300">
                        {option.label}
                      </span>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="text-red-400 text-sm bg-red-900/20 border border-red-700 rounded-md p-3">
                {error}
              </div>
            )}

            {/* Form Actions */}
            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={handleBack}
                className="px-4 py-2 text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading || !title.trim()}
                className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-medium rounded-md transition-colors disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <Save className="w-4 h-4" />
                )}
                <span>{loading ? "Creating..." : "Create Task"}</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
