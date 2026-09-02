import { Signin } from "../components/Signin";
import { Signup } from "../components/SignUp";
import { useState } from "react";
export const AuthLayout = () => {
  const [authType, setAuthType] = useState<"signin" | "signup">("signup");
  return (
    <div className="bg-light-blue min-h-screen">
      {authType === "signup" && (
        <Signup onSwitchToSignIn={() => setAuthType("signin")} />
      )}
      {authType === "signin" && (
        <Signin onSwitchToSignUp={() => setAuthType("signup")} />
      )}
    </div>
  );
};
