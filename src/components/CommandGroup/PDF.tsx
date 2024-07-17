import { Button } from "#components/CommandGroup.tsx";

export default function PDF() {
  return (
    <Button disabled>
      <span className="sr-only">Download PDF</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 32 32"
      >
        <path
          fill="currentColor"
          d="M24 24v4H8v-4H6v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4Z"
        />
        <path
          fill="currentColor"
          d="m21 21l-1.414-1.414L17 22.172V14h-2v8.172l-2.586-2.586L11 21l5 5zm7-17V2h-6v10h2V8h3V6h-3V4zm-11 8h-4V2h4a3.003 3.003 0 0 1 3 3v4a3.003 3.003 0 0 1-3 3m-2-2h2a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-2zM9 2H4v10h2V9h3a2.003 2.003 0 0 0 2-2V4a2 2 0 0 0-2-2M6 7V4h3l.001 3z"
        />
      </svg>
    </Button>
  );
}
