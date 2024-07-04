"use client";

import { deleteNote, updateNote } from "@/actions/note";
import { useState, useTransition } from "react";

import { Note } from "@/prisma/interfaces";

export function Card({ data }: { data: Note }) {
  const [title, setTitle] = useState(data.title);
  const [content, setContent] = useState(data.content);
  const [color, setColor] = useState(data.color || "blue");

  const isEditing =
    title !== data.title || content !== data.content || color !== data.color;

  const [updating, startUpdateTransition] = useTransition();

  const [deleting, startDeleteTransition] = useTransition();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
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
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
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
              onClick={() => {
                startUpdateTransition(() =>
                  updateNote(data.id, title, content || "", color || "blue")
                );
              }}
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
            onClick={() => {
              startDeleteTransition(() => deleteNote(data.id));
            }}
          >
            d
          </button>
        </div>
      </div>
      <div
        contentEditable
        onInput={(e) => setContent(e.currentTarget.textContent || "")}
        style={{
          marginTop: "1rem",
          width: "100%",
          minHeight: "170px",
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
          color: "white",
          resize: "none",
          flex: 1,
        }}
      >
        {content}
      </div>
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
