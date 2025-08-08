"use server";

import * as z from "zod";

import { db } from "@/lib/db";
import { QuizCreateSchema } from "@/schemas";

import { revalidatePath } from "next/cache";

export const update = async (
  values: z.infer<typeof QuizCreateSchema>,
  id: any
) => {
  console.log(values);

  const name = values.name as string;
  const description = values.description as string;

  const atNo = values.atNo as string;
  const country = values.country as string;
  const examination = values.examination as string;
  const grade = values.grade as string;
  const year = values.year as string;
  const medium = values.medium as string;
  const slug = values.slug as string;
  const section = values.section as string;
  const type = values.type as string;
  const category = values.category as string;
  const subCategory = values.subCategory as string;
  const keywords = values.keywords as string;
  const status = values?.status as string;

  if (!name.trim()) {
    return;
  }
  // const  data= await db.quizzes.count( {where: { name: true }} )
  await db.quizzes.update({
    where: {
      id: id,
    },
    data: {
      atNo: atNo,
      name: name,
      description: description,

      country: country,
      examination: examination,
      grade: grade,
      year: year,
      medium: medium,
      slug: slug,
      section: section,
      type: type,
      category: category,
      subCategory: subCategory,
      keywords: keywords,
      status: status,
      userId: "680bde62db7d58e3fd044780",
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

  revalidatePath("/dashboard");

  return { success: "Record Created!" };
};
