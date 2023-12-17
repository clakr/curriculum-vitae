import Heading from "@/components/admin/Heading";
import prisma from "@/utils/prisma";
import Tabs from "./Tabs.client";

export async function getExperiences() {
  return await prisma.experience.findMany({
    select: {
      id: true,
      responsibilities: true,
      organization: { select: { name: true } },
    },
    orderBy: {
      organization: {
        durationFrom: "asc",
      },
    },
  });
}

export default async function Page() {
  const experiences = await getExperiences();

  return (
    <>
      <Heading>Experience</Heading>
      <div className="space-y-6 rounded-xl border border-neutral-300 bg-neutral-50/75 p-4 dark:border-neutral-600 dark:bg-neutral-950/75">
        <Tabs data={experiences} />
      </div>
    </>
  );
}
