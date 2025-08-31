import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";
import { Loader2, CheckCircle, XCircle, Sparkles } from "lucide-react";

export function EmailConfirmationHandler() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("");

  useEffect(() => {
    const handleEmailConfirmation = async () => {
      try {
        // Get the token from URL parameters
        const token = searchParams.get("token");
        const type = searchParams.get("type");

        if (!token) {
          setStatus("error");
          setMessage("Invalid confirmation link. Please try signing up again.");
          return;
        }

        // Confirm the email
        const { error } = await supabase.auth.verifyOtp({
          token_hash: token,
          type: (type as any) || "signup",
        });

        if (error) {
          console.error("Email confirmation error:", error);
          setStatus("error");
          setMessage(
            error.message || "Failed to confirm email. Please try again."
          );
          return;
        }

        // Email confirmed successfully
        setStatus("success");
        setMessage("Email confirmed successfully! Redirecting to dashboard...");

        // Auto-login the user and redirect to dashboard
        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 2000);
      } catch (error) {
        console.error("Unexpected error:", error);
        setStatus("error");
        setMessage("An unexpected error occurred. Please try again.");
      }
    };

    handleEmailConfirmation();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-future opacity-10"></div>

      {/* Floating elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-primary rounded-full opacity-20 floating"></div>
      <div
        className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-secondary rounded-full opacity-20 floating"
        style={{ animationDelay: "2s" }}
      ></div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-future rounded-2xl mb-6">
            <Sparkles className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-gradient mb-3">
            Email Confirmation
          </h1>
        </div>

        {/* Content */}
        <div className="card p-8 text-center">
          {status === "loading" && (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto">
                <Loader2 className="h-8 w-8 text-white animate-spin" />
              </div>
              <h2 className="text-xl font-semibold text-dark-900 dark:text-dark-100">
                Confirming your email...
              </h2>
              <p className="text-dark-600 dark:text-dark-400">
                Please wait while we verify your email address.
              </p>
            </div>
          )}

          {status === "success" && (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-dark-900 dark:text-dark-100">
                Email Confirmed!
              </h2>
              <p className="text-dark-600 dark:text-dark-400">{message}</p>
              <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto mt-4"></div>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-4">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto">
                <XCircle className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-xl font-semibold text-dark-900 dark:text-dark-100">
                Confirmation Failed
              </h2>
              <p className="text-dark-600 dark:text-dark-400">{message}</p>
              <div className="space-y-3 mt-6">
                <button
                  onClick={() => navigate("/signup")}
                  className="btn-primary w-full"
                >
                  Try Signing Up Again
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="btn-secondary w-full"
                >
                  Go to Login
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-dark-500 dark:text-dark-400">
            Welcome to your journey with Future Self AI
          </p>
        </div>
      </div>
    </div>
  );
}
