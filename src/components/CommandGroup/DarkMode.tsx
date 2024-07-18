import { Button } from "#components/CommandGroup.tsx";

export default function DarkMode() {
  function handleClick() {
    document.documentElement.classList.toggle("dark");
  }

  return (
    <Button onClick={handleClick}>
      <span className="sr-only">Toggle Color Scheme</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 24 24"
      >
        <g fill="currentColor">
          <path d="M12 16a4 4 0 0 0 0-8z" />
          <path
            fillRule="evenodd"
            d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2m0 2v4a4 4 0 1 0 0 8v4a8 8 0 1 0 0-16"
            clipRule="evenodd"
          />
        </g>
      </svg>
    </Button>
  );
}
