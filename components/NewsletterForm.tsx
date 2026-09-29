"use client";

import { useState } from "react";

/**
 * NewsletterForm — posts to /api/newsletter (Resend when env creds exist,
 * stub otherwise). Inline success/error, no page leave.
 */
export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [phase, setPhase] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [message, setMessage] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (phase === "sending") return;
    setPhase("sending");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = (await res.json()) as { message?: string; error?: string };
      if (!res.ok) {
        setMessage(data.error ?? "Something went wrong");
        setPhase("error");
        return;
      }
      setMessage(data.message ?? "You're in!");
      setPhase("done");
    } catch {
      setMessage("Network error — please try again");
      setPhase("error");
    }
  };

  if (phase === "done") {
    return (
      <div className="mx-auto mt-6 max-w-md rounded-2xl border border-fresh/30 bg-fresh/5 p-4" role="status" aria-live="polite">
        <p className="font-mono text-xs text-ink">✓ {message}</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        aria-label="Email address"
        aria-invalid={phase === "error"}
        className="w-full min-w-0 flex-1 rounded-full border border-hairline bg-bone px-5 py-3 font-mono text-sm text-ink placeholder:text-muted focus:border-ink focus:outline-none"
      />
      <button
        type="submit"
        disabled={phase === "sending"}
        className="shrink-0 rounded-full bg-ink px-6 py-3 text-[15px] font-medium text-bone transition-transform duration-200 hover:scale-[1.02] disabled:opacity-60 disabled:hover:scale-100"
      >
        {phase === "sending" ? "Sending…" : "Get the code"}
      </button>
      {phase === "error" ? (
        <p className="basis-full font-mono text-[11px] text-kesar sm:basis-full">{message}</p>
      ) : null}
    </form>
  );
}
