import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const refreshToken = (await cookies()).get("refresh_token")?.value;
  if (!refreshToken) return NextResponse.json({ error: "No refresh token" }, { status: 401 });

  try {
    const payload = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET!);
    const dbToken = await prisma.refreshToken.findUnique({ where: { token: refreshToken } });
    if (!dbToken || dbToken.expiresAt < new Date()) throw new Error("Invalid token");

    const accessToken = jwt.sign(
      { userId: (payload as any).userId, email: (payload as any).email },
      process.env.JWT_SECRET!,
      { expiresIn: "15m" }
    );
    return NextResponse.json({ accessToken });
  } catch (err) {
    return NextResponse.json({ error: "Invalid refresh token" }, { status: 401 });
  }
}
