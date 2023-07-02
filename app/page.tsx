import Education from "./Education";
import Experience from "./Experience";
import Header from "./Header";
import Leadership from "./Leadership";
import Miscellaneous from "./Miscellaneous";

export const revalidate = 60;

export default async function Home() {
  return (
    <>
      <Header />
      <main>
        <Education />
        <Experience />
        <Leadership />
        <Miscellaneous />
      </main>
    </>
  );
}
