"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/Button";
import { siteConfig } from "@/lib/site";

type FieldErrors = {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
};

function validate(values: {
  name: string;
  email: string;
  subject: string;
  message: string;
}): FieldErrors {
  const errors: FieldErrors = {};
  if (!values.name.trim() || values.name.trim().length < 2) {
    errors.name = "Please enter your name.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Enter a valid email address.";
  }
  if (!values.subject.trim() || values.subject.trim().length < 3) {
    errors.subject = "Add a short subject.";
  }
  if (!values.message.trim() || values.message.trim().length < 20) {
    errors.message = "Please share a bit more detail (20+ characters).";
  }
  return errors;
}

export function ContactForm() {
  const [errors, setErrors] = useState<FieldErrors>({});
  const [status, setStatus] = useState<"idle" | "ready" | "error">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const values = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      subject: String(data.get("subject") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setStatus("error");
      return;
    }

    const body = [
      `Name: ${values.name.trim()}`,
      `Email: ${values.email.trim()}`,
      "",
      values.message.trim(),
    ].join("\n");

    const mailto = `mailto:${siteConfig.contactMailto}?subject=${encodeURIComponent(
      `[ToravoTech] ${values.subject.trim()}`,
    )}&body=${encodeURIComponent(body)}`;

    setStatus("ready");
    window.location.href = mailto;
  }

  const fieldClass =
    "mt-2 w-full rounded-md border border-white/12 bg-white/4 px-3.5 py-2.5 text-sm text-white placeholder:text-slate-500 outline-none transition focus:border-electric focus:ring-2 focus:ring-electric/30";

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="space-y-5"
      aria-describedby="contact-form-note"
    >
      <p id="contact-form-note" className="text-sm text-slate-400">
        This form opens your email client with a pre-filled message. No third-party
        email API is connected yet — set{" "}
        <code className="text-slate-300">NEXT_PUBLIC_CONTACT_EMAIL</code> to
        override the destination.
      </p>

      <div>
        <label htmlFor="name" className="text-sm font-medium text-slate-200">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          className={fieldClass}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name ? (
          <p id="name-error" className="mt-1.5 text-sm text-red-300" role="alert">
            {errors.name}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-slate-200">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className={fieldClass}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email ? (
          <p id="email-error" className="mt-1.5 text-sm text-red-300" role="alert">
            {errors.email}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="subject" className="text-sm font-medium text-slate-200">
          Subject
        </label>
        <input
          id="subject"
          name="subject"
          type="text"
          required
          className={fieldClass}
          aria-invalid={Boolean(errors.subject)}
          aria-describedby={errors.subject ? "subject-error" : undefined}
        />
        {errors.subject ? (
          <p id="subject-error" className="mt-1.5 text-sm text-red-300" role="alert">
            {errors.subject}
          </p>
        ) : null}
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-slate-200">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={6}
          required
          className={fieldClass}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message ? (
          <p id="message-error" className="mt-1.5 text-sm text-red-300" role="alert">
            {errors.message}
          </p>
        ) : null}
      </div>

      {status === "ready" ? (
        <p className="text-sm text-electric" role="status">
          Opening your email app…
        </p>
      ) : null}
      {status === "error" ? (
        <p className="text-sm text-red-300" role="alert">
          Please fix the highlighted fields.
        </p>
      ) : null}

      <Button type="submit" variant="primary">
        Send message
      </Button>
    </form>
  );
}
