import type { ButtonHTMLAttributes } from "react";

function handleDarkModeClick() {
  document.documentElement.classList.toggle("dark");
}

export default function CommandGroup() {
  return (
    <section className="fixed bottom-4 right-4 flex flex-col lg:right-6">
      <Button>
        <span className="sr-only">Project Information</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 24 24"
        >
          <g fill="currentColor">
            <path d="M11 10.98a1 1 0 1 1 2 0v6a1 1 0 1 1-2 0zm1-4.929a1 1 0 1 0 0 2a1 1 0 0 0 0-2" />
            <path
              fill-rule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10s10-4.477 10-10S17.523 2 12 2M4 12a8 8 0 1 0 16 0a8 8 0 0 0-16 0"
              clip-rule="evenodd"
            />
          </g>
        </svg>
      </Button>
      <Button>
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
      <Button onClick={handleDarkModeClick}>
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
    </section>
  );
}

function Button({
  children,
  className,
  ...rest
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className="hover:bg-neutral-950/5 hover:dark:bg-neutral-50/5 self-end rounded p-2"
      {...rest}
    >
      {children}
    </button>
  );
}
