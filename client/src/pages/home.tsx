import { useState } from "react";
import LoginCard from "@/components/LoginCard";
import RegisterCard from "@/components/RegisterCard";
import { useLocation } from "wouter";

type View = "login" | "register" | "admin-login";

export default function Home() {
  const [view, setView] = useState<View>("login");
  const [, setLocation] = useLocation();

  const handleUserLogin = (username: string, password: string) => {
    console.log("User login:", username, password);
    setLocation("/user-dashboard");
  };

  const handleAdminLogin = (username: string, password: string) => {
    console.log("Admin login:", username, password);
    //todo: remove mock functionality - validate admin credentials
    if (username === "admin" && password === "admin123") {
      setLocation("/admin-dashboard");
    } else {
      alert("Invalid admin credentials. Use admin/admin123");
    }
  };

  const handleRegister = (username: string, password: string, name: string, email: string) => {
    console.log("Register:", { username, password, name, email });
    setView("login");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="absolute top-4 right-4 flex gap-2">
        <button
          onClick={() => setView("login")}
          className={`px-4 py-2 text-sm rounded-md transition-colors ${
            view === "login"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover-elevate"
          }`}
          data-testid="button-user-login-tab"
        >
          User Login
        </button>
        <button
          onClick={() => setView("admin-login")}
          className={`px-4 py-2 text-sm rounded-md transition-colors ${
            view === "admin-login"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary text-secondary-foreground hover-elevate"
          }`}
          data-testid="button-admin-login-tab"
        >
          Admin Login
        </button>
      </div>

      {view === "login" && (
        <LoginCard
          title="User Login"
          description="Sign in to access your library account"
          onLogin={handleUserLogin}
          showRegister={true}
          onRegisterClick={() => setView("register")}
        />
      )}

      {view === "admin-login" && (
        <LoginCard
          title="Admin Login"
          description="Sign in to access the library management dashboard"
          onLogin={handleAdminLogin}
          showRegister={false}
        />
      )}

      {view === "register" && (
        <RegisterCard onRegister={handleRegister} onLoginClick={() => setView("login")} />
      )}
    </div>
  );
}
