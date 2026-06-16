import {
  getCertifications,
  getCompanies,
  getEducations,
  getInfos,
  getLanguages,
  getProjects,
  getReferences,
  getTechnicalSkills,
} from "@/lib/loaders";
import { buildFullName, formatDuration, getLiveSiteLink } from "@/lib/utils";

const listFormatter = new Intl.ListFormat(undefined, {
  style: "long",
  type: "conjunction",
});

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

      return [
        `### ${company.organization.name} — ${company.organization.location}`,
        `> ${formatDuration({
          from: company.organization.from,
          to: company.organization.to,
          options: { month: "short" },
        })}`,
        "",
        ...company.experiences.flatMap((experience) => [
          `#### ${experience.position}`,
          ...experience.responsibilities.map((r) => `- ${r.item}`),
        ]),
      ].join("\n");
    })
    .join("\n\n");
}

function formatTechnicalSkills(
  technicalSkills: Awaited<ReturnType<typeof getTechnicalSkills>>["data"],
) {
  return technicalSkills
    .map(
      (skill) =>
        `- **${skill.category}**: ${listFormatter.format(skill.skills.map((s) => s.item))}`,
    )
    .join("\n");
}

function formatEducations(
  educations: Awaited<ReturnType<typeof getEducations>>["data"],
) {
  return educations
    .map((education) => {
      if (!education.school || !education.school.organization) return "";

      return [
        `- **${education.course}**`,
        `  ${education.school.organization.name}`,
        `  ${education.school.organization.location}`,
        `  ${formatDuration({
          from: education.school.organization.from,
          to: education.school.organization.to,
          options: { month: undefined },
        })}`,
      ].join("\n");
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

      return [
        `- **${name}**`,
        `  ${project.description}`,
        `  Tech Stack: ${listFormatter.format(project.tech_stack.map((t) => t.item))}`,
      ].join("\n");
    })
    .join("\n");
}

function formatCertifications(
  certifications: Awaited<ReturnType<typeof getCertifications>>["data"],
) {
  return certifications
    .map(
      (certification) =>
        `- **${certification.name}** — ${certification.issued_by} (${new Date(certification.attained).getFullYear()})`,
    )
    .join("\n");
}

function formatLanguages(
  languages: Awaited<ReturnType<typeof getLanguages>>["data"],
) {
  return languages
    .map((language) => `- ${language.language}: ${language.level}`)
    .join("\n");
}

function formatReferences(
  references: Awaited<ReturnType<typeof getReferences>>["data"],
) {
  return references
    .map((reference) =>
      [
        `- **${reference.name}** — ${reference.position}`,
        `  ${reference.company}`,
        `  Relationship: ${reference.relationship}`,
      ]
        .filter(Boolean)
        .join("\n"),
    )
    .join("\n\n");
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
  const { data: languages } = await getLanguages();
  const { data: references } = await getReferences();

  const content = [
    `# ${fullName} | ${info.position}`,
    "",
    "## Summary",
    info.summary,
    "",
    "## Contact",
    `- Phone: ${info.phone_number}`,
    `- Email: ${info.email}`,
    `- Location: ${info.address}`,
    `- Nationality: ${info.nationality}`,
    `- Visa: ${info.visa}`,
    "",
    "## Profile",
    formatLinks(info.links),
    "",
    "## Experience",
    formatCompanies(companies),
    "",
    "## Technical Skills",
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
    "## Languages",
    formatLanguages(languages),
    "",
    "## References",
    formatReferences(references),
    "",
  ].join("\n");

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
    },
  });
};
