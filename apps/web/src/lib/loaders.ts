import { client } from "./strapi";

export async function getInfos() {
  return client.single("info").find({
    populate: "*",
  });
}

export async function getMetas() {
  return client.single("meta").find({
    populate: "*",
  });
}

export async function getMetaTags() {
  const { data: infos } = await getInfos();
  const { data: metas } = await getMetas();

  const title = `${infos.full_name} | ${infos.position}`;
  const keywords = new Intl.ListFormat("en", {
    style: "short",
    type: "conjunction",
  }).format(metas.keywords.map((keyword) => keyword.item));

  return {
    title,
    description: metas.description,
    keywords,
    author: infos.full_name,
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
  });
}

export async function getTechnicalSkills() {
  return client.collection("technical-skills").find({
    populate: "*",
  });
}

export async function getEducations() {
  return client.collection("educations").find({
    populate: {
      school: {
        populate: "*",
      },
    },
  });
}

export async function getProjects() {
  return client.collection("projects").find({
    populate: "*",
  });
}

export async function getCertifications() {
  return client.collection("certifications").find({
    populate: "*",
  });
}

export async function getLanguages() {
  return client.collection("languages").find({
    populate: "*",
  });
}

export async function getReferences() {
  return client.collection("references").find({
    populate: "*",
  });
}
