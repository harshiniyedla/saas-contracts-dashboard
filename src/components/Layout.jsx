import { useState } from "react";

export default function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-50">
      <div className={`bg-white border-r transition-all duration-300 ${sidebarOpen ? "w-64" : "w-16"}`}>
        <div className="flex items-center justify-between p-4 border-b">
          <span className="font-bold text-lg">{sidebarOpen ? "SaaS Dashboard" : "SD"}</span>
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 hover:text-gray-800">
            {sidebarOpen ? "<" : ">"}
          </button>
        </div>
      </div>
      <div className="flex-1 flex flex-col">
        <div className="bg-white border-b p-4 flex justify-end items-center">
          <button className="px-4 py-2 bg-teal-500 text-white rounded">User</button>
        </div>
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
    </div>
  );
}
