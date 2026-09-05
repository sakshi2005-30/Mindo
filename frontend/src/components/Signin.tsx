import React, { useState } from "react";
import axios from "axios";
import { Input } from "./ui/InputComponent";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface signInProps {
  onSwitchToSignUp: () => void;
}

export const Signin = (props: signInProps) => {
  const navigate = useNavigate();
  const { signin } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const response = await api.post("/users/signin", { username, password });
      setSuccess(response.data.message || "Signed in successfully");
      await signin();
      setUsername("");
      setPassword("");
      navigate("/dashboard");
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Signin failed");
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-sm mx-auto flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-bold text-gray-900">Sign In</h1>
        <p className="text-xs text-gray-400">Sign in to your account</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-xs p-2.5 rounded-lg">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-50 border border-green-200 text-green-600 text-xs p-2.5 rounded-lg">
          {success}
        </div>
      )}

      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <Input
          label="Username"
          type="text"
          required={true}
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          label="Password"
          required={true}
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue text-white text-xs font-medium rounded-lg px-4 py-2.5 hover:bg-blue/95 hover:shadow-lg hover:shadow-blue/50 cursor-pointer transition transform duration-300 hover:-translate-y-0.5 flex justify-center items-center disabled:opacity-50 mt-2"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>
      </form>

      <div className="text-center text-xs text-gray-400">
        Don't have an account?{" "}
        <button
          type="button"
          onClick={props.onSwitchToSignUp}
          className="text-blue font-medium hover:underline cursor-pointer"
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};
