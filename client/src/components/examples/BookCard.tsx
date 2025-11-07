import BookCard from "../BookCard";

export default function BookCardExample() {
  return (
    <div className="grid gap-6 md:grid-cols-3 p-6 max-w-5xl">
      <BookCard
        id="1"
        title="The Great Gatsby"
        author="F. Scott Fitzgerald"
        isbn="978-0-7432-7356-5"
        category="Fiction"
        available={true}
        onBorrow={(id) => console.log("Borrow book:", id)}
        showActions={true}
        isAdmin={false}
      />
      <BookCard
        id="2"
        title="To Kill a Mockingbird"
        author="Harper Lee"
        isbn="978-0-06-112008-4"
        category="Fiction"
        available={false}
        onReturn={(id) => console.log("Return book:", id)}
        showActions={true}
        isAdmin={false}
      />
      <BookCard
        id="3"
        title="1984"
        author="George Orwell"
        isbn="978-0-452-28423-4"
        category="Dystopian"
        available={true}
        onDelete={(id) => console.log("Delete book:", id)}
        showActions={true}
        isAdmin={true}
      />
    </div>
  );
}
