"use server";

import { db } from "@/lib/db";

import { revalidatePath } from "next/cache";

export const del = async (id: any) => {
  const inputId = id as string;

  await db.quizzes.delete({
    where: {
      id: inputId,
    },
  });

  revalidatePath(`/org`);
  return { success: "Deleted!" };
};
