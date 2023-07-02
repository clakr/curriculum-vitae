import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  await prisma.basicInformation.deleteMany();
  await prisma.about.deleteMany();

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
