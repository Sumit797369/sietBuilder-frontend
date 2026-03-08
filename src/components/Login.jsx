import React from "react";
import { motion } from "framer-motion";

const Login = ({ open, onClose }) => {

  if (!open) return null;

  return (

    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >

      {/* Modal Card */}

      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl p-8 relative"
      >

        {/* Close Button */}

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white"
        >
          ✕
        </button>

        {/* Title */}

        <h2 className="text-2xl font-semibold mb-2">
          Welcome Back
        </h2>

        <p className="text-sm text-zinc-400 mb-6">
          Login to continue building websites
        </p>


        {/* Email */}

        <div className="mb-4">

          <label className="text-sm text-zinc-400">
            Email
          </label>

          <input
            type="email"
            placeholder="you@example.com"
            className="mt-2 w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-white/30"
          />

        </div>


        {/* Password */}

        <div className="mb-6">

          <label className="text-sm text-zinc-400">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            className="mt-2 w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-white/30"
          />

        </div>


        {/* Login Button */}

        <button
          className="w-full py-3 rounded-lg bg-white text-black font-medium hover:bg-zinc-200 transition"
        >
          Login
        </button>


        {/* Divider */}

        <div className="flex items-center gap-3 my-6 text-xs text-zinc-500">
          <div className="flex-1 h-px bg-white/10"></div>
          OR
          <div className="flex-1 h-px bg-white/10"></div>
        </div>


        {/* Google Login */}

        <button
          className="w-full py-3 rounded-lg border border-white/10 hover:bg-white/10 text-sm transition"
        >
          Continue with Google
        </button>


        {/* Footer */}

        <p className="text-xs text-zinc-400 text-center mt-6">
          Don't have an account? <span className="text-white cursor-pointer">Sign up</span>
        </p>

      </motion.div>

    </motion.div>

  );
};

export default Login;