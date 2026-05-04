import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Login from "../components/Login";
import { useDispatch, useSelector } from "react-redux";
import { Coins } from "lucide-react";
import axios from "axios";
import { serverUrl } from "../App";
import { setUserData } from "../redux/userSlice";

const Home = () => {
  const navigate = useNavigate();

  const prompt = "Create a modern portfolio website for a photographer";

  const [text, setText] = useState("");
  const [step, setStep] = useState(0);

  const [openLogin, setOpenLogin] = useState(false);
  const { userData } = useSelector((state) => state.user);
  const [openProfile, setOpenProfile] = useState(false);
  const dispacth = useDispatch()
  const handleLogout = async()=>{
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, {withCredentials : true})
      dispacth(setUserData(null))
      setOpenProfile(false)
    } catch (error) {
      console.log(error);
      
    }
  }
  // typing animation
  useEffect(() => {
    let index = 0;

    const typing = setInterval(() => {
      setText(prompt.slice(0, index + 1));
      index++;

      if (index === prompt.length) {
        clearInterval(typing);

        // website generation animation
        setTimeout(() => setStep(1), 800);
        setTimeout(() => setStep(2), 1500);
        setTimeout(() => setStep(3), 2300);
        setTimeout(() => setStep(4), 3100);
      }
    }, 40);

    return () => clearInterval(typing);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden relative">
      {/* background glow */}

      <div className="absolute -top-40 -left-40 w-[500px] h-[500px] bg-gray-300/20 blur-[140px] rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-green-500/20 blur-[140px] rounded-full"></div>

      {/* ================= NAVBAR ================= */}

      <motion.nav
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 backdrop-blur-lg bg-black/40 border-b border-white/10 z-50"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-lg font-semibold"
          >
            Site Builder
          </motion.h1>

          <div className="flex gap-6 items-center">
            <button
              onClick={() => navigate("/pricing")}
              className="text-zinc-400 hover:text-white"
            >
              Pricing
            </button>
            {userData && (
              <div className="hidden md:flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
                <Coins className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-zinc-300">Credits</span>
                <span className="text-sm font-semibold text-white">
                  {userData?.credits}
                </span>
                <button className="ml-1 text-xs bg-yellow-400 text-black px-2 py-0.5 rounded-full hover:bg-yellow-300 transition">
                  +
                </button>
              </div>
            )}
            {!userData ? (
              <button
                // onClick={() => navigate("/login")}
                onClick={() => setOpenLogin(true)}
                className="px-4 py-2 rounded-lg bg-white text-black hover:bg-white/85 font-medium"
              >
                Get Started
              </button>
            ) : (
              <div
                className="relative"
                onMouseEnter={() => setOpenProfile(true)}
                onMouseLeave={() => setOpenProfile(false)}
              >
                <button
                  className="flex items-center"
                  onClick={() => setOpenProfile(!openProfile)}
                >
                  <img
                    src={
                      userData.avatar ||
                      `https://ui-avatars.com/api/?name=${userData.name}`
                    }
                    className="w-9 h-9 rounded-full border border-black object-cover"
                  />
                </button>
       <AnimatePresence>
  {openProfile && (
    <motion.div
      initial={{ opacity: 0, y: -10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -10, scale: 0.95 }}
      transition={{ duration: 0.2 }}
      className="
        absolute right-0 mt-3 
        w-[90vw] max-w-xs sm:w-64 
        bg-black/90 backdrop-blur-xl 
        border border-white/10 
        rounded-xl p-4 shadow-xl z-50
      "
    >
      {/* User Info */}
      <div className="flex flex-col gap-1">
        <p className="text-sm font-semibold text-white">
          {userData?.name || "User"}
        </p>
        <p className="text-xs text-zinc-400 truncate">
          {userData?.email}
        </p>
      </div>

      {/* Divider */}
      <div className="h-px bg-white/10 my-3"></div>

      {/* Credits */}
      <div className="flex items-center justify-between bg-white/5 px-3 py-2 rounded-lg md:hidden">
        <div className="flex items-center gap-2">
          <Coins className="w-4 h-4 text-yellow-400" />
          <span className="text-sm text-zinc-300">Credits</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm font-semibold text-white">
            {userData?.credits}
          </span>

          <button className="text-xs bg-yellow-400 text-black px-2 py-0.5 rounded-full hover:bg-yellow-300 transition">
            +
          </button>
        </div>
      </div>

      {/* Actions */}
      <div className="mt-3 flex flex-col gap-2">
        <button className="text-sm text-zinc-300 hover:text-white text-left">
          View Profile
        </button>

        <button className="text-sm text-red-400 hover:text-red-300 text-left" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </motion.div>
  )}
</AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </motion.nav>

      {/* ================= HERO ================= */}

      <section className="pt-40 max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
        {/* LEFT SIDE TEXT */}

        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Turn Ideas Into
            <span className="block text-white/50">Real Websites</span>
          </h1>

          <p className="mt-6 text-zinc-400 max-w-md">
            Site Builder lets you generate full websites using AI. Just describe
            your idea and the platform builds layouts, components and responsive
            UI.
          </p>

          <div className="flex gap-4 mt-8">
            <button
              // onClick={() => navigate("/login")}
              onClick={() => setOpenLogin(true)}
              className="px-6 py-3 rounded-lg bg-white text-black hover:bg-white/85"
            >
              Start Building
            </button>

            <button
              onClick={() => navigate("/pricing")}
              className="px-6 py-3 rounded-lg border border-white/20 hover:bg-white/10"
            >
              View Pricing
            </button>
          </div>
        </motion.div>

        {/* RIGHT SIDE AI PREVIEW */}

        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-xl"
        >
          {/* prompt */}

          <div className="bg-black/40 rounded-lg p-4 border border-white/10">
            <div className="text-sm text-zinc-400 mb-3">Prompt</div>

            <div className="bg-black rounded-md p-3 text-sm text-zinc-300 font-mono min-h-[40px]">
              {text}

              <span className="animate-pulse">|</span>
            </div>
          </div>

          {/* generating */}

          {step === 1 && (
            <div className="mt-6 text-sm text-zinc-400">
              Generating website...
            </div>
          )}

          {/* mini generated photographer site */}

          {step >= 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 border border-white/10 rounded-lg overflow-hidden bg-white text-black"
            >
              {/* mini navbar */}

              <div className="flex justify-between items-center px-4 py-2 border-b text-xs">
                <div className="font-semibold">PhotoStudio</div>

                <div className="flex gap-3 text-gray-500">
                  <span>Home</span>
                  <span>Gallery</span>
                  <span>Contact</span>
                </div>
              </div>

              {/* hero image */}

              {step >= 3 && (
                <div className="relative h-28">
                  <img
                    src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee"
                    className="w-full h-full object-cover"
                  />

                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white text-sm font-semibold">
                    Photography Portfolio
                  </div>
                </div>
              )}

              {/* gallery */}

              {step >= 4 && (
                <div className="grid grid-cols-3 gap-1 p-2">
                  <img
                    src="https://images.unsplash.com/photo-1492724441997-5dc865305da7"
                    className="h-14 w-full object-cover rounded"
                  />

                  <img
                    src="https://images.unsplash.com/photo-1504203700686-0f4d87d0b2a1"
                    className="h-14 w-full object-cover rounded"
                  />

                  <img
                    src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e"
                    className="h-14 w-full object-cover rounded"
                  />
                </div>
              )}
            </motion.div>
          )}
        </motion.div>
      </section>

      {/* ================= FEATURES ================= */}

      <section className="max-w-7xl mx-auto px-6 mt-32 grid md:grid-cols-3 gap-8">
        {["AI Website Generation", "Clean Code Output", "Deploy Ready"].map(
          (item, i) => (
            <motion.div
              key={i}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.2 }}
              className="bg-white/5 border border-white/10 rounded-xl p-6"
            >
              <h3 className="text-lg font-semibold mb-2">{item}</h3>

              <p className="text-sm text-zinc-400">
                Site Builder generates modern websites using AI prompts.
              </p>
            </motion.div>
          ),
        )}
      </section>

      {/* ================= CTA ================= */}

      <section className="max-w-4xl mx-auto text-center mt-32 pb-32 px-6">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl font-bold"
        >
          Start building with AI today
        </motion.h2>

        <p className="text-zinc-400 mt-4">
          Generate complete websites in seconds.
        </p>

        <button
          onClick={() => setOpenLogin(true)}
          // onClick={() => navigate("/login")}
          className="mt-8 px-8 py-4 rounded-xl bg-white text-black hover:bg-white/85 font-semibold"
        >
          Get Started
        </button>
      </section>
      <footer className="bg-black border-t border-white/10 mt-32">
        <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-4 gap-10">
          {/* Logo + About */}

          <div>
            <h2 className="text-xl font-semibold">Site Builder</h2>

            <p className="text-zinc-400 text-sm mt-4">
              Generate modern websites using AI prompts. Build, customize and
              deploy faster than ever.
            </p>
          </div>

          {/* Product */}

          <div>
            <h3 className="font-semibold mb-4">Product</h3>

            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="hover:text-white cursor-pointer">Features</li>

              <li className="hover:text-white cursor-pointer">Pricing</li>

              <li className="hover:text-white cursor-pointer">Integrations</li>
            </ul>
          </div>

          {/* Resources */}

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>

            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="hover:text-white cursor-pointer">Documentation</li>

              <li className="hover:text-white cursor-pointer">Guides</li>

              <li className="hover:text-white cursor-pointer">Support</li>
            </ul>
          </div>

          {/* Company */}

          <div>
            <h3 className="font-semibold mb-4">Company</h3>

            <ul className="space-y-2 text-sm text-zinc-400">
              <li className="hover:text-white cursor-pointer">About</li>

              <li className="hover:text-white cursor-pointer">Contact</li>

              <li className="hover:text-white cursor-pointer">
                Privacy Policy
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}

        <div className="border-t border-white/10">
          <div className="max-w-7xl mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center text-sm text-zinc-500">
            {/* <p>
            © 2026 GenoSite. All rights reserved.
          </p> */}

            <div className="flex gap-4 mt-4 md:mt-0">
              <a
                href="https://github.com/Sumit797369"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white cursor-pointer"
              >
                GitHub
              </a>

              <a
                href="https://www.linkedin.com/in/sumit-kumar-aab043312/?skipRedirect=true"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white cursor-pointer"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </footer>
      <Login open={openLogin} onClose={() => setOpenLogin(false)} />
    </div>
  );
};

export default Home;
