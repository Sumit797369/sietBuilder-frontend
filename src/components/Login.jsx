import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, provider } from "../firebase";

const Login = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignup, setIsSignup] = useState(false);

  // Google Login
  const handleGoogleAuth = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log("Google Login:", result.user);
      onClose();
    } catch (error) {
      console.error(error);
    }
  };

  // Email Login
  const handleLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log("Logged in:", result.user);
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  // Signup
  const handleSignup = async () => {
    try {
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(result.user, {
        displayName: name,
      });

      console.log("Signup successful:", result.user);
      onClose();
    } catch (error) {
      console.error(error.message);
    }
  };

  if (!open) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full max-w-md bg-white/5 border border-white/10 rounded-2xl backdrop-blur-xl p-8 relative"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-2xl font-semibold mb-2">
          {isSignup ? "Create Account" : "Welcome"}
        </h2>

        <p className="text-sm text-zinc-400 mb-6">
          {isSignup
            ? "Signup to start building websites"
            : "Login to continue building websites"}
        </p>

        {/* Name (Signup only) */}

        {isSignup && (
          <div className="mb-4">
            <label className="text-sm text-zinc-400">Name</label>

            <input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-2 w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-white/30"
            />
          </div>
        )}

        {/* Email */}

        <div className="mb-4">
          <label className="text-sm text-zinc-400">Email</label>

          <input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-white/30"
          />
        </div>

        {/* Password */}

        <div className="mb-6">
          <label className="text-sm text-zinc-400">Password</label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full bg-black/40 border border-white/10 rounded-lg px-4 py-3 text-sm outline-none focus:border-white/30"
          />
        </div>

        {/* Login / Signup Button */}

        <button
          onClick={isSignup ? handleSignup : handleLogin}
          className="w-full py-3 rounded-lg bg-white text-black font-medium hover:bg-zinc-200 transition"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>

        {/* Divider */}

        <div className="flex items-center gap-3 my-6 text-xs text-zinc-500">
          <div className="flex-1 h-px bg-white/10"></div>
          OR
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        {/* Google Login */}

        <button
          onClick={handleGoogleAuth}
          className="w-full py-3 rounded-lg border border-white/10 hover:bg-white/10 text-sm transition"
        >
          <div className="relative flex items-center justify-center gap-2">
            <img
              src="https://www.svgrepo.com/show/303108/google-icon-logo.svg"
              alt=""
              className="h-5 w-5"
            />
            Continue with Google
          </div>
        </button>

        {/* Footer */}

        <p className="text-xs text-zinc-400 text-center mt-6">
          {isSignup ? "Already have an account?" : "Don't have an account?"}

          <span
            onClick={() => setIsSignup(!isSignup)}
            className="text-white cursor-pointer ml-1"
          >
            {isSignup ? "Login" : "Sign up"}
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Login;