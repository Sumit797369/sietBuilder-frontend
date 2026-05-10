import React, { useState } from "react";
import { ArrowLeft, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios"
import { serverUrl } from "../App";
const Generate = () => {
  const navigate = useNavigate();
  const [prompt, setPrompt] = useState("");
  const [loading, setLoading] = useState(false);
  const [generatedWebsite, setGeneratedWebsite] = useState(null);

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setGeneratedWebsite(null);
    try {
      const result = await axios.post(`${serverUrl}/api/website/generate`, { prompt }, { withCredentials: true });
      setGeneratedWebsite(result.data.latesCode);
    } catch (error) {
      console.error(error.response?.data?.message || error.message);
      alert("Error: " + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };

  // Helper to get main HTML content
  const getPreviewHtml = () => {
    if (!generatedWebsite || !generatedWebsite.files) return "";
    const htmlFile = generatedWebsite.files.find(f => f.path.endsWith(".html") || f.path === "index.html");
    if (htmlFile) {
      // Very basic fallback to inject other files into head if it's simple vanilla
      let html = htmlFile.content;
      const cssFile = generatedWebsite.files.find(f => f.path.endsWith(".css"));
      const jsFile = generatedWebsite.files.find(f => f.path.endsWith(".js") && f.path !== "tailwind.config.js");
      
      if (cssFile && !html.includes(cssFile.content)) {
        html = html.replace("</head>", `<style>${cssFile.content}</style></head>`);
      }
      if (jsFile && !html.includes(jsFile.content)) {
        html = html.replace("</body>", `<script>${jsFile.content}</script></body>`);
      }
      return html;
    }
    return "<h1>Code Generated! (Requires a bundler to preview)</h1><pre>" + JSON.stringify(generatedWebsite.files, null, 2) + "</pre>";
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden flex flex-col">
      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gray-300/20 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-500/20 blur-[140px] rounded-full pointer-events-none"></div>
      
      {/* 🔝 Navbar */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-white/10 bg-black/70 backdrop-blur-md sticky top-0 z-50">
        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-lg font-semibold">Site Builder</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col md:flex-row w-full max-w-[1600px] mx-auto p-4 gap-6 z-10">
        
        {/* Left Side: Prompt Area */}
        <div className={`flex flex-col ${generatedWebsite ? 'md:w-1/3' : 'items-center justify-center w-full mt-20'} transition-all duration-500`}>
          {!generatedWebsite && (
            <>
              <motion.h1
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-3xl sm:text-5xl font-bold mb-4 text-center"
              >
                Build your website with AI
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 0.8, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-zinc-400 mb-8 max-w-xl text-center"
              >
                Describe your idea and let AI generate a complete website for you
              </motion.p>
            </>
          )}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
            className={`w-full ${!generatedWebsite ? 'max-w-2xl' : ''} bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md`}
          >
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Create a simple single-page portfolio using HTML and Tailwind CSS via CDN..."
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
                disabled={!prompt.trim() || loading}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition ${
                  prompt.trim() && !loading
                    ? "bg-white text-black hover:bg-zinc-200"
                    : "bg-zinc-700 text-zinc-400 cursor-not-allowed"
                }`}
              >
                <Sparkles className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                {loading ? "Generating..." : "Generate"}
              </motion.button>
            </div>
          </motion.div>

          {!generatedWebsite && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-6 flex flex-wrap justify-center gap-2"
            >
              {[
                "Simple HTML portfolio website",
                "Single page Tailwind landing page",
                "Dark theme pricing component",
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
          )}
        </div>

        {/* Right Side: Preview Area */}
        {generatedWebsite && (
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex-1 bg-white rounded-xl overflow-hidden border border-white/10 shadow-2xl relative min-h-[600px]"
          >
            {/* Window Controls UI (Windows Style) */}
            <div className="bg-zinc-200 border-b border-zinc-300 flex items-center justify-between select-none">
               <div className="flex items-center gap-2 px-3 py-2">
                 <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><line x1="3" x2="21" y1="9" y2="9"/><line x1="9" x2="9" y1="21" y2="9"/></svg>
                 <span className="text-xs text-zinc-700 font-medium">localhost:preview</span>
               </div>
               <div className="flex items-center h-full">
                 <div className="px-4 py-2 hover:bg-black/10 transition cursor-pointer text-zinc-700 flex items-center justify-center">
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" x2="19" y1="12" y2="12"/></svg>
                 </div>
                 <div className="px-4 py-2 hover:bg-black/10 transition cursor-pointer text-zinc-700 flex items-center justify-center">
                   <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/></svg>
                 </div>
                 <div className="px-4 py-2 hover:bg-red-500 hover:text-white transition cursor-pointer text-zinc-700 flex items-center justify-center">
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" x2="6" y1="6" y2="18"/><line x1="6" x2="18" y1="6" y2="18"/></svg>
                 </div>
               </div>
            </div>
            {/* Live iFrame */}
            <iframe 
              title="Live Preview"
              srcDoc={getPreviewHtml()} 
              className="w-full h-[calc(100%-48px)] bg-white border-none"
              sandbox="allow-scripts allow-same-origin allow-popups"
            />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Generate;