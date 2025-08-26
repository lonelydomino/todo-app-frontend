"use client";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateTaskButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.push("/create")}
      className="inline-flex items-center space-x-3 bg-blue-600 hover:bg-blue-700 text-white font-medium py-4 px-8 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
    >
      <span className="text-lg">Create Task</span>
      <div className="bg-white rounded-full p-1">
        <Plus className="w-5 h-5 text-blue-600" />
      </div>
    </button>
  );
}
