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

export async function getInfos() {
  return client.single("info").find({
    populate: "*",
  }) as Promise<SingleResponse<Info>>;
}

export async function getMetas(): Promise<SingleResponse<Meta>> {
  return client.single("meta").find({
    populate: "*",
  }) as Promise<SingleResponse<Meta>>;
}

export async function getMetaTags(): Promise<{
  title: string;
  description: string;
  keywords: string;
  author: string;
}> {
  const { data: infos } = await getInfos();
  const { data: metas } = await getMetas();

  const keywords = new Intl.ListFormat("en", {
    style: "short",
    type: "conjunction",
  }).format(metas.keywords.map((keyword) => keyword.item));

  return {
    title: metas.title,
    description: metas.description,
    keywords,
    author: infos.full_name,
  };
}

export async function getCompanies(): Promise<CollectionResponse<Company>> {
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

export async function getTechnicalSkills(): Promise<
  CollectionResponse<TechnicalSkill>
> {
  return client.collection("technical-skills").find({
    populate: "*",
  }) as Promise<CollectionResponse<TechnicalSkill>>;
}

export async function getEducations(): Promise<CollectionResponse<Education>> {
  return client.collection("educations").find({
    populate: {
      school: {
        populate: "*",
      },
    },
  }) as Promise<CollectionResponse<Education>>;
}

export async function getProjects(): Promise<CollectionResponse<Project>> {
  return client.collection("projects").find({
    populate: "*",
  }) as Promise<CollectionResponse<Project>>;
}

export async function getCertifications(): Promise<
  CollectionResponse<Certification>
> {
  return client.collection("certifications").find({
    populate: "*",
  }) as Promise<CollectionResponse<Certification>>;
}

export async function getLanguages(): Promise<CollectionResponse<Language>> {
  return client.collection("languages").find({
    populate: "*",
  }) as Promise<CollectionResponse<Language>>;
}

export async function getReferences(): Promise<CollectionResponse<Reference>> {
  return client.collection("references").find({
    populate: "*",
  }) as Promise<CollectionResponse<Reference>>;
}
