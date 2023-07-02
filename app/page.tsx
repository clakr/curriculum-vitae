import Education from "./Education";
import Experience from "./Experience";
import Header from "./Header";

export const revalidate = 60;

export default async function Home() {
  return (
    <>
      <Header />
      <main>
        <Education />
        <Experience />
      </main>
    </>
  );
}
