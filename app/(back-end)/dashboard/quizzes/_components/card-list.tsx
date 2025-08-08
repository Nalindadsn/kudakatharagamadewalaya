import PokemonCard from "./card";

export default async function CardList({
  data,
  orgId,
  categories,
}: {
  data: any;
  orgId: any;
  categories: any;
}) {
  return (
    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-2 ">
      {/* {JSON.stringify(data)} */}

      {data.map((p: any) => (
        <PokemonCard
          key={p.id}
          data={p}
          orgId={orgId}
          categories={categories}
        />
      ))}
    </div>
  );
}
