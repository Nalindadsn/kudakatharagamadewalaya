"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export const create = async (
  values: any,
  answers: any,
  orgId: any,
  quizzId: any,
  sectionId: any,
  type: string,
  questionOptionId = null
) => {
  console.log(values);

  const name = values.name as string;
  const tag = values.tag as string;
  const subTag = values.subTag as string;
  const anTime = parseInt(values.anTime);

  if (!name.trim()) {
    return;
  }
  console.log(anTime);
  // console.log(name)

  // const  data= await db.quizzes.count( {where: { name: true }} )
  const an = answers.map(function (item: any) {
    delete item.id;
    // item.trueOrFalse=item.trueOrFalse.toString().toUpperCase() as Boolean

    return item;
  });

  if (type) {
    switch (type) {
      case "new":
        const createdData = await db.questions.create({
          data: {
            name: "",
            quizzesId: quizzId,
            quizzesSectionId: sectionId,
            questionOptions: {
              create: {
                name: name,
                anTime: anTime,
                tag: tag,
                subTag: subTag,
                answerOptions: {
                  createMany: {
                    data: an,
                  },
                },
              },
            },
          },
        });
        revalidatePath("/dashboard");
        return { success: "Record Created!", createdData: createdData };
        break;
      case "option":
        const createdDataOption = await db.questions.update({
          where: { id: questionOptionId as any },
          data: {
            questionOptions: {
              create: {
                name: name,
                anTime: anTime,
                tag: tag,
                subTag: subTag,
                answerOptions: {
                  createMany: {
                    data: an,
                  },
                },
              },
            },
          },
        });
        revalidatePath("/dashboard");
        return { success: "Question created!", createdData: createdDataOption };
        break;
      case "answer":
        const createdDataAnswer = await db.$transaction(async (db) => {
          await db.answerOptions.deleteMany({
            where: {
              questionOptionsId: questionOptionId,
            },
          });

          const andt = an.map((element: any) => {
            if (!element.hasOwnProperty("questionOptionsId")) {
              element.questionOptionsId = questionOptionId;
            }
            return element;
          });
          console.log(typeof anTime);

          await db.questionOptions.update({
            where: {
              id: questionOptionId as any,
            },
            data: {
              name: name,
              anTime: anTime,
              tag: tag,
              subTag: subTag,
            },
          });
          await db.answerOptions.createMany({
            data: andt,
          });
        });
        revalidatePath("/dashboard");
        return { success: "Question updated!", createdData: createdDataAnswer };
        break;

      default:
        break;
    }
  } else {
  }

  // console.log(createdData)
};
