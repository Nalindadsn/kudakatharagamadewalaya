import { Suspense } from "react";

import { GetPokemons } from "./_actions";
import CardList from "./_components/card-list";
import Pagination from "./_components/pagination";
import SearchPokemon from "./_components/search";
import SkeletonCardList from "./_components/skeleton";

export default async function ResultsCmp({ searchParams, params }: any) {
  const search = (await searchParams)?.query || "";
  const currentPage = Number((await searchParams)?.page) || 1;
  const limit = Number((await searchParams)?.limit) || 10;
  const type = (await searchParams)?.type;
  const offset = (currentPage - 1) * limit;
  const { id } = await params;
  const { data, totalPages }: any = await GetPokemons({
    offset,
    limit,
    search,
    type,
  });

  return (
    <div className="container mx-auto p-2">
      <h1 className="text-green-600 ml-2 font-bold  text-3xl">All Quizzes</h1>
      {search && (
        <span className="border text-sm px-2">
          SEARCH : <span className=""> {search}</span>{" "}
        </span>
      )}
      <div className="flex w-full justify-end mb-2">
        <Pagination totalPages={totalPages} />
      </div>
      <Suspense key={search + currentPage} fallback={<SkeletonCardList />}>
        <CardList data={data} />
      </Suspense>
    </div>
  );
}
