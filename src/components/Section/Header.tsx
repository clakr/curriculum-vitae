import {
  name,
  occupation,
  address,
  phoneNumber,
  about,
} from "#src/information.json";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import Section from "#components/Information/Section.tsx";
import Address from "#components/Information/Address.tsx";
import Paragraph from "#components/Information/Paragraph.tsx";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen((b) => !b);
  }

  return (
    <header className="flex flex-col border-b border-gray-5 bg-gray-2 p-4 pb-2 lg:hidden">
      <h1 className="text-3xl font-bold tracking-tighter">{name}</h1>
      <h2 className="text-2xl font-semibold">{occupation}</h2>
      {isOpen ? (
        <>
          <Section heading="Contact">
            <Address>{address.physical}</Address>
            <Address>{address.email}</Address>
            <Address>{phoneNumber}</Address>
          </Section>
          <Section heading="About">
            {about.map((a, i) => (
              <Paragraph key={i}>{a}</Paragraph>
            ))}
          </Section>
        </>
      ) : null}
      <button
        type="button"
        className="grid place-content-center py-1.5"
        onClick={handleOpen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 256 256"
          className={twMerge(
            "h-6 w-6 transition-transform",
            isOpen && "rotate-180",
          )}
        >
          <path
            fill="currentColor"
            d="m216.49 104.49l-80 80a12 12 0 0 1-17 0l-80-80a12 12 0 0 1 17-17L128 159l71.51-71.52a12 12 0 0 1 17 17Z"
          />
        </svg>
      </button>
    </header>
  );
}
