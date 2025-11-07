import { useState } from "react";
import DeleteConfirmDialog from "../DeleteConfirmDialog";
import { Button } from "@/components/ui/button";

export default function DeleteConfirmDialogExample() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-6">
      <Button variant="destructive" onClick={() => setOpen(true)}>
        Delete Item
      </Button>
      <DeleteConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Are you sure?"
        description="This action cannot be undone. This will permanently delete the selected item."
        onConfirm={() => {
          console.log("Item deleted");
          setOpen(false);
        }}
      />
    </div>
  );
}
