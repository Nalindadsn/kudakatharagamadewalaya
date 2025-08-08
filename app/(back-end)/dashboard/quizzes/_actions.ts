"use server";

// import prismadb from "@/lib/prismadb"
import { db } from "@/lib/db";
import { Quizzes } from "@prisma/client";

export async function GetPokemons({
  search,
  offset = 0,
  limit = 10,
  type,
}: {
  search?: string | undefined;
  offset?: number;
  limit?: number;
  type?: any;
}) {
  const ty = type;

  const qu: any = {};

  qu[ty] = { contains: search };
  console.log(qu);

  const data = await db.quizzes.findMany({
    include: {
      quizzesSection: {
        include: {
          questions: true,
          quizResult: true,
        },
      },
    },
    where: type ? qu : { name: { contains: search } },

    skip: offset,
    take: limit,
    //   select:{
    //     id:true,
    //     name:true,
    //     description:true
    //   }
    orderBy: {
      atNo: "desc",
    },
  });

  // console.log(data)

  const totalCount = await db.quizzes.count({
    where: type ? qu : { name: { contains: search } },
  });
  const totalPages = Math.ceil(totalCount / limit);

  return { data, totalCount, totalPages };
}

interface GetQuizzesByIdParams {
  id?: string;
}

export async function GetPokemonsById(
  params: GetQuizzesByIdParams,
  pId: string
): Promise<Quizzes | null> {
  // if (id) {
  //   query.id = id;
  // }

  try {
    const { id } = params;

    const query: any = {};

    if (id) {
      query.id = id;
    }
    query.orgId = pId;

    const channel = await db.quizzes.findFirst({
      where: query,
    });

    return channel;
  } catch (error: any) {
    throw new Error(error);
  }
}
