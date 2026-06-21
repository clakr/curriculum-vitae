import { Resend } from "resend";

export const resend = new Resend(import.meta.env.RESEND_API_KEY);

export const recipientEmail = import.meta.env.PDF_REQUEST_TO_EMAIL;
