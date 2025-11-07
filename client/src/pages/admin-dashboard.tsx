import { useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import StatCard from "@/components/StatCard";
import UserTableRow from "@/components/UserTableRow";
import DeleteConfirmDialog from "@/components/DeleteConfirmDialog";
import ChatBot from "@/components/ChatBot";
import { Users, BookOpen, Book, UserPlus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import BookCard from "@/components/BookCard";
import AddBookDialog from "@/components/AddBookDialog";

//todo: remove mock functionality
const mockUsers = [
  { id: "1", name: "John Doe", username: "johnd", email: "john@example.com", booksBorrowed: 3, booksRead: 12 },
  { id: "2", name: "Jane Smith", username: "janes", email: "jane@example.com", booksBorrowed: 1, booksRead: 8 },
  { id: "3", name: "Bob Johnson", username: "bobj", email: "bob@example.com", booksBorrowed: 5, booksRead: 20 },
  { id: "4", name: "Alice Williams", username: "alicew", email: "alice@example.com", booksBorrowed: 2, booksRead: 15 },
];

//todo: remove mock functionality
const mockBooks = [
  { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "978-0-7432-7356-5", category: "Fiction", available: true },
  { id: "2", title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "978-0-06-112008-4", category: "Fiction", available: false },
  { id: "3", title: "1984", author: "George Orwell", isbn: "978-0-452-28423-4", category: "Dystopian", available: true },
  { id: "4", title: "Pride and Prejudice", author: "Jane Austen", isbn: "978-0-14-143951-8", category: "Romance", available: true },
  { id: "5", title: "The Catcher in the Rye", author: "J.D. Salinger", isbn: "978-0-316-76948-0", category: "Fiction", available: false },
  { id: "6", title: "Animal Farm", author: "George Orwell", isbn: "978-0-452-28424-1", category: "Political Satire", available: true },
];

export default function AdminDashboard() {
  const [, setLocation] = useLocation();
  const [users, setUsers] = useState(mockUsers);
  const [books, setBooks] = useState(mockBooks);
  const [deleteDialog, setDeleteDialog] = useState<{ open: boolean; type: "user" | "book"; id: string; name: string }>({
    open: false,
    type: "user",
    id: "",
    name: "",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    console.log("Admin logged out");
    setLocation("/");
  };

  const totalUsers = users.length;
  const totalBooks = books.length;
  const booksBorrowed = users.reduce((sum, user) => sum + user.booksBorrowed, 0);

  const handleRemoveUser = (id: string) => {
    const user = users.find((u) => u.id === id);
    if (user) {
      setDeleteDialog({ open: true, type: "user", id, name: user.name });
    }
  };

  const handleDeleteBook = (id: string) => {
    const book = books.find((b) => b.id === id);
    if (book) {
      setDeleteDialog({ open: true, type: "book", id, name: book.title });
    }
  };

  const handleConfirmDelete = () => {
    if (deleteDialog.type === "user") {
      setUsers(users.filter((u) => u.id !== deleteDialog.id));
      console.log("User removed:", deleteDialog.id);
    } else {
      setBooks(books.filter((b) => b.id !== deleteDialog.id));
      console.log("Book deleted:", deleteDialog.id);
    }
    setDeleteDialog({ open: false, type: "user", id: "", name: "" });
  };

  const handleAddBook = (book: { title: string; author: string; isbn: string; category: string }) => {
    const newBook = {
      id: (books.length + 1).toString(),
      ...book,
      available: true,
    };
    setBooks([...books, newBook]);
    console.log("Book added:", newBook);
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header userType="admin" userName="Admin User" onLogout={handleLogout} />
      <main className="p-6 max-w-7xl mx-auto space-y-8">
        <div>
          <h2 className="text-3xl font-bold">Dashboard</h2>
          <p className="text-muted-foreground mt-1">Overview of library statistics and management</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <StatCard title="Total Users" value={totalUsers} icon={Users} description="Registered library members" />
          <StatCard title="Total Books" value={totalBooks} icon={Book} description="Books in catalog" />
          <StatCard title="Books Borrowed" value={booksBorrowed} icon={BookOpen} description="Currently checked out" />
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList>
            <TabsTrigger value="users" data-testid="tab-users">
              <UserPlus className="h-4 w-4 mr-2" />
              Manage Users
            </TabsTrigger>
            <TabsTrigger value="books" data-testid="tab-books">
              <Book className="h-4 w-4 mr-2" />
              Manage Books
            </TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Library Users</CardTitle>
              </CardHeader>
              <CardContent>
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
                        <UserTableRow key={user.id} {...user} onRemove={handleRemoveUser} />
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="books" className="space-y-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
                <CardTitle>Book Catalog</CardTitle>
                <AddBookDialog onAdd={handleAddBook} />
              </CardHeader>
              <CardContent className="space-y-6">
                <Input
                  type="search"
                  placeholder="Search books by title, author, or category..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="input-search-books"
                />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredBooks.map((book) => (
                    <BookCard key={book.id} {...book} onDelete={handleDeleteBook} isAdmin={true} />
                  ))}
                </div>
                {filteredBooks.length === 0 && (
                  <div className="text-center py-12 text-muted-foreground">
                    No books found matching your search.
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <DeleteConfirmDialog
        open={deleteDialog.open}
        onOpenChange={(open) => setDeleteDialog({ ...deleteDialog, open })}
        title={`Delete ${deleteDialog.type === "user" ? "User" : "Book"}?`}
        description={`Are you sure you want to delete "${deleteDialog.name}"? This action cannot be undone.`}
        onConfirm={handleConfirmDelete}
      />
      <ChatBot />
    </div>
  );
}
