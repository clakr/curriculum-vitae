import { client } from "./strapi";
import type {
  Certification,
  CollectionResponse,
  Company,
  Education,
  Info,
  Language,
  Meta,
  Project,
  Reference,
  SingleResponse,
  TechnicalSkill,
} from "./strapi.types";
import { buildFullName, getInitials } from "./utils";

export async function getInfos() {
  return client.single("info").find({
    populate: "*",
  }) as Promise<SingleResponse<Info>>;
}

export async function getMetas() {
  return client.single("meta").find({
    populate: "*",
  }) as Promise<SingleResponse<Meta>>;
}

export async function getMetaTags() {
  const { data: info } = await getInfos();
  const { data: metas } = await getMetas();

  const keywords = new Intl.ListFormat("en", {
    style: "short",
    type: "conjunction",
  }).format(metas.keywords.map((keyword) => keyword.item));

  const author = buildFullName({
    first_name: info.first_name,
    last_name: info.last_name,
    middle_name: info.middle_name,
  });

  return {
    title: metas.title,
    description: metas.description,
    keywords,
    author,
  };
}

export async function getCompanies() {
  return client.collection("companies").find({
    populate: {
      organization: {
        populate: "*",
      },
      experiences: {
        populate: "*",
      },
    },
    sort: "organization.to:desc",
  }) as Promise<CollectionResponse<Company>>;
}

export async function getTechnicalSkills() {
  return client.collection("technical-skills").find({
    populate: "*",
    sort: "order",
  }) as Promise<CollectionResponse<TechnicalSkill>>;
}

export async function getEducations() {
  return client.collection("educations").find({
    populate: {
      school: {
        populate: "*",
      },
    },
  }) as Promise<CollectionResponse<Education>>;
}

export async function getProjects() {
  return client.collection("projects").find({
    populate: "*",
  }) as Promise<CollectionResponse<Project>>;
}

export async function getCertifications() {
  return client.collection("certifications").find({
    populate: "*",
  }) as Promise<CollectionResponse<Certification>>;
}

export async function getLanguages() {
  return client.collection("languages").find({
    populate: "*",
  }) as Promise<CollectionResponse<Language>>;
}

export async function getReferences() {
  return client.collection("references").find({
    populate: "*",
  }) as Promise<CollectionResponse<Reference>>;
}

export async function getStructuredData() {
  const { data: info } = await getInfos();

  const fullName = buildFullName({
    first_name: info.first_name,
    last_name: info.last_name,
    middle_name: info.middle_name,
  });

  const givenName = `${info.first_name} ${getInitials(info.middle_name)}`;

  const sameAs = info.links.map((link) => link.href);

  //

  const { data: skills } = await getTechnicalSkills();

  const knowsAbout = skills.map((skill) => ({
    "@type": "Thing",
    name: skill.category === "Other" ? "Skills" : skill.category,
    description: skill.skills.map((s) => s.item),
  }));

  //

  const { data: educations } = await getEducations();

  const alumniOf = educations.map((education) => ({
    "@type": "EducationalOrganization",
    name: education.school?.organization?.name,
    address: {
      "@type": "PostalAddress",
      addressLocality: education.school?.organization?.location,
    },
  }));

  //

  const { data: companies } = await getCompanies();

  const worksFor = companies.map((company) => ({
    "@type": "Organization",
    name: company.organization?.name,
    location: company.organization?.location,
  }));

  //

  const { data: certifications } = await getCertifications();

  const hasCredential = certifications.map((certification) => ({
    "@type": "EducationalOccupationalCredential",
    name: certification.name,
    credentialCategory: "certificate",
    recognizedBy: {
      "@type": "Organization",
      name: certification.issued_by,
    },
  }));

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": "https://cv.ckt.fyi/#person",
    name: fullName,
    givenName,
    familyName: info.last_name,
    jobTitle: info.position,
    description: info.summary,
    email: info.email,
    telephone: info.phone_number,
    url: "https://cv.ckt.fyi/",
    sameAs,
    nationality: {
      "@type": "Country",
      name: info.nationality,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: info.address,
    },
    knowsAbout,
    alumniOf,
    worksFor,
    hasCredential,
  };
}
