import nodemailer from "nodemailer";

type BusinessEmailInput = {
  subject: string;
  text: string;
  replyTo?: string;
};

function getSmtpConfig() {
  const host = process.env.SMTP_HOST?.trim();
  const port = Number(process.env.SMTP_PORT ?? "587");
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const fromEmailRaw = process.env.SMTP_FROM_EMAIL?.trim();
  // Many SMTP providers (including Zoho) only allow a sender that matches the authenticated mailbox.
  const fromEmail =
    fromEmailRaw && user && fromEmailRaw.toLowerCase() === user.toLowerCase()
      ? fromEmailRaw
      : user;
  const fromName = process.env.SMTP_FROM_NAME?.trim() ?? "SBCre8ive Website";
  const recipientEmail =
    process.env.FORM_RECIPIENT_EMAIL?.trim() ??
    "contactus@sbcre8ivesolutions.com";

  if (!host || !user || !pass || !fromEmail || !recipientEmail) {
    return null;
  }

  return {
    host,
    port,
    user,
    pass,
    fromEmail,
    fromName,
    recipientEmail,
  };
}

export function isEmailConfigured() {
  return getSmtpConfig() !== null;
}

export async function sendBusinessEmail(input: BusinessEmailInput) {
  const config = getSmtpConfig();

  if (!config) {
    throw new Error("Email is not configured.");
  }

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  });

  await transporter.sendMail({
    from: `${config.fromName} <${config.fromEmail}>`,
    to: config.recipientEmail,
    replyTo: input.replyTo,
    subject: input.subject,
    text: input.text,
  });
}