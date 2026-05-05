import React from "react";
import { ArrowLeft, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gray-300/20 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-500/20 blur-[140px] rounded-full"></div>
      {/* 🔝 Top Navbar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10 bg-black/70 backdrop-blur-md sticky top-0 z-50">
        
        {/* Left: Back + Title */}
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-lg font-semibold">Dashboard</span>
        </div>

        {/* Right: New Website Button */}
        <button
          onClick={() => navigate("/generate")}
          className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-200 transition"
        >
          <Plus className="w-4 h-4" />
          New Website
        </button>
      </div>

      {/* 📦 Main Content */}
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4">
          Your Projects
        </h2>

        {/* Empty State */}
        <div className="flex flex-col items-center justify-center mt-20 text-center">
          <p className="text-zinc-400 mb-4">
            You haven't created any websites yet
          </p>

          <button
            onClick={() => navigate("/generate")}
            className="bg-white text-black px-5 py-2 rounded-lg text-sm font-medium hover:bg-zinc-200 transition"
          >
            Create your first website
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;