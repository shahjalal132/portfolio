import { NextResponse } from "next/server";
import { z } from "zod";
import { portfolioData } from "@/lib/portfolio";
import { sendMail } from "@/lib/send-mail";

export const runtime = "nodejs";

// A process-wide cap avoids relying on client-controlled IP headers. For a
// multi-instance deployment, enforce a shared limit at the edge as well.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 10;
const rateLimitState = globalThis as typeof globalThis & {
  contactRateLimit?: { count: number; resetAt: number };
};

function checkRateLimit() {
  const now = Date.now();
  let window = rateLimitState.contactRateLimit;
  if (!window || now >= window.resetAt) {
    window = { count: 0, resetAt: now + WINDOW_MS };
    rateLimitState.contactRateLimit = window;
  }
  if (window.count >= MAX_REQUESTS) {
    return Math.max(1, Math.ceil((window.resetAt - now) / 1000));
  }
  window.count += 1;
  return 0;
}

const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(5_000),
});

export async function POST(request: Request) {
  const retryAfter = checkRateLimit();
  if (retryAfter) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers: { "Retry-After": String(retryAfter) } },
    );
  }

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
