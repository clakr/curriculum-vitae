import {
  name,
  occupation,
  address,
  phoneNumber,
  about,
} from "#src/information.json";
import { useState } from "react";

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  function handleOpen() {
    setIsOpen((b) => !b);
  }

  return (
    <header>
      <h1>{name}</h1>
      <h2>{occupation}</h2>
      {isOpen ? (
        <>
          <section>
            <h3>Contact</h3>
            <address>{address.physical}</address>
            <address>{address.email}</address>
            <address>{phoneNumber}</address>
          </section>
          <ul>
            <figcaption>About</figcaption>
            {about.map((a, i) => (
              <li key={i}>{a}</li>
            ))}
          </ul>
        </>
      ) : null}
      <button type="button" onClick={handleOpen}>
        {isOpen ? "close" : "open"}
      </button>
    </header>
  );
}
