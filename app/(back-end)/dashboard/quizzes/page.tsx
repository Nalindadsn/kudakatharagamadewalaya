import { Suspense } from "react";

// import prismadb from "@/lib/prismadb"

import { GetPokemons } from "./_actions";
import CardList from "./_components/card-list";
import Pagination from "./_components/pagination";
import SearchPokemon from "./_components/search";
import SkeletonCardList from "./_components/skeleton";

import Add from "./_components/add";
import { getCategories } from "./category-actions";
// import { RegisterForm } from "./_components/register-form";
export default async function Home({ searchParams, params }: any) {
  const search = (await searchParams)?.query || "";
  const currentPage = Number((await searchParams)?.page) || 1;
  const limit = Number((await searchParams)?.limit) || 20;
  const type = (await searchParams)?.type;
  const offset = (currentPage - 1) * limit;

  const { data, totalPages }: any = await GetPokemons({
    offset,
    limit,
    search,
    type,
  });
  const categories = await getCategories();
  return (
    <>
      <div className="flex w-full justify-between">
        <h1 className="text-green-600 ml-2 font-bold mb-4 text-3xl">
          All Quizzes
        </h1>
        <Add />
      </div>
      <div className=" md:flex w-full mb-5">
        <div className="  w-full  w-full">
          <SearchPokemon />
        </div>
        <div className="  flex justify-end">
          <div className="mr-1">
            <Pagination totalPages={totalPages} />
          </div>
        </div>
      </div>

      <Suspense key={search + currentPage} fallback={<SkeletonCardList />}>
        <CardList
          data={data}
          orgId={(await params)?.id}
          categories={categories}
        />
      </Suspense>
    </>
  );
}
