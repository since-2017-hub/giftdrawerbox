import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(req: NextRequest) {
  const { email, password, name } = await req.json();
  if (!email || !password)
    return NextResponse.json(
      { error: "Missing email or password" },
      { status: 400 }
    );

  const hashed = await bcrypt.hash(password, 10);
  try {
    const user = await prisma.user.create({
      data: { email, password: hashed, name },
    });
    return NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email },
    });
  } catch (err) {
    return NextResponse.json(
      { error: "Email already exists" },
      { status: 400 }
    );
  }
}
