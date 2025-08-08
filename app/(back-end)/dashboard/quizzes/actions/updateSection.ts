"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { QuizzesSectionSchema } from "@/schemas";

import { revalidatePath } from "next/cache";

export const updateSection = async (
  values: z.infer<typeof QuizzesSectionSchema>,
  id: any,
  allTags: any,
  defaultTags: any
) => {
  console.log(id);

  const name = values.name as string;
  const type = values.type as string;
  const description = values.description as string;

  if (!name.trim()) {
    return;
  }
  console.log(allTags);
  console.log(defaultTags);
  // const  data= await db.quizzes.count( {where: { name: true }} )
  await db.quizzesSection.update({
    where: {
      id: id,
    },
    data: {
      name: name,
      type: type,
      description: description,
      allTags: allTags,
      defaultsTags: defaultTags,
    },
  });

  // return { error: "www" }
  //   const user = await currentUser();

  //   if (!user) {
  //     return { error: "Unauthorized" }
  //   }
  // console.log("---------------------")
  // console.log(values)
  //   const updatedUser = await db.al.update({
  //     where: { id: id },
  //     data: {
  //       ...values,
  //     }
  //   });

  revalidatePath("/org");

  return { success: "Record updated!" };
};
