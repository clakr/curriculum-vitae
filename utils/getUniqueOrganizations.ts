import { Organization } from "@prisma/client";

export default function getUniqueOrganizations(organizations: Organization[]) {
  return organizations.filter(
    (filterValue, index) =>
      organizations.findIndex(
        (findIndexValue) => filterValue.id === findIndexValue.id
      ) === index
  );
}
