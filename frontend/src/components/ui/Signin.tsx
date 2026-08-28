import React, { useState } from "react";
import axios from "axios";
import { Input } from "../InputComponent";
import { api } from "../../services/api";
import { CrossIcon } from "../../icons/PlusIcon";

interface signInProps {
  onSwitchToSignUp: () => void;
}
export const Signin = (props: signInProps) => {
  const [username, setUsername] = useState<string>("");

  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const handleSubmit = async (e: React.ChangeEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const response = await api.post("/users/signin", { username, password });
      setSuccess(response.data.message || "Signed in successfully");

      setUsername("");
      setPassword("");
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
    <div className="min-h-screen fixed inset-0  z-50 flex items-center justify-center p-4 ">
      <div className="w-full sm:w-74 bg-white border rounded-lg flex flex-col items-left px-4 sm:px-6 py-6 border-gray-200 m-2 sm:m-6 shadow-md gap-4 sm:gap-6">
        {/* header */}
        <div className="flex flex-col gap-1">
          <div className="flex justify-between">
            <h1 className="text-lg font-medium text-blue">Sign In</h1>
            <div className="hover:bg-light-blue p-2 rounded-full hover:text-blue transition-all duration-300 cursor-pointer">
              {" "}
              <CrossIcon size="md" />
            </div>
          </div>

          <p className="text-xs text-gray-400">Sign in to your account </p>
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
            className="w-full bg-blue text-white text-xs font-medium rounded-lg px-4 py-2 hover:bg-blue/95 hover:shadow-lg hover:shadow-blue/50 cursor-pointer transition transform duration-300 hover:-translate-y-0.5 flex justify-center items-center disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <div className="text-center text-xs text-gray-400">
          Don't have an account?{" "}
          <a
            onClick={props.onSwitchToSignUp}
            className="text-blue font-medium hover:underline cursor-pointer"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};
