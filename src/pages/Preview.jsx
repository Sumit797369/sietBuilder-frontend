import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { serverUrl } from "../App";
import { ArrowLeft } from "lucide-react";

const Preview = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [website, setWebsite] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchWebsite = async () => {
      try {
        const { data } = await axios.get(`${serverUrl}/api/website/${slug}`);
        setWebsite(data);
      } catch (err) {
        console.error(err);
        setError(true);
      }
    };
    fetchWebsite();
  }, [slug]);

  if (error) {
    return (
      <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Website Not Found</h1>
        <button onClick={() => navigate("/")} className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition">Go Home</button>
      </div>
    );
  }

  if (!website) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const getPreviewHtml = () => {
    try {
      const parsed = typeof website.latesCode === "string" ? JSON.parse(website.latesCode) : website.latesCode;
      
      if (parsed && parsed.code) {
        return parsed.code;
      }

      if (parsed && parsed.files) {
        const htmlFile = parsed.files.find((f) => f.path.endsWith(".html") || f.path === "index.html");
        if (htmlFile) {
          let html = htmlFile.content;
          const cssFile = parsed.files.find((f) => f.path.endsWith(".css"));
          const jsFile = parsed.files.find((f) => f.path.endsWith(".js"));

          if (cssFile && !html.includes(cssFile.content)) {
            if (html.includes("</head>")) {
              html = html.replace("</head>", `<style>${cssFile.content}</style></head>`);
            } else {
              html = `<style>${cssFile.content}</style>` + html;
            }
          }
          if (jsFile && !html.includes(jsFile.content)) {
            if (html.includes("</body>")) {
              html = html.replace("</body>", `<script>${jsFile.content}</script></body>`);
            } else {
              html += `<script>${jsFile.content}</script>`;
            }
          }
          return html;
        }
      }
      return "<h1>No HTML file found</h1>";
    } catch (e) {
      console.error(e);
      return "<h1>Error parsing code</h1>";
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 p-4 md:p-8 flex flex-col items-center justify-center">
      <div className="w-full max-w-7xl flex flex-col h-[90vh] bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 shadow-2xl relative">
        {/* Browser Top Bar */}
        <div className="bg-zinc-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
          </div>
          <div className="flex-1 flex justify-center absolute left-0 right-0 pointer-events-none">
             <div className="bg-zinc-900 px-6 py-1 rounded-full text-xs text-zinc-400 font-mono select-none">
                {website.slug}.preview.app
             </div>
          </div>
          <div className="z-10">
            <button onClick={() => navigate("/")} className="text-zinc-400 hover:text-white transition cursor-pointer">
              <ArrowLeft size={18} />
            </button>
          </div>
        </div>
        
        {/* Iframe Container */}
        <div className="flex-1 w-full bg-white relative">
          <iframe
            title="Preview"
            srcDoc={getPreviewHtml()}
            className="absolute top-0 left-0 w-full h-full border-none"
            sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          />
        </div>
      </div>
    </div>
  );
};

export default Preview;
