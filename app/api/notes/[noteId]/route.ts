import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PUT(request: Request) {
  try {
    const url = new URL(request.url);
    const noteId = url.pathname.split("/").pop();

    const { title, content, color } = await request.json();

    await prisma.note.update({
      where: { id: Number(noteId) },
      data: {
        title,
        content,
        color,
      },
    });

    return NextResponse.json({ noteId });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const url = new URL(request.url);
    const noteId = url.pathname.split("/").pop();

    await prisma.note.delete({
      where: { id: Number(noteId) },
    });

    return NextResponse.json({ noteId });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
