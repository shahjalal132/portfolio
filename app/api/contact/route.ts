import { NextResponse } from "next/server";
import { z } from "zod";
import { portfolioData } from "@/lib/portfolio";
import { sendMail } from "@/lib/send-mail";

export const runtime = "nodejs";

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(5_000),
});

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid request body." },
      { status: 400 },
    );
  }

  const result = contactSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Please check the form fields and try again." },
      { status: 422 },
    );
  }

  const { name, email, message } = result.data;

  try {
    await sendMail({
      to: portfolioData.portfolio.profile.contact.email,
      replyTo: email,
      subject: `Portfolio inquiry from ${name}`,
      text: [`Name: ${name}`, `Email: ${email}`, "", message].join("\n"),
    });

    return NextResponse.json({ success: true });
  } catch {
    console.error("Contact email delivery failed.");
    return NextResponse.json(
      { error: "The message could not be sent. Please try again shortly." },
      { status: 500 },
    );
  }
}
