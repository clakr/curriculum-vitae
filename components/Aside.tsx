import { GetData } from "@/utils/getData";

type Props = {
  data: Pick<GetData, "info" | "about">;
};

export default async function Aside({ data: { info, about } }: Props) {
  if (!info || !about) return null;

  const { address, email, phoneNumber } = info;

  return (
    <aside className="order-1 hidden border-l border-l-neutral-300 bg-neutral-100 px-6 pt-8 dark:border-l-neutral-600 dark:bg-neutral-900 laptop:block">
      <div className="fixed mr-6 flex flex-col gap-y-4">
        <section className="flex flex-col gap-y-2 [&>address]:text-sm [&>address]:not-italic">
          <h3 className="mb-1 font-bold">Contact</h3>
          <address>{address}</address>
          <address>{email}</address>
          <address>{phoneNumber}</address>
        </section>
        <section className="flex flex-col gap-y-2 [&>p]:text-sm">
          <h3 className="mb-1 font-bold">About</h3>
          {about.map(({ id, desc }) => (
            <p key={id}>{desc}</p>
          ))}
        </section>
      </div>
    </aside>
  );
}
