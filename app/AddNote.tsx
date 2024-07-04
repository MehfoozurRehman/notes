"use client";

import { createNote } from "@/actions/note";
import { useTransition } from "react";
import z from "zod";

export function AddNote() {
  const [pending, startTransition] = useTransition();

  const addNote = async () => {
    const prompt = window.prompt("Enter a title for the note", "New Note");

    if (!prompt) {
      return;
    }

    if (z.string().parse(prompt).length === 0) {
      alert("Title must be a string");
      return;
    }

    startTransition(() => createNote(prompt, "", "blue"));
  };

  return (
    <button
      disabled={pending}
      style={{
        padding: "0.5rem",
        fontSize: "1rem",
        fontWeight: "bold",
        color: "black",
        backgroundColor: "lightgray",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
        minHeight: 200,
        opacity: pending ? 0.5 : 1,
      }}
      onClick={addNote}
    >
      Add Note
    </button>
  );
}
