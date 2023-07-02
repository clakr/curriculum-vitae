import prisma from "@/utils/prisma";

export default async function Education() {
  const educations = await prisma.education.findMany();

  return (
    <section>
      {educations.map((education) => (
        <article key={education.id}>
          {JSON.stringify(education, null, 2)}
        </article>
      ))}
    </section>
  );
}
