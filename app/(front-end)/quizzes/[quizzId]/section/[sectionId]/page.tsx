import { Button } from "@/components/ui/button";
import { fetchByIdMain } from "../../../actions/list";
import DownloadButton from "./DownloadButton";

export const dynamic = "force-dynamic";

async function getData() {
  const data: any = [];
  return data;
}

const page = async ({ params, searchParams }: any) => {
  const questions = await getData();
  const userId = "680bde62db7d58e3fd044780";

  const items: any = await fetchByIdMain(
    (
      await params
    )?.quizzId,
    (
      await params
    )?.sectionId,
    userId
  );

  // const data ={
  //   title: `GCE Advanced Level - Science for Technology 2023(2024)`,
  // country : "LK"
  // examination : Term Test
  // grade : 13
  // year : 2019
  // medium : Sinhala
  // slug: gce-advanced-level-science-for-technology-2023-2024
  // section: Part 1
  // type: MCQ
  // description:
  // imageUrl: /images/cpp.png
  // category: [name: "advanced-level" , subCategory :{name: "economics" }]
  // keywords: ["nextjs14", "nextjs15", "crud", "server action", "nextjs form", ""]
  // createdAt: "2024/11/27"

  // questions: {}
  // }

  return (
    <>
      {/* <DownloadButton data={items} />
      <hr />
      ---
      <br /># article-{items?.atNo ? items?.atNo : items?.id}.md <br />
      title: {items?.name}
      <br />
      country : {items?.country}
      <br />
      examination : {items?.examination}
      <br />
      grade : {items?.grade}
      <br />
      year : {items?.year}
      <br />
      medium : {items?.medium}
      <br />
      slug: {items?.slug}
      <br />
      section: {items?.section}
      <br />
      type: {items?.type}
      <br />
      description: {items?.description}
      <br />
      imageUrl: {items?.image}
      <br />
      category: {items?.category}
      <br />
      keywords: {items?.keywords}
      <br />
      questions:
      <br /> */}
      <pre>{JSON.stringify(items, null, 2)}</pre>
    </>
  );
};

export default page;
