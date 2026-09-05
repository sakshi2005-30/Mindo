import React, { useState } from "react";
import axios from "axios";
import { Input } from "./ui/InputComponent";
import { api } from "../services/api";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface signUpProps {
  onSwitchToSignIn: () => void;
}

export const Signup = (props: signUpProps) => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
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
      const response = await api.post("/users/signup", {
        username,
        password,
        email,
      });
      setSuccess(response.data.message || "Account created successfully");
      await signup();

      setEmail("");
      setUsername("");
      setPassword("");
      navigate("/dashboard");
    } catch (err: any) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.message || "Signup failed");
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
        <h1 className="text-2xl font-bold text-gray-900">Sign Up</h1>
        <p className="text-xs text-gray-400">
          Create an account to manage your links
        </p>
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
          label="Email"
          type="email"
          required={true}
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          {loading ? "Creating account..." : "Sign Up"}
        </button>
      </form>

      <div className="text-center text-xs text-gray-400">
        Already have an account?{" "}
        <button
          type="button"
          onClick={props.onSwitchToSignIn}
          className="text-blue font-medium hover:underline cursor-pointer"
        >
          Sign In
        </button>
      </div>
    </div>
  );
};
