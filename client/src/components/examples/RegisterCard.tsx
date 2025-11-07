import RegisterCard from "../RegisterCard";

export default function RegisterCardExample() {
  return (
    <RegisterCard
      onRegister={(username, password, name, email) => 
        console.log("Register:", { username, password, name, email })
      }
      onLoginClick={() => console.log("Navigate to login")}
    />
  );
}
