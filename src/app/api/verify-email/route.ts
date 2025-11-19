import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const token = searchParams.get("token");
    const identifier = searchParams.get("identifier");

    if (!token || !identifier) {
      return NextResponse.json(
        { error: "Invalid verification link" },
        { status: 400 },
      );
    }

    const record = await prisma.verificationToken.findUnique({
      where: {
        token,
      },
    });

    if (!record || record.identifier !== identifier) {
      return NextResponse.json(
        { error: "Invalid or already used verification token" },
        { status: 400 },
      );
    }

    if (record.expires < new Date()) {
      return NextResponse.json(
        { error: "Verification token has expired" },
        { status: 400 },
      );
    }

    // Mark the user as verified
    await prisma.user.update({
      where: { email: identifier },
      data: { emailVerified: new Date() },
    });

    // Delete token after successful verification
    await prisma.verificationToken.delete({
      where: { token },
    });

    // Redirect to sign-in with a query flag to show a message if you want
    const redirectUrl = new URL("/signin?verified=1", req.url);
    return NextResponse.redirect(redirectUrl);
  } catch (error) {
    console.error("Email verification error", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}



