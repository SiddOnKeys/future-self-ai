import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { LogOut, Sparkles } from "lucide-react";

export function DashboardPage() {
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-50 to-dark-100 dark:from-dark-900 dark:to-dark-800">
      {/* Header */}
      <header className="bg-white/80 dark:bg-dark-800/80 backdrop-blur-sm border-b border-white/20 dark:border-dark-700/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-future rounded-lg flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-display font-bold text-gradient">
                Future Self AI
              </h1>
            </div>
            <button
              onClick={handleSignOut}
              className="btn-secondary flex items-center gap-2"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h2 className="text-3xl font-display font-bold text-dark-900 dark:text-dark-100 mb-4">
            Welcome back, {user?.user_metadata?.name || "User"}!
          </h2>
          <p className="text-lg text-dark-600 dark:text-dark-400 mb-8">
            Your journey to your future self begins here.
          </p>

          <div className="card p-8 max-w-2xl mx-auto">
            <h3 className="text-xl font-semibold text-dark-900 dark:text-dark-100 mb-4">
              Coming Soon
            </h3>
            <p className="text-dark-600 dark:text-dark-400">
              We're building something amazing for you. The onboarding flow and
              persona generation will be available soon!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
