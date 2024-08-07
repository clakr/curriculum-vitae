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
import Name from "#components/Information/Name.tsx";
import Occupation from "#components/Information/Occupation.tsx";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen((b) => !b);
  }

  return (
    <header className="flex flex-col border-b border-neutral-300 bg-neutral-50 p-4 pb-2 lg:hidden dark:border-neutral-700 dark:bg-neutral-950">
      <Name>{name}</Name>
      <Occupation>{occupation}</Occupation>
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
        {isOpen ? (
          <span className="sr-only">Expand</span>
        ) : (
          <span className="sr-only">Collapse</span>
        )}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={twMerge(
            "h-6 w-6 transition-transform",
            isOpen && "rotate-180",
          )}
        >
          <path
            fill="currentColor"
            d="M6.343 7.757L4.93 9.172l7.07 7.07l7.071-7.07l-1.414-1.415L12 13.414z"
          />
        </svg>
      </button>
    </header>
  );
}
