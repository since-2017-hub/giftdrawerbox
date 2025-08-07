import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";
import { v4 as uuidv4 } from "uuid";

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    // Always return success to avoid user enumeration
    return NextResponse.json({ success: true });
  }
  const token = uuidv4();
  const expiresAt = new Date(Date.now() + 1000 * 60 * 30); // 30 min
  await prisma.passwordResetToken.create({
    data: {
      token,
      userId: user.id,
      expiresAt,
    },
  });
  // TODO: Send email with reset link (for now, just log)
  console.log(`Reset link: http://localhost:3000/reset-password?token=${token}`);
  return NextResponse.json({ success: true });
}
