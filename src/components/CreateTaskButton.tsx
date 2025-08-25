"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateTaskButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/create")}
      className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
    >
      <Plus className="w-5 h-5" />
      <span>Create Task</span>
    </button>
  );
}

