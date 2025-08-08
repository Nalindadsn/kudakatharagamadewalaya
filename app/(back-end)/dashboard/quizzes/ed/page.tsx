"use client";
import EditorCompo from "./EditorCompo";
import React from "react";

export default function Page() {
  const [childMsg, setChildMsg] = React.useState(null);
  return (
    <div className="w-full flex items-center flex-col">
      <div></div>
      <EditorCompo fromChild={setChildMsg} className="w-full" />
      {/* <Parent/> */}
      {childMsg}
    </div>
  );
}
