import { Signin } from "../components/ui/Signin";
import { Signup } from "../components/ui/SignUp";
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
