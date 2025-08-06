import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

const ACCESS_TOKEN_EXPIRY = "15m";
const REFRESH_TOKEN_EXPIRY = 1000 * 60 * 60 * 24 * 7; // 7 days

export async function POST(req: NextRequest) {
  const { email, password, rememberMe } = await req.json();
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !user.password) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  const valid = await bcrypt.compare(password, user.password);
  if (!valid) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const payload = { userId: user.id, email: user.email };
  const accessToken = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: ACCESS_TOKEN_EXPIRY });

  const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_SECRET!, { expiresIn: rememberMe ? "30d" : "7d" });
  const expiresAt = new Date(Date.now() + (rememberMe ? 1000 * 60 * 60 * 24 * 30 : REFRESH_TOKEN_EXPIRY));
  await prisma.refreshToken.create({
    data: { token: refreshToken, userId: user.id, expiresAt },
  });

  (await cookies()).set("refresh_token", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: rememberMe ? 60 * 60 * 24 * 30 : 60 * 60 * 24 * 7,
    sameSite: "lax",
  });

  return NextResponse.json({
    accessToken,
    user: { id: user.id, email: user.email, name: user.name },
  });
}
