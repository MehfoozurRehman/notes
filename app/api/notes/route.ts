import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { title, content, color } = await request.json();

    const res = await prisma.note.create({
      data: {
        title,
        content,
        color,
      },
    });

    return NextResponse.json(res);
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
