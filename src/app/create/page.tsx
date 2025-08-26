"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Rocket } from "lucide-react";
import { api } from "@/services/api";

const colorOptions = [
  { value: "red", label: "Red", className: "bg-red-500" },
  { value: "orange", label: "Orange", className: "bg-orange-500" },
  { value: "yellow", label: "Yellow", className: "bg-yellow-500" },
  { value: "green", label: "Green", className: "bg-green-500" },
  { value: "blue", label: "Blue", className: "bg-blue-500" },
  { value: "indigo", label: "Indigo", className: "bg-indigo-500" },
  { value: "purple", label: "Purple", className: "bg-purple-500" },
  { value: "pink", label: "Pink", className: "custom-pink" },
  { value: "brown", label: "Brown", className: "custom-brown" },
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
    <div className="min-h-screen" style={{ backgroundColor: "#1a1a1a" }}>
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
      </header>

      {/* Main Content */}
      <div
        className="max-w-2xl mx-auto px-4 py-8"
        style={{ backgroundColor: "#1a1a1a" }}
      >
        {/* Left Arrow */}
        <div className="mb-8">
          <button
            onClick={handleBack}
            className="cursor-pointer hover:opacity-80 transition-opacity"
            aria-label="Go back to main page"
          >
            <img src="/arrow.png" alt="Left Arrow" className="w-18 h-18" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title Field */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-bold mb-2"
                style={{ color: "#54a7dc" }}
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-gray-100 placeholder-gray-400"
                placeholder="Ex. Brush your teeth"
                required
              />
            </div>

            {/* Color Selection */}
            <div>
              <label
                className="block text-sm font-bold mb-2"
                style={{ color: "#54a7dc" }}
              >
                Color
              </label>
              <div className="flex flex-row space-x-4">
                {colorOptions.map((option) => (
                  <label
                    key={option.value}
                    className={`relative cursor-pointer transition-all ${
                      color === option.value ? "scale-110" : "hover:scale-105"
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
                    <div className="flex flex-col items-center space-y-2">
                      <div
                        className={`w-8 h-8 rounded-full ${
                          option.className
                        } border-2 transition-all ${
                          color === option.value
                            ? "border-white shadow-lg"
                            : "border-transparent hover:border-gray-400"
                        }`}
                        style={{
                          backgroundColor:
                            option.className === "custom-brown"
                              ? "#a2835e"
                              : option.className === "custom-pink"
                              ? "#ff2e54"
                              : undefined,
                        }}
                      ></div>
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
