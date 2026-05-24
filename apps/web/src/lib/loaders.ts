import { client } from "./strapi";

export async function getInfos() {
  return client.single("info").find();
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
