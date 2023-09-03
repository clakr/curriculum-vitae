import prisma from "@/utils/prisma";
import Aside from "@/components/Aside";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Header from "@/components/Header";
import Leadership from "@/components/Leadership";
import Miscellaneous from "@/components/Miscellaneous";
import Author from "@/components/Author";
import CommandMenu from "@/components/CommandMenu";

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
      <Aside info={info} aboutData={about} />
      <main>
        <Author info={info} />
        <Education />
        <Experience />
        <Leadership />
        <Miscellaneous />
      </main>
      <CommandMenu />
    </>
  );
}
