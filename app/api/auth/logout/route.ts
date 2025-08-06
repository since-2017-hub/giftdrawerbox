import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const refreshToken = (await cookies()).get("refresh_token")?.value;
  if (refreshToken) {
    await prisma.refreshToken.deleteMany({ where: { token: refreshToken } });
    (await cookies()).set("refresh_token", "", { maxAge: 0 });
  }
  return NextResponse.json({ success: true });
}
