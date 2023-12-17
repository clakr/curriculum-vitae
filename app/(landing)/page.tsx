import Aside from "@/components/Aside";
import Education from "@/components/Education";
import Experience from "@/components/Experience";
import Header from "@/components/Header";
import Leadership from "@/components/Leadership";
import Miscellaneous from "@/components/Miscellaneous";
import Author from "@/components/Author";
import CommandMenu from "@/components/CommandMenu";
import getAllData from "@/utils/getData";

export const revalidate = 60;

export default async function Home() {
  const data = await getAllData();
  const { info, about, education, experience, leadership, miscellaneous } =
    data;

  return (
    <>
      <Header data={{ info, about }} />
      <Aside data={{ info, about }} />
      <main>
        <Author data={{ info }} />
        <Education data={{ education }} />
        <Experience data={{ experience }} />
        <Leadership data={{ leadership }} />
        <Miscellaneous data={{ miscellaneous }} />
      </main>
      <CommandMenu data={data} />
    </>
  );
}
