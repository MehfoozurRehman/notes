"use client";

import { useEffect, useState } from "react";

import { Card } from "./Card";
import { Note } from "@/prisma/interfaces";

async function fetchData(cb?: (data: Note[]) => void) {
  const response = await fetch("/api/notes", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (response.ok) {
    const data = await response.json();
    if (cb) {
      cb(data);
    }
  } else {
    console.error("Failed to fetch data");
  }
}

export default function page() {
  const [notes, setNotes] = useState<Note[]>([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData((data: Note[]) => {
      setNotes(data);
      setLoading(false);
    });
  }, []);

  const addNote = async () => {
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
      const data = await response.json();
      setNotes([...notes, data]);
    } else {
      console.error("Failed to add note");
    }
  };

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1rem",
      }}
    >
      {loading ? (
        <p
          style={{
            gridColumn: "1 / -1",
            textAlign: "center",
            fontSize: "1.5rem",
            color: "gray",
          }}
        >
          Loading...
        </p>
      ) : (
        <>
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
              minHeight: 200,
            }}
            onClick={addNote}
          >
            Add Note
          </button>
          {notes?.length === 0 ? (
            <p
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                fontSize: "1.5rem",
                color: "gray",
              }}
            >
              No notes found
            </p>
          ) : (
            notes?.map((note) => (
              <Card
                key={note.id}
                data={note}
                refetch={async () =>
                  await fetchData((data: Note[]) => {
                    setNotes(data);
                  })
                }
              />
            ))
          )}
        </>
      )}
    </div>
  );
}
