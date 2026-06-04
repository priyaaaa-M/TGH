import { NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json()

    if (!email || typeof email !== "string") {
      return NextResponse.json({ allowed: false, error: "Invalid email." }, { status: 400 })
    }

    const normalized = email.trim().toLowerCase()

    // ALLOWED_GROUP_EMAILS is server-only — never exposed to the browser
    const allowedRaw = process.env.ALLOWED_GROUP_EMAILS || ""
    const allowedEmails = allowedRaw
      .split(",")
      .map((e) => e.trim().toLowerCase())
      .filter(Boolean)

    if (!allowedEmails.includes(normalized)) {
      return NextResponse.json({ allowed: false }, { status: 200 })
    }

    return NextResponse.json({ allowed: true }, { status: 200 })
  } catch {
    return NextResponse.json({ allowed: false, error: "Server error." }, { status: 500 })
  }
}
