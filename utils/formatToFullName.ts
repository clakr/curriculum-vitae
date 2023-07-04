import { BasicInformation } from "@prisma/client";

export function formatToFullName(info: BasicInformation | null) {
  return `${info?.firstName} ${info?.middleName.slice(0, 1)}. ${
    info?.lastName
  }`;
}
