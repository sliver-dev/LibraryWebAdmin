import AddBookDialog from "../AddBookDialog";

export default function AddBookDialogExample() {
  return (
    <div className="p-6">
      <AddBookDialog
        onAdd={(book) => console.log("Add book:", book)}
      />
    </div>
  );
}
