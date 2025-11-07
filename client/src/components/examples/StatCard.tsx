import StatCard from "../StatCard";
import { Users, BookOpen, Book } from "lucide-react";

export default function StatCardExample() {
  return (
    <div className="grid gap-6 md:grid-cols-3 p-6">
      <StatCard
        title="Total Users"
        value={142}
        icon={Users}
        description="Active library members"
      />
      <StatCard
        title="Total Books"
        value={1250}
        icon={Book}
        description="Books in catalog"
      />
      <StatCard
        title="Books Borrowed"
        value={89}
        icon={BookOpen}
        description="Currently checked out"
      />
    </div>
  );
}
