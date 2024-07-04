"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function AddNote() {
  const router = useRouter();
  const [adding, setAdding] = useState(false);

  const addNote = async () => {
    setAdding(true);
    const prompt = window.prompt("Enter a title for the note", "New Note");

    if (!prompt) {
      return;
    }

    const response = await fetch("/api/notes", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: prompt,
        content: "",
        color: "blue",
      }),
    });

    if (response.ok) {
      await response.json();

      router.refresh();
    } else {
      console.error("Failed to add note");
    }
    setAdding(false);
  };
  return (
    <button
      disabled={adding}
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
        opacity: adding ? 0.5 : 1,
      }}
      onClick={addNote}
    >
      Add Note
    </button>
  );
}
