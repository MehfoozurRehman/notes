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

export async function updateNote(
  id: number,
  title: string,
  content: string,
  color: string
) {
  try {
    if (!title) {
      throw new Error("Title is required");
    }

    await prisma.note.update({
      where: {
        id,
      },
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

export async function deleteNote(id: number) {
  try {
    await prisma.note.delete({
      where: {
        id,
      },
    });

    revalidatePath("/");
  } catch (error) {
    console.error("An error occurred", error);
  }
}
