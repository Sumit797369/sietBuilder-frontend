import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, provider } from "../firebase";
import axios from "axios";
import { serverUrl } from "../App";

const Login = ({ open, onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleFirebaseError = (error) => {
    switch (error.code) {
      case "auth/email-already-in-use":
        setErrorMsg("This email is already registered.");
        break;
      case "auth/invalid-email":
        setErrorMsg("Invalid email format.");
        break;
      case "auth/user-not-found":
        setErrorMsg("No account found with this email.");
        break;
      case "auth/wrong-password":
      case "auth/invalid-credential":
        setErrorMsg("Incorrect email or password.");
        break;
      case "auth/network-request-failed":
        setErrorMsg("Network error. Please try again.");
        break;
      case "auth/weak-password":
        setErrorMsg("Password should be at least 6 characters.");
        break;
      default:
        setErrorMsg(error.message || "An authentication error occurred.");
    }
  };

  // Google Login
  const handleGoogleAuth = async () => {
    try {
      setErrorMsg("");
      const result = await signInWithPopup(auth, provider);

      const { data } = await axios.post(`${serverUrl}/api/auth/google`, {
        name: result.user.displayName,
        email: result.user.email,
        avatar: result.user.photoURL,
      }, {
        withCredentials: true
      });

      onClose();
    } catch (error) {
      if (error.code !== "auth/popup-closed-by-user") {
        setErrorMsg(error.message || "Google auth failed.");
      }
    }
  };

  // Email Login
  const handleLogin = async () => {
    try {
      setErrorMsg("");
      const result = await signInWithEmailAndPassword(auth, email, password);

      await axios.post(`${serverUrl}/api/auth/google`, {
        name: result.user.displayName || "User",
        email: result.user.email,
        avatar: result.user.photoURL || "",
      }, {
        withCredentials: true
      });

      onClose();
    } catch (error) {
      handleFirebaseError(error);
    }
  };

  // Signup
  const handleSignup = async () => {
    if (!name.trim()) return setErrorMsg("Name is required.");
    try {
      setErrorMsg("");
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(result.user, {
        displayName: name,
      });

      await axios.post(`${serverUrl}/api/auth/google`, {
        name: name,
        email: result.user.email,
        avatar: "",
      }, {
        withCredentials: true
      });

      onClose();
    } catch (error) {
      handleFirebaseError(error);
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

        {/* Error message display */}
        {errorMsg && (
          <div className="mb-4 text-sm text-red-500 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            {errorMsg}
          </div>
        )}

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
            onClick={() => {
              setIsSignup(!isSignup);
              setErrorMsg("");
            }}
            className="text-white cursor-pointer ml-1 hover:underline"
          >
            {isSignup ? "Login" : "Sign up"}
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
};

export default Login;