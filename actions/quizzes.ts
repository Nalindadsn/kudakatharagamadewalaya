import { db } from "@/lib/db";

export async function getQuizzes() {
  try {
    const req = await db.quizzes.findMany({
     
    });

    if (!req) {
      return {
        data: null,
        status: 404,
        message: 'Failed to fetched back quizzes',
      };
    }

    const trainings = req;

    return {
      status: 200,
      data: trainings,
      message: 'Successfully fetched back quizzes',
    };
  } catch (error) {
    console.log(error);
    return null;
  }
}