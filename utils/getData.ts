import prisma from "./prisma";

export type GetData = Awaited<ReturnType<typeof getData>>;

export default async function getData() {
  const info = await prisma.basicInformation.findFirst();
  const about = await prisma.about.findMany();

  const education = await prisma.education.findMany({
    include: {
      organization: true,
    },
    orderBy: {
      organization: {
        durationFrom: "desc",
      },
    },
  });

  const experience = await prisma.experience.findMany({
    include: {
      organization: true,
    },
    orderBy: {
      organization: {
        durationFrom: "desc",
      },
    },
  });

  const leadership = await prisma.leadership.findMany({
    include: {
      organization: true,
    },
    orderBy: {
      organization: {
        durationFrom: "desc",
      },
    },
  });

  const miscellaneous = await prisma.miscellaneous.findMany();

  return { info, about, education, experience, leadership, miscellaneous };
}
