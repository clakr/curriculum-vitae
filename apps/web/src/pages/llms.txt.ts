import {
  getCertifications,
  getCompanies,
  getEducations,
  getInfos,
  getProjects,
  getTechnicalSkills,
} from "@/lib/loaders";
import { buildFullName, formatDuration, getLiveSiteLink } from "@/lib/utils";

function formatLinks(
  links: Awaited<ReturnType<typeof getInfos>>["data"]["links"],
) {
  return links.map((link) => `- [${link.label}](${link.href})`).join("\n");
}

function formatCompanies(
  companies: Awaited<ReturnType<typeof getCompanies>>["data"],
) {
  return companies
    .map((company) => {
      if (!company.organization) return "";

      return `- [${company.organization?.name}](#) ${company.experiences.map((experience) => experience.position).join(" / ")} (${formatDuration(
        {
          from: company.organization.from,
          to: company.organization.to,
          options: {
            month: "short",
          },
        },
      )})`;
    })
    .join("\n");
}

function formatTechnicalSkills(
  technicalSkills: Awaited<ReturnType<typeof getTechnicalSkills>>["data"],
) {
  return new Intl.ListFormat(undefined, {
    style: "long",
    type: "conjunction",
  }).format(technicalSkills.map((skill) => skill.category));
}

function formatEducations(
  educations: Awaited<ReturnType<typeof getEducations>>["data"],
) {
  return educations
    .map((education) => {
      if (!education.school || !education.school.organization) return "";

      return `- ${education.course} - ${education.school?.organization?.name} (${formatDuration({ from: education.school.organization.from, to: education.school.organization.to, options: { month: undefined } })})`;
    })
    .join("\n");
}

function formatProjects(
  projects: Awaited<ReturnType<typeof getProjects>>["data"],
) {
  return projects
    .map((project) => {
      const liveSiteLink = getLiveSiteLink(project.links);
      const name = liveSiteLink
        ? `[${project.name}](${liveSiteLink.href})`
        : project.name;

      return `- ${name}: ${project.description}`;
    })
    .join("\n");
}

function formatCertifications(
  certifications: Awaited<ReturnType<typeof getCertifications>>["data"],
) {
  return certifications
    .map(
      (certification) =>
        `- ${certification.name} — ${new Date(certification.attained).getFullYear()}`,
    )
    .join("\n");
}

export const GET = async () => {
  const { data: info } = await getInfos();
  const fullName = buildFullName({
    first_name: info.first_name,
    last_name: info.last_name,
    middle_name: info.middle_name,
  });

  const { data: companies } = await getCompanies();
  const { data: technicalSkills } = await getTechnicalSkills();
  const { data: educations } = await getEducations();
  const { data: projects } = await getProjects();
  const { data: certifications } = await getCertifications();

  const content = [
    `# ${fullName} | ${info.position}`,
    `> ${info.summary}`,
    "",
    "## Profile",
    formatLinks(info.links),
    "",
    "## Experience",
    formatCompanies(companies),
    "",
    "## Skills",
    formatTechnicalSkills(technicalSkills),
    "",
    "## Education",
    formatEducations(educations),
    "",
    "## Projects",
    formatProjects(projects),
    "",
    "## Certifications",
    formatCertifications(certifications),
    "",
    "## Full Content",
    "For the complete CV content, see [llms-full.txt](/llms-full.txt)",
  ].join("\n");

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
