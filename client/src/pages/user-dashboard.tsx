import { useState } from "react";
import { useLocation } from "wouter";
import Header from "@/components/Header";
import BookCard from "@/components/BookCard";
import ChatBot from "@/components/ChatBot";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { BookOpen, Library, History } from "lucide-react";

//todo: remove mock functionality
const mockAvailableBooks = [
  { id: "1", title: "The Great Gatsby", author: "F. Scott Fitzgerald", isbn: "978-0-7432-7356-5", category: "Fiction", available: true },
  { id: "3", title: "1984", author: "George Orwell", isbn: "978-0-452-28423-4", category: "Dystopian", available: true },
  { id: "4", title: "Pride and Prejudice", author: "Jane Austen", isbn: "978-0-14-143951-8", category: "Romance", available: true },
  { id: "6", title: "Animal Farm", author: "George Orwell", isbn: "978-0-452-28424-1", category: "Political Satire", available: true },
  { id: "7", title: "The Hobbit", author: "J.R.R. Tolkien", isbn: "978-0-547-92822-7", category: "Fantasy", available: true },
  { id: "8", title: "Brave New World", author: "Aldous Huxley", isbn: "978-0-06-085052-4", category: "Dystopian", available: true },
];

//todo: remove mock functionality
const mockBorrowedBooks = [
  { id: "2", title: "To Kill a Mockingbird", author: "Harper Lee", isbn: "978-0-06-112008-4", category: "Fiction", available: false },
  { id: "5", title: "The Catcher in the Rye", author: "J.D. Salinger", isbn: "978-0-316-76948-0", category: "Fiction", available: false },
];

//todo: remove mock functionality
const mockReadHistory = [
  { id: "10", title: "Harry Potter and the Sorcerer's Stone", author: "J.K. Rowling", category: "Fantasy", returnedDate: "2025-10-15" },
  { id: "11", title: "The Lord of the Rings", author: "J.R.R. Tolkien", category: "Fantasy", returnedDate: "2025-10-01" },
  { id: "12", title: "Fahrenheit 451", author: "Ray Bradbury", category: "Dystopian", returnedDate: "2025-09-20" },
];

export default function UserDashboard() {
  const [, setLocation] = useLocation();
  const [availableBooks, setAvailableBooks] = useState(mockAvailableBooks);
  const [borrowedBooks, setBorrowedBooks] = useState(mockBorrowedBooks);
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    console.log("User logged out");
    setLocation("/");
  };

  const handleBorrow = (id: string) => {
    const book = availableBooks.find((b) => b.id === id);
    if (book) {
      setAvailableBooks(availableBooks.filter((b) => b.id !== id));
      setBorrowedBooks([...borrowedBooks, { ...book, available: false }]);
      console.log("Book borrowed:", id);
    }
  };

  const handleReturn = (id: string) => {
    const book = borrowedBooks.find((b) => b.id === id);
    if (book) {
      setBorrowedBooks(borrowedBooks.filter((b) => b.id !== id));
      setAvailableBooks([...availableBooks, { ...book, available: true }]);
      console.log("Book returned:", id);
    }
  };

  const filteredBooks = availableBooks.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header userType="user" userName="John Doe" onLogout={handleLogout} />
      <main className="p-6 max-w-7xl mx-auto space-y-8">
        <div>
          <h2 className="text-3xl font-bold">My Library</h2>
          <p className="text-muted-foreground mt-1">Manage your borrowed books and discover new titles</p>
        </div>

        <Tabs defaultValue="borrowed" className="space-y-6">
          <TabsList>
            <TabsTrigger value="borrowed" data-testid="tab-borrowed">
              <BookOpen className="h-4 w-4 mr-2" />
              Currently Borrowed ({borrowedBooks.length})
            </TabsTrigger>
            <TabsTrigger value="available" data-testid="tab-available">
              <Library className="h-4 w-4 mr-2" />
              Available Books
            </TabsTrigger>
            <TabsTrigger value="history" data-testid="tab-history">
              <History className="h-4 w-4 mr-2" />
              Reading History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="borrowed" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Your Borrowed Books</CardTitle>
              </CardHeader>
              <CardContent>
                {borrowedBooks.length > 0 ? (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {borrowedBooks.map((book) => (
                      <BookCard key={book.id} {...book} onReturn={handleReturn} isAdmin={false} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-muted-foreground">
                    You haven't borrowed any books yet. Browse the available books to get started!
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="available" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Available Books</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <Input
                  type="search"
                  placeholder="Search available books..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  data-testid="input-search-available"
                />
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredBooks.map((book) => (
                    <BookCard key={book.id} {...book} onBorrow={handleBorrow} isAdmin={false} />
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

          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Reading History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockReadHistory.map((book) => (
                    <div
                      key={book.id}
                      className="flex items-center justify-between p-4 border rounded-md hover-elevate"
                      data-testid={`history-item-${book.id}`}
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{book.title}</h4>
                        <p className="text-sm text-muted-foreground">{book.author}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Returned</p>
                        <p className="text-sm font-medium">{book.returnedDate}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      <ChatBot />
    </div>
  );
}
