import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { hashPassword } from "@/lib/password";
import crypto from "crypto";

export async function POST(req: NextRequest) {
  try {
    const { email, password, name } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      );
    }

    const hashedPassword = await hashPassword(password);

    // Create user with emailVerified left as null
    await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    // Create a verification token tied to this email
    const token = crypto.randomUUID();
    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24); // 24 hours

    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token,
        expires,
      },
    });

    const baseUrl =
      process.env.NEXTAUTH_URL ||
      process.env.VERCEL_URL ||
      "http://localhost:3000";

    const verificationUrl = `${baseUrl}/api/verify-email?token=${encodeURIComponent(
      token,
    )}&identifier=${encodeURIComponent(email)}`;

    // TODO: send `verificationUrl` via real email provider.
    // For now we just log it so you can test verification in development.
    console.log("Email verification link:", verificationUrl);

    return NextResponse.json(
      {
        success: true,
        message: "User created. Please check your email to verify your account.",
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Register error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}


