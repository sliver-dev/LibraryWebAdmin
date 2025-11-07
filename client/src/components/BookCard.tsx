import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Book } from "lucide-react";

interface BookCardProps {
  id: string;
  title: string;
  author: string;
  isbn?: string;
  category?: string;
  available: boolean;
  onBorrow?: (id: string) => void;
  onReturn?: (id: string) => void;
  onDelete?: (id: string) => void;
  showActions?: boolean;
  isAdmin?: boolean;
}

export default function BookCard({
  id,
  title,
  author,
  isbn,
  category,
  available,
  onBorrow,
  onReturn,
  onDelete,
  showActions = true,
  isAdmin = false,
}: BookCardProps) {
  return (
    <Card className="flex flex-col" data-testid={`card-book-${id}`}>
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between gap-2">
          <div className="flex gap-3 flex-1">
            <div className="h-12 w-12 rounded-md bg-primary/10 flex items-center justify-center flex-shrink-0">
              <Book className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <CardTitle className="text-base line-clamp-2" data-testid={`text-book-title-${id}`}>
                {title}
              </CardTitle>
              <p className="text-sm text-muted-foreground mt-1" data-testid={`text-book-author-${id}`}>
                {author}
              </p>
            </div>
          </div>
          <Badge variant={available ? "default" : "secondary"} data-testid={`badge-status-${id}`}>
            {available ? "Available" : "Borrowed"}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="pb-4 space-y-2">
        {isbn && (
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">ISBN:</span> {isbn}
          </p>
        )}
        {category && (
          <p className="text-sm text-muted-foreground">
            <span className="font-medium">Category:</span> {category}
          </p>
        )}
      </CardContent>
      {showActions && (
        <CardFooter className="mt-auto pt-4 gap-2">
          {isAdmin ? (
            <Button
              variant="destructive"
              size="sm"
              className="w-full"
              onClick={() => onDelete?.(id)}
              data-testid={`button-delete-${id}`}
            >
              Delete
            </Button>
          ) : (
            <>
              {available ? (
                <Button
                  variant="default"
                  size="sm"
                  className="w-full"
                  onClick={() => onBorrow?.(id)}
                  data-testid={`button-borrow-${id}`}
                >
                  Borrow
                </Button>
              ) : (
                <Button
                  variant="secondary"
                  size="sm"
                  className="w-full"
                  onClick={() => onReturn?.(id)}
                  data-testid={`button-return-${id}`}
                >
                  Return
                </Button>
              )}
            </>
          )}
        </CardFooter>
      )}
    </Card>
  );
}
