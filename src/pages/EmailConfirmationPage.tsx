import React from "react";
import { Link } from "react-router-dom";
import { Mail, Sparkles, ArrowRight, RefreshCw } from "lucide-react";

export function EmailConfirmationPage() {
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
      <div
        className="absolute top-1/2 left-1/4 w-16 h-16 bg-gradient-accent rounded-full opacity-20 floating"
        style={{ animationDelay: "4s" }}
      ></div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-future rounded-2xl mb-6">
            <Mail className="h-10 w-10 text-white" />
          </div>
          <h1 className="text-3xl font-display font-bold text-gradient mb-3">
            Check Your Email
          </h1>
          <p className="text-dark-600 dark:text-dark-400 text-lg">
            We've sent you a confirmation link
          </p>
        </div>

        {/* Content */}
        <div className="card p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-4">
              <Sparkles className="h-8 w-8 text-white" />
            </div>
            <h2 className="text-xl font-semibold text-dark-900 dark:text-dark-100 mb-3">
              Almost there!
            </h2>
            <p className="text-dark-600 dark:text-dark-400 mb-6">
              Please check your email and click the confirmation link to
              activate your account and start your journey with Future Self AI.
            </p>
          </div>

          {/* Email testing info for development */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
            <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
              <strong>Development Note:</strong>
            </p>
            <p className="text-xs text-blue-600 dark:text-blue-400">
              Since you're using local Supabase, you can view the confirmation
              email at:{" "}
              <a
                href="http://127.0.0.1:54324"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:opacity-80"
              >
                http://127.0.0.1:54324
              </a>
            </p>
          </div>

          {/* Actions */}
          <div className="space-y-4">
            <button
              onClick={() => window.location.reload()}
              className="btn-secondary w-full flex items-center justify-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Resend Confirmation Email
            </button>

            <Link
              to="/login"
              className="btn-primary w-full flex items-center justify-center gap-2"
            >
              Go to Login
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-dark-500 dark:text-dark-400">
              Didn't receive the email? Check your spam folder or{" "}
              <button className="text-gradient hover:opacity-80 transition-opacity">
                contact support
              </button>
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-dark-500 dark:text-dark-400">
            Your journey to your future self begins with this confirmation
          </p>
        </div>
      </div>
    </div>
  );
}
