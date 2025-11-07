import UserTableRow from "../UserTableRow";

export default function UserTableRowExample() {
  const users = [
    { id: "1", name: "John Doe", username: "johnd", email: "john@example.com", booksBorrowed: 3, booksRead: 12 },
    { id: "2", name: "Jane Smith", username: "janes", email: "jane@example.com", booksBorrowed: 1, booksRead: 8 },
    { id: "3", name: "Bob Johnson", username: "bobj", email: "bob@example.com", booksBorrowed: 5, booksRead: 20 },
  ];

  return (
    <div className="p-6">
      <div className="border rounded-md overflow-hidden">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-medium">User</th>
              <th className="py-3 px-6 text-left text-sm font-medium">Email</th>
              <th className="py-3 px-6 text-center text-sm font-medium">Borrowed</th>
              <th className="py-3 px-6 text-center text-sm font-medium">Read</th>
              <th className="py-3 px-6 text-right text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {users.map((user) => (
              <UserTableRow
                key={user.id}
                {...user}
                onRemove={(id) => console.log("Remove user:", id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
