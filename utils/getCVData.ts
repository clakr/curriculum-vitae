import prisma from "./prisma";

export default async function getAllData() {
  const info = await prisma.basicInformation.findFirst();
  const educations = await prisma.education.findMany({
    include: {
      organization: true,
    },
    orderBy: {
      organization: {
        durationFrom: "desc",
      },
    },
  });

  const experiences = await prisma.experience.findMany({
    include: {
      organization: true,
    },
    orderBy: {
      organization: {
        durationFrom: "desc",
      },
    },
  });

  const leaderships = await prisma.leadership.findMany({
    include: {
      organization: true,
    },
    orderBy: {
      organization: {
        durationFrom: "desc",
      },
    },
  });

  const miscellaneouses = await prisma.miscellaneous.findMany();

  return { info, educations, experiences, leaderships, miscellaneouses };
}
