import type { Quizzes } from "@prisma/client";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export async function list(): Promise<Quizzes[]> {
  const data = await db.quizzes.findMany({
    include: {
      quizzesSection: true,
    },
  });

  return data;
}

export async function fetchById(id: string): Promise<Quizzes | null> {
  const questions = await db.quizzes.findFirst({
    where: {
      id,
    },
    include: {
      quizzesSection: {
        include: {
          questions: {
            include: {
              questionOptions: {
                include: {
                  answers: true,
                  answerOptions: true,
                },
              },
            },
          },
        },
      },
    },
  });

  if (!questions) {
    notFound();
  }

  return questions;
}
