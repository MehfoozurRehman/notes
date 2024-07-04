"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function createNote(
  title: string,
  content: string,
  color: string
) {
  try {
    if (!title) {
      throw new Error("Title is required");
    }

    await prisma.note.create({
      data: {
        title,
        content,
        color,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.error("An error occurred", error);
  }
}
