import type { APIRoute } from "astro";

import { recipientEmail, resend } from "@/lib/resend";
import { requestPDFSchema } from "@/lib/schemas";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json();
  const { success, error, data } = requestPDFSchema.safeParse(body);

  if (!success && error)
    return new Response(
      JSON.stringify({
        error: JSON.parse(error.message).at(0).message,
      }),
      {
        status: 400,
      },
    );

  const requestedAt = new Intl.DateTimeFormat("en", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(new Date());

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: recipientEmail,
    subject: "PDF Resume Request",
    html: `
      <p>Someone requested a copy of your PDF resume from your website.</p>
      <p><strong>Requester Email:</strong> <a href="mailto:${data.email}">${data.email}</a></p>
      <p><strong>Requested At:</strong> ${requestedAt}</p>
      <p>This email was generated from the resume website PDF request form.</p>
    `,
  });

  return new Response(
    JSON.stringify({
      message: "PDF request sent",
    }),
    {
      status: 200,
    },
  );
};
