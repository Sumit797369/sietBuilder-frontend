import React, { useState } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Generate = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");

  const handleGenerate = () => {
    if (!prompt.trim()) return;
    console.log(prompt);
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gray-300/20 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-500/20 blur-[140px] rounded-full"></div>
      {/* 🔝 Navbar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10 bg-black/70 backdrop-blur-md sticky top-0 z-50">
        <div
          onClick={() => navigate("/")}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-lg font-semibold">Site Builder</span>
        </div>
      </div>

      {/* ✨ Animated Main */}
      <div className="flex flex-col items-center justify-center px-4 text-center mt-20">
        
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl font-bold mb-4"
        >
          Build your website with AI 🚀
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 0.8, y: 0 }}
          transition={{ delay: 0.2 }}
          className="text-zinc-400 mb-8 max-w-xl"
        >
          Describe your idea and let AI generate a complete website for you
        </motion.p>

        {/* Prompt Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3 }}
          className="w-full max-w-2xl bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md"
        >
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Create a SaaS landing page for an AI startup with dark theme..."
            className="w-full h-32 bg-transparent outline-none resize-none text-sm placeholder:text-zinc-500"
          />

          <div className="flex items-center justify-between mt-4">
            <span className="text-xs text-zinc-500">
              {prompt.length} characters
            </span>

            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.05 }}
              onClick={handleGenerate}
              disabled={!prompt.trim()}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                prompt.trim()
                  ? "bg-white text-black hover:bg-zinc-200"
                  : "bg-zinc-700 text-zinc-400 cursor-not-allowed"
              }`}
            >
              <Sparkles className="w-4 h-4" />
              Generate
            </motion.button>
          </div>
        </motion.div>

        {/* Suggestions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-6 flex flex-wrap justify-center gap-2"
        >
          {[
            "Portfolio website",
            "Startup landing page",
            "E-commerce store",
            "Blog website",
          ].map((item, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setPrompt(item)}
              className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition"
            >
              {item}
            </motion.button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Generate;