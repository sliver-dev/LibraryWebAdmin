import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

interface UserTableRowProps {
  id: string;
  name: string;
  username: string;
  email: string;
  booksBorrowed: number;
  booksRead: number;
  onRemove: (id: string) => void;
}

export default function UserTableRow({
  id,
  name,
  username,
  email,
  booksBorrowed,
  booksRead,
  onRemove,
}: UserTableRowProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <tr className="hover-elevate" data-testid={`row-user-${id}`}>
      <td className="py-4 px-6">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium" data-testid={`text-user-name-${id}`}>
              {name}
            </div>
            <div className="text-sm text-muted-foreground">{username}</div>
          </div>
        </div>
      </td>
      <td className="py-4 px-6 text-muted-foreground">{email}</td>
      <td className="py-4 px-6 text-center" data-testid={`text-books-borrowed-${id}`}>
        {booksBorrowed}
      </td>
      <td className="py-4 px-6 text-center" data-testid={`text-books-read-${id}`}>
        {booksRead}
      </td>
      <td className="py-4 px-6 text-right">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onRemove(id)}
          data-testid={`button-remove-user-${id}`}
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </td>
    </tr>
  );
}
