import LoginCard from "../LoginCard";

export default function LoginCardExample() {
  return (
    <LoginCard
      title="Admin Login"
      description="Sign in to access the library management dashboard"
      onLogin={(username, password) => console.log("Login:", username, password)}
      showRegister={false}
    />
  );
}
