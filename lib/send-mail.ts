import nodemailer from "nodemailer";
import { z } from "zod";

const smtpConfigSchema = z.object({
  host: z.string().trim().min(1),
  port: z.coerce.number().int().min(1).max(65_535),
  username: z.string().trim().min(1),
  password: z.string().min(1),
});

const mailSchema = z.object({
  to: z.string().email(),
  replyTo: z.string().email().optional(),
  subject: z.string().trim().min(1).max(160),
  text: z.string().trim().min(1).max(10_000),
});

export type SendMailInput = z.input<typeof mailSchema>;

export async function sendMail(input: SendMailInput) {
  const config = smtpConfigSchema.parse({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    username: process.env.SMTP_USERNAME,
    password: process.env.SMTP_PASSWORD,
  });
  const mail = mailSchema.parse(input);

  const transporter = nodemailer.createTransport({
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.username,
      pass: config.password,
    },
  });

  return transporter.sendMail({
    from: "Portfolio Contact <portfolio@example.com>",
    ...mail,
  });
}
