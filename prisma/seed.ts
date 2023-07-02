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
  await prisma.miscellaneous.deleteMany();

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

  await prisma.organization.create({
    data: {
      name: "Systems Plus Computer College",
      location: "CAC, PH",
      durationFrom: getDate(2006, "june"),
      durationTo: getDate(2018, "march"),
      Education: {
        create: {
          awards: "Graduated with High Honors & Best in Programming",
        },
      },
    },
  });

  await prisma.organization.create({
    data: {
      name: "FEU - Institute of Technology",
      location: "MNL, PH",
      durationFrom: getDate(2018, "august"),
      durationTo: getDate(2023, "february"),
      Education: {
        create: {
          degree: "B.S. Information Technology - Web and Mobile Application",
          thesis:
            "Fit-E: An LMS for Wellness and Recreation Program with Student Health Tracking and Recommender",
        },
      },
      Leadership: {
        createMany: {
          data: [
            {
              course: "Capstone Project",
              project:
                "Fit-E: An LMS for Wellness and Recreation Program with Student Health Tracking and Recommender",
              positions: [
                "Lead Frontend & Backend Developer",
                "UI/UX Designer",
                "Project Documentation",
              ],
              responsibilities: [
                "Analyzed project objectives to be feasible given the constrained timeframe",
                "Coordinated with the beneficiary in integrating sensitive information to the system",
                "Engineered Frontend & Backend in parallel to the UI design mockup",
                "Reviewed documentation in alignment with the project description and objectives",
              ],
            },
            {
              course: "eCommerce with Digital Marketing",
              project:
                "Pet Adoption Management System with Integration of MERN Stack and REST API",
              positions: [
                "Lead Frontend & Backend Developer",
                "UI/UX Designer",
              ],
            },
          ],
        },
      },
    },
  });

  await prisma.organization.create({
    data: {
      name: "Aguora IT Solutions & Technology",
      location: "QZT, PH",
      durationFrom: getDate(2022, "april"),
      durationTo: getDate(2022, "november"),
      mode: "WFH",
      position: "Web Developer Intern",
      Experience: {
        create: {
          responsibilities: [
            "Provided support for existing software revisions",
            "Built design systems for page and components reusability",
            "Remodeled Santiago City's website for mobile responsive design",
            "Translated & Interpreted UI mock designs to fully functional web pages and applications",
            "Bootstrapped a design system based on UI mock design, resulting in developing application modules with ease",
            "Conducted isolated Quality Assurance tests for every assigned task, resulting in filtered tests for the staging process",
            "Engineered & Maintained a Project Management System's Frontend & Backend for Marikina Polytechnic College's Smart Campus",
          ],
        },
      },
    },
  });

  await prisma.miscellaneous.createMany({
    data: [
      {
        type: "TECHNICAL",
        list: [
          "HTML",
          "CSS",
          "Sass",
          "Tailwind",
          "Bootstrap",
          "JavaScript",
          "jQuery",
          "TypeScript",
          "React",
          "NextJS",
          "Astro",
          "PHP",
          "Laravel",
          "SQL",
          "REST API",
        ],
      },

      {
        type: "TOOL",
        list: ["Git", "Visual Studio Code", "Figma", "Adobe XD"],
      },
      {
        type: "LANGUAGE",
        list: ["Filipino", "English"],
      },
      {
        type: "INTEREST",
        list: [
          "Modern Technologies",
          "Web Frameworks",
          "PC and Console Gaming",
          "Basketball",
        ],
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
