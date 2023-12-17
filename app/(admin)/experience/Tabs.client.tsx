"use client";

import * as Tabs from "@radix-ui/react-tabs";
import { getExperiences } from "./page";
import Table, {
  TableBodyRow,
  TableFoot,
  TableHead,
} from "@/components/admin/Table";

type Props = { data: Awaited<ReturnType<typeof getExperiences>> };

export default function TabsClient({ data }: Props) {
  const [{ id: aguoraId }] = data;

  return (
    <Tabs.Root defaultValue={aguoraId} className="space-y-3">
      <Tabs.List>
        {data.map(({ id, organization: { name } }) => (
          <Tabs.Trigger key={id} value={id}>
            {name}
          </Tabs.Trigger>
        ))}
      </Tabs.List>
      {data.map(({ id, responsibilities }) => (
        <Tabs.Content key={id} value={id}>
          <Table>
            <TableHead>
              <th>Responsibility</th>
              <th />
            </TableHead>
            <tbody>
              {responsibilities.map((responsibility, index) => (
                <TableBodyRow key={index}>
                  <td>{responsibility}</td>
                  <td>actions here</td>
                </TableBodyRow>
              ))}
            </tbody>
            <TableFoot colSpan={2} />
          </Table>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
}
