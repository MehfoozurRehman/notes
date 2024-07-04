"use client";

import React from "react";
import { useParams } from "next/navigation";

export default function page() {
  const { noteId } = useParams();
  return <div>note:{noteId} </div>;
}
