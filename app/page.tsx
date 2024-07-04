import { AddNote } from "./AddNote";
import { Card } from "./Card";
import { Note } from "@/prisma/interfaces";
import prisma from "@/lib/prisma";
import { unstable_noStore } from "next/cache";

export default async function page() {
  unstable_noStore();

  const notes = await prisma.note.findMany({
    orderBy: {
      id: "desc",
    },
  });

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
        gap: "1rem",
      }}
    >
      <AddNote />
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
        notes?.map((note: Note) => <Card key={note.id} data={note} />)
      )}
    </div>
  );
}
