"use client";

import { deleteNote, updateNote } from "@/actions/note";
import { useState, useTransition } from "react";

import { Note } from "@/prisma/interfaces";

export function Card({ data }: { data: Note }) {
  const [color, setColor] = useState(data.color || "blue");

  const [isEditing, setIsEditing] = useState(false);

  const [updating, startUpdateTransition] = useTransition();

  const [deleting, startDeleteTransition] = useTransition();

  return (
    <form
      action={async (formData: FormData) => {
        const title = formData.get("title") as string;
        const content = formData.get("content") as string;

        startUpdateTransition(() => updateNote(data.id, title, content, color));

        setIsEditing(false);
      }}
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
          defaultValue={data.title}
          onChange={() => setIsEditing(true)}
          name="title"
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
              type="submit"
              disabled={updating}
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
            type="button"
            disabled={deleting}
            onClick={() => {
              startDeleteTransition(() => deleteNote(data.id));
            }}
          >
            d
          </button>
        </div>
      </div>
      <textarea
        name="content"
        defaultValue={data.content || ""}
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
        onChange={() => setIsEditing(true)}
      />
      <input
        type="color"
        value={color || "blue"}
        onChange={(e) => {
          setColor(e.target.value);
          setIsEditing(true);
        }}
        style={{
          marginTop: "1rem",
          width: "100%",
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
          color: "white",
        }}
      />
    </form>
  );
}
