"use client";
import { useState } from "react";

export default function EditorCompo(props: any) {
  const [data, setData] = useState(
    "sfsff gjhgjgj ghfhg - [ ] xvxvcx 1. cbgcbggghfhfhg 2. gfdgfdgd"
  );

  console.log("data", data);
  const dataUp = (editor?: any) => {
    setData(editor?.storage.markdown.getMarkdown());
  };
  const d = dataUp();
  props.fromChild(data);
  console.log(d);
  return <></>;
}

// async function uploadImage(
//   file?: any,
//   path?: any,
//   tags?: any,
//   apiKey = "5hfy9w4oflc61625xm7ny5"
// ) {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("path", path);
//   formData.append("tags", tags);

//   try {
//     const response = await fetch("https://pics.shade.cool/api/upload", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${apiKey}`,
//       },
//       body: formData,
//     });
//     return await response.json();

//     if (!response.ok) {
//       throw new Error(`Error: ${response.statusText}`);
//     }

//     const result = await response.json();
//     console.log("Upload successful!", result);
//   } catch (error) {
//     console.error("Error uploading image:", error);
//   }
// }
