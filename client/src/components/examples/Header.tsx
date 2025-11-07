import Header from "../Header";

export default function HeaderExample() {
  return (
    <Header
      userType="admin"
      userName="Admin User"
      onLogout={() => console.log("Logout clicked")}
    />
  );
}
