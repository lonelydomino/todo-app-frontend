"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateTaskButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/create")}
      className="inline-flex items-center space-x-3 text-white font-medium py-4 px-48 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
      style={{ backgroundColor: "#1d70a0" }}
      onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#1a5f8a")}
      onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1d70a0")}
    >
      <span className="text-lg">Create Task</span>
      <div className="bg-white rounded-full p-1">
        <Plus className="w-5 h-5" style={{ color: "#1d70a0" }} />
      </div>
    </button>
  );
}
