"use client";

import { useState, type FormEvent } from "react";
import { Send } from "lucide-react";

type SubmissionStatus = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<SubmissionStatus>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const message = String(form.get("message") ?? "").trim();

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) throw new Error("Email delivery failed");

      formElement.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  };

  const fieldStyles =
    "w-full rounded-lg border border-white/15 bg-white/8 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-400 focus:border-blue-300 focus:bg-white/12 focus:ring-2 focus:ring-blue-300/20";

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4"
      aria-label="Contact form"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="contact-name" className="sr-only">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            required
            className={fieldStyles}
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="sr-only">
            Email address
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="Your email"
            required
            className={fieldStyles}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-message" className="sr-only">
          Message
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          placeholder="Tell me about your project or opportunity"
          required
          className={`${fieldStyles} resize-y`}
        />
      </div>

      <button
        data-gsap-button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex w-fit items-center gap-2 rounded-lg bg-white px-5 py-3 font-semibold text-slate-950 transition hover:bg-blue-50 disabled:cursor-wait disabled:opacity-65"
      >
        {status === "sending" ? "Sending…" : "Send email"}
        <Send size={17} aria-hidden="true" />
      </button>

      <p
        className={`min-h-5 text-sm ${
          status === "error" ? "text-red-300" : "text-blue-200"
        }`}
        aria-live="polite"
      >
        {status === "success" && "Thanks—your message has been sent."}
        {status === "error" &&
          "The message could not be sent. Please try again."}
      </p>
    </form>
  );
}
