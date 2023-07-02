import prisma from "@/utils/prisma";
import Aside from "./Aside";
import Education from "./Education";
import Experience from "./Experience";
import Header from "./Header";
import Leadership from "./Leadership";
import Miscellaneous from "./Miscellaneous";

export const revalidate = 60;

async function getData() {
  const info = await prisma.basicInformation.findFirst();
  const about = await prisma.about.findMany();

  return { info, about };
}

export default async function Home() {
  const { info, about } = await getData();

  return (
    <>
      <Header info={info} aboutData={about} />
      <Aside />
      <main>
        <Education />
        <Experience />
        <Leadership />
        <Miscellaneous />
      </main>
    </>
  );
}
