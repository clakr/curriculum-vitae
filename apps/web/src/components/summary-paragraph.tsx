import { useState } from "react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

export function SummaryParagraph({ text }: { text: string }) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <>
      <p className={cn(isCollapsed ? "line-clamp-3" : "line-clamp-none")}>{text}</p>
      <Button
        variant="secondary"
        className="self-start mt-2"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        Read {isCollapsed ? "More" : "Less"}
      </Button>
    </>
  );
}
