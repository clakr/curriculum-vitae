import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
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
