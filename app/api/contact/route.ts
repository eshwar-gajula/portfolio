export const runtime = "nodejs"

import { NextResponse } from "next/server"
import { z } from "zod"

const contactSchema = z.object({
  name: z.string().trim().min(2).max(100),
  email: z.string().trim().email().max(254),
  message: z.string().trim().min(10).max(5000),
  website: z.string().optional(),
})

const rateLimit = new Map<string, { count: number; resetAt: number }>()
const WINDOW_MS = 10 * 60 * 1000
const MAX_REQUESTS = 5

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for")
  return forwardedFor?.split(",")[0]?.trim() || request.headers.get("x-real-ip") || "unknown"
}

function isSameOrigin(request: Request) {
  const origin = request.headers.get("origin")
  if (!origin) return true

  try {
    const originUrl = new URL(origin)
    const host = request.headers.get("x-forwarded-host") || request.headers.get("host")
    return Boolean(host && originUrl.host === host)
  } catch {
    return false
  }
}

export async function POST(request: Request) {
  if (!isSameOrigin(request)) {
    return NextResponse.json({ error: "Invalid request origin." }, { status: 403 })
  }

  const key = getClientKey(request)
  const now = Date.now()
  const current = rateLimit.get(key)

  if (current && current.resetAt > now && current.count >= MAX_REQUESTS) {
    return NextResponse.json(
      { error: "Too many messages. Please wait a few minutes and try again." },
      { status: 429, headers: { "Retry-After": String(Math.ceil((current.resetAt - now) / 1000)) } },
    )
  }

  if (!current || current.resetAt <= now) {
    rateLimit.set(key, { count: 1, resetAt: now + WINDOW_MS })
  } else {
    current.count += 1
  }

  let payload: unknown
  try {
    payload = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 })
  }

  const parsed = contactSchema.safeParse(payload)
  if (!parsed.success) {
    return NextResponse.json({ error: "Please provide a valid name, email, and message." }, { status: 400 })
  }

  // Honeypot: bots should populate this hidden field; real users leave it empty.
  if (parsed.data.website) {
    return NextResponse.json({ ok: true })
  }

  const resendApiKey = process.env.RESEND_API_KEY
  const contactToEmail = process.env.CONTACT_TO_EMAIL
  const contactFromEmail = process.env.CONTACT_FROM_EMAIL

  if (!resendApiKey || !contactToEmail || !contactFromEmail) {
    return NextResponse.json(
      { error: "The contact service is not configured yet. Please email me directly instead." },
      { status: 503 },
    )
  }

  const subject = `Portfolio contact from ${parsed.data.name}`
  const html = `
    <h2>New portfolio contact</h2>
    <p><strong>Name:</strong> ${escapeHtml(parsed.data.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(parsed.data.email)}</p>
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(parsed.data.message).replace(/\n/g, "<br />")}</p>
  `

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: contactFromEmail,
        to: [contactToEmail],
        reply_to: parsed.data.email,
        subject,
        html,
      }),
      cache: "no-store",
    })

    if (!response.ok) {
      return NextResponse.json({ error: "The message could not be delivered. Please email me directly instead." }, { status: 502 })
    }

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ error: "The message could not be delivered. Please email me directly instead." }, { status: 502 })
  }
}

function escapeHtml(value: string) {
  return value.replace(/[&<>'"]/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "'": "&#39;",
      '"': "&quot;",
    }
    return entities[character]
  })
}
