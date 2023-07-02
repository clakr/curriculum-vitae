import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Month =
  | "january"
  | "february"
  | "march"
  | "april"
  | "may"
  | "june"
  | "july"
  | "august"
  | "september"
  | "october"
  | "november"
  | "december";

const months: Record<Month, string> = {
  january: "01",
  february: "02",
  march: "03",
  april: "04",
  may: "05",
  june: "06",
  july: "07",
  august: "08",
  september: "09",
  october: "10",
  november: "11",
  december: "12",
};

function getDate(year: number, month: Month) {
  return new Date(`${year}-${months[month]}-01 00:00:00 GMT+0000`);
}

async function main() {
  await prisma.basicInformation.deleteMany();
  await prisma.about.deleteMany();
  await prisma.organization.deleteMany();

  await prisma.basicInformation.create({
    data: {
      firstName: "Clark Kenneth",
      middleName: "Cenita",
      lastName: "Tolosa",
      position: "Web Developer",
      address: "Santa Rosa, Laguna, Philippines",
      email: "clarktolosa@gmail.com",
      phoneNumber: "(+63) 977 4499 113",
    },
  });

  await prisma.about.createMany({
    data: [
      {
        desc: "I am a passionate Web Developer.",
      },
      {
        desc: "Currently in love with Frontend Engineering with libraries and modern JavaScript frameworks with the likes of Tailwind CSS, React, and Next. Also interested in managing, interpreting, and visualizing data in the Backend and engineering the connection of both Frontend and Backend.",
      },
      {
        desc: "Capable of Full Stack Web Development. Knowledgeable in modern technologies.",
      },
    ],
  });

  await prisma.organization.createMany({
    data: [
      {
        name: "Systems Plus Computer College",
        location: "CAC, PH",
        durationFrom: getDate(2006, "june"),
        durationTo: getDate(2018, "march"),
      },
      {
        name: "FEU - Institute of Technology",
        location: "MNL, PH",
        durationFrom: getDate(2018, "august"),
        durationTo: getDate(2023, "february"),
      },
      {
        name: "Aguora IT Solutions & Technology",
        location: "QZT, PH",
        durationFrom: getDate(2022, "april"),
        durationTo: getDate(2022, "november"),
        mode: "WFH",
        position: "Web Developer Intern",
      },
    ],
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
