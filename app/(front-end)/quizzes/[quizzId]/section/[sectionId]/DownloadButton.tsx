"use client";
import { Button } from "@/components/ui/button";

const DownloadButton = ({ data }: { data: any }) => {
  // const file = new Blob([textOutput, "\n", "oop"], { type: "text/plain" });
  const file = new Blob(
    [
      "---",
      "\n",
      "# article-",
      data?.atNo ? data?.atNo : data?.id,
      ".md ",
      "\n",
      "title: ",
      data?.name,
      "\n",
      "country: ",
      data?.country,
      "\n",
      "examination: ",
      data?.examination,
      "\n",
      "grade: ",
      data?.grade,
      "\n",
      "year : ",
      data?.year,
      "\n",
      "medium : ",
      data?.medium,
      "\n",
      "slug: ",
      data?.slug,
      "\n",
      "section: ",
      data?.section,
      "\n",
      "type: ",
      data?.type,
      "\n",
      "description: ",
      data?.description,
      "\n",
      "imageUrl: ",
      data?.image,
      "\n",
      "category: ",
      data?.category,
      "\n",
      "keywords: ",
      data?.keywords,
      "\n",
      "questions: ",
      JSON.stringify(data),
    ],
    { type: "text/plain" }
  );

  return (
    <Button>
      <a
        download={`article-${data?.atNo ? data?.atNo : data?.id}.md`}
        target="_blank"
        rel="noreferrer"
        href={URL.createObjectURL(file)}
        style={{
          textDecoration: "inherit",
          color: "inherit",
        }}
      >
        Download
      </a>
    </Button>
  );
};
export default DownloadButton;
