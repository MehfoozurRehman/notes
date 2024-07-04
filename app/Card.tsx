"use client";

import { Note } from "@/prisma/interfaces";
import { useState } from "react";

export function Card({ data, refetch }: { data: Note; refetch: () => void }) {
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);
  const [color, setColor] = useState(data.color);

  const isEditing =
    title !== data.title || content !== data.content || color !== data.color;

  const [updating, setUpdating] = useState(false);

  const updateNote = async () => {
    setUpdating(true);
    const response = await fetch(`/api/notes/${data.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
        color,
      }),
    });

    if (response.ok) {
      await response.json();

      await refetch();
    } else {
      console.error("Failed to update note");
    }
    setUpdating(false);
  };

  const [deleting, setDeleting] = useState(false);

  const deleteNote = async () => {
    setDeleting(true);
    const response = await fetch(`/api/notes/${data.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      await response.json();
      await refetch();
    } else {
      console.error("Failed to delete note");
    }
    setDeleting(false);
  };

  return (
    <div
      style={{
        padding: "1rem",
        backgroundColor: color || "red",
        borderRadius: "5px",
        color: "white",
        opacity: deleting ? 0.5 : 1,
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            fontWeight: "bold",
            color: "white",
            backgroundColor: "transparent",
            border: "none",
            outline: "none",
          }}
        />
        {isEditing && (
          <button
            style={{
              padding: "0.5rem",
              fontSize: "1rem",
              fontWeight: "bold",
              color: "black",
              backgroundColor: "lightgray",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            disabled={updating}
            onClick={updateNote}
          >
            {updating ? "..." : "u"}
          </button>
        )}
        <button
          style={{
            padding: "0.5rem",
            fontSize: "1rem",
            fontWeight: "bold",
            color: "black",
            backgroundColor: "lightgray",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
          disabled={deleting}
          onClick={deleteNote}
        >
          d
        </button>
      </div>
      <textarea
        value={content || ""}
        onChange={(e) => setContent(e.target.value)}
        style={{
          marginTop: "1rem",
          width: "100%",
          height: "170px",
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
          color: "white",
          resize: "none",
        }}
      />
      <input
        type="color"
        value={color || "blue"}
        onChange={(e) => setColor(e.target.value)}
        style={{
          marginTop: "1rem",
          width: "100%",
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
          color: "white",
        }}
      />
    </div>
  );
}