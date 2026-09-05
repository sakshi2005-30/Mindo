import { useState } from "react";
import { Signin } from "../components/Signin";
import { Signup } from "../components/SignUp";
import { BrainIcon } from "../components/icons/PlusIcon";

export const AuthLayout = () => {
  const [authType, setAuthType] = useState<"signin" | "signup">("signup");

  return (
    <div className="w-screen h-screen min-h-screen grid grid-cols-1 md:grid-cols-2 overflow-hidden bg-white">
      {/* Left Side: Visual/Branding Section */}
      <div className="hidden md:flex flex-col justify-between p-12 lg:p-16 bg-gradient-to-br from-blue via-blue to-slate-500 text-white relative overflow-hidden">
       
        <div className="absolute -top-24 -left-24 w-72 h-72 bg-blue-500/30 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-indigo-500/30 rounded-full blur-3xl pointer-events-none" />

        {/* Logo / Brand Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue flex items-center justify-center shadow-lg shadow-blue-500/30">
            <span className="font-black text-white text-xl"><BrainIcon size="md"/></span>
          </div>
          <span className="font-bold text-xl font-serif tracking-wide text-white">
            mindo
          </span>
        </div>

        {/* Value Proposition */}
        <div className="relative z-10 my-auto max-w-md">
          <h2 className="text-3xl lg:text-4xl font-extrabold leading-tight mb-4">
            Your digital second brain for organized thinking.
          </h2>
          <p className="text-sm text-slate-300 leading-relaxed">
            Bookmark videos, articles, and tweets into structured visual boards.
            Access everything seamlessly in one place.
          </p>
        </div>

       
        
      </div>

      {/* Right Side: Auth Form Container */}
      <div className="flex flex-col justify-center items-center p-8 lg:p-16 bg-white overflow-y-auto">
        <div className="w-full max-w-md">
          {authType === "signup" ? (
            <Signup onSwitchToSignIn={() => setAuthType("signin")} />
          ) : (
            <Signin onSwitchToSignUp={() => setAuthType("signup")} />
          )}
        </div>
      </div>
    </div>
  );
};
