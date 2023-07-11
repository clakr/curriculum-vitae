import { About, BasicInformation } from "@prisma/client";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement> & {
  info: BasicInformation | null;
  aboutData: About[] | null;
};

export default async function Aside({ info, aboutData }: Props) {
  return (
    <aside className="order-1 hidden border-l border-neutral-300 bg-neutral-100 px-6 pt-8 laptop:block">
      <div className="fixed mr-6 flex flex-col gap-y-4">
        <section className="flex flex-col gap-y-2 [&>address]:text-sm [&>address]:not-italic">
          <h3 className="mb-1 font-bold">Contact</h3>
          <address>{info?.address}</address>
          <address>{info?.email}</address>
          <address>{info?.phoneNumber}</address>
        </section>
        <section className="flex flex-col gap-y-2 [&>p]:text-sm">
          <h3 className="mb-1 font-bold">About</h3>
          {aboutData?.map((about) => (
            <p key={about.id}>{about.desc}</p>
          ))}
        </section>
      </div>
    </aside>
  );
}
