// import MarkdownIt from "markdown-it";
// import { getAllPosts } from "@/lib/posts";
import { notFound } from "next/navigation";
// import Onthispage from "@/components/Onthispage";
import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeSlug from "rehype-slug";
import { rehypePrettyCode } from "rehype-pretty-code";
import { transformerCopyButton } from "@rehype-pretty/transformers";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import Image from "next/image";
// import FolderStructue from "@/components/FolderStructure";
import Link from "next/link";
import { BsGithub } from "react-icons/bs";
import type { Metadata, ResolvingMetadata } from "next";
import { Suspense } from "react";
import QuizData from "./_components/QuizData";
import { fetchByIdSlug } from "../actions/list";
import { auth } from "@/lib/auth";

// const md = new MarkdownIt();
type Props = {
  params: Promise<{ quizzId: string }>;
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const sesson: any = await auth();
  console.log(parent);
  const slug: any = (await params)?.quizzId;

  const itemsDb: any = await fetchByIdSlug(slug, sesson?.user?.id);
  // const post: any = await fetchPost(slug);
  const post: any = {
    title: itemsDb?.name,
    country: itemsDb?.country,
    examination: itemsDb?.examination,
    grade: itemsDb?.grade,
    year: itemsDb?.year,
    medium: itemsDb?.medium,
    slug: itemsDb?.slug,
    section: itemsDb?.section,
    type: itemsDb?.type,
    description: itemsDb?.description,
    imageUrl: itemsDb?.image,
    category: itemsDb?.category,
    keywords: itemsDb?.keywords,
    questions: itemsDb || [],
  };

  return {
    title: post?.title,
    description: post?.description,
    keywords: post?.keywords,
    openGraph: {
      images: post?.image ? post?.image : "/opengraph-image.png",
    },
  };
}

export default async function Post({ params, searchParams }: any) {
  const sesson: any = await auth();
  const slug = (await params)?.quizzId;
  const keyword = (await searchParams).start;
  const pause = (await searchParams).pause;
  const tagParams = (await searchParams).tag;
  const poolId = (await searchParams).poolId;

  const itemsDb: any = await fetchByIdSlug(slug, sesson?.user?.id);
  // const post: any = await fetchPost(slug);
  const post: any = {
    title: itemsDb?.name,
    country: itemsDb?.country,
    examination: itemsDb?.examination,
    grade: itemsDb?.grade,
    year: itemsDb?.year,
    medium: itemsDb?.medium,
    slug: itemsDb?.slug,
    section: itemsDb?.section,
    type: itemsDb?.type,
    description: itemsDb?.description,
    imageUrl: itemsDb?.image,
    category: itemsDb?.category,
    keywords: itemsDb?.keywords,
    questions: itemsDb,
  };

  if (!post || post?.slug == null || post?.slug == "") {
    notFound();
  }

  // quizz Variables
  const userId = sesson?.user?.id;

  const items: any = post?.questions;

  const sectionDetails = items?.quizzesSection.filter(
    (x: any) => x?.id == items?.quizzesSection[0]?.id
  );

  const arrUserAn: any = [];

  const allTags: any = [];
  const it = items.quizzesSection.filter(
    (x: any) => x?.id == items?.quizzesSection[0]?.id
  );

  it[0]?.questions.map((x: any) =>
    x.questionOptions.filter(
      (y: any) => allTags.indexOf(y?.tag) === -1 && allTags.push(y?.tag)
    )
  );
  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeStringify)
    .use(rehypeSlug)
    .use(rehypePrettyCode, {
      theme: "github-dark",
      transformers: [
        transformerCopyButton({
          visibility: "always",
          feedbackDuration: 3_000,
        }),
      ],
    })
    .use(rehypeAutolinkHeadings);

  // const cnt = md.render(post.content);
  const htmlContent = (await processor?.process(post?.content))?.toString();

  return (
    <MaxWidthWrapper className="prose dark:prose-invert">
      {/* <pre>{JSON.stringify(getAllPostsBySlug(), null, 2)}</pre>{" "} */}
      <div className="flex md:container md:mx-auto post ">
        <div className="p-5 w-full">
          {/* <h1>{post?.title}</h1> */}
          <div className="container mx-auto ">
            {/* <div className="bg-gray-600 mb-5 ">
            <AdBanner
              dataAdFormat="auto"
              dataFullWidthResponsive={true}
              dataAdSlot="9213908018"
            />
          </div> */}
          </div>
          {/* <dl className=" text-gray-400">
          <dt className="sr-only">Published On</dt>
          <dd className="text-sm sm:text-base font-medium flex items-center gap-1">
            <BiCalendar className="h-4 w-4" />
            <time dateTime={post?.createdAt}>
              {formatDate(post?.createdAt)}
            </time>
          </dd>
        </dl> */}
          {/* question section start */}

          <div>
            <div className="min-h-[300px]">
              <Suspense fallback={"Loading... "}>
                <>
                  {(() => {
                    switch (sectionDetails[0].type) {
                      case "MCQ":
                        return (
                          <>
                            {/* -<pre>{JSON.stringify(post, null, 2)}</pre> */}
                            <QuizData
                              start={keyword}
                              arrUserAn={arrUserAn}
                              userId={userId}
                              quizzId={slug}
                              post={post}
                              pause={pause}
                              posts={[{ ...post }]}
                              tagParams={tagParams}
                              poolId={poolId}
                            />
                            {/* <Quiz
                              start={keyword}
                              currentValues={fArr}
                              arrUserAn={arrUserAn}
                              userId={userId}
                              quizzId={slug}
                              sectionName={
                                sectionDetails.length > 0
                                  ? sectionDetails[0].name
                                  : ""
                              }
                              post={post}
                            />{" "} */}
                          </>
                        );

                      default:
                        return "not selected type";
                    }
                  })()}
                </>
              </Suspense>
            </div>
          </div>
          {/* question section start */}

          {post?.image && (
            <div className="w-full relative pt-[100%]">
              <Image
                src={post?.image}
                alt="profile"
                objectFit="cover"
                fill
                className="w-full h-full top-0 left-0 object-cover rounded-2xl"
              />
            </div>
          )}
          <div className="mt-2">
            <div
              dangerouslySetInnerHTML={{ __html: htmlContent }}
              className=" w-full mt-5"
            ></div>

            <div className=" rounded">
              {post?.author && (
                <div className="mt-5 p-5 ">
                  <div className="md:flex items-center justify-between">
                    <Link
                      href={post?.author?.link}
                      target="_blank"
                      className="w-1/2"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-[100px] h-[100px] relative">
                          <Image
                            src={
                              post?.author?.image
                                ? post?.author?.image
                                : "/user.png"
                            }
                            alt={post?.author?.name}
                            // objectFit="cover"
                            // fill
                            width={100}
                            height={100}
                            className="w-full h-full top-0 left-0 object-cover rounded-full"
                          />
                        </div>
                        <div>
                          <h4>Author</h4>
                          <h3 className="text-lg font-bold">
                            {post?.author?.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {" "}
                            {post?.author?.position}
                          </p>
                        </div>
                      </div>
                    </Link>{" "}
                    <div className="mb-5">
                      <div className="md:w-[250px]">
                        {" "}
                        {post?.downloadLink && (
                          <Link href={post?.downloadLink?.link} target="_blank">
                            <span className="flex items-center justify-center py-3 bg-gray-800 text-white hover:bg-gray-700 gap-2 border px-2 rounded  cursor-pointer ">
                              {/* <BiPhone className="bg-white rounded-full p-1 text-green-600" />{" "} */}
                              {post?.downloadLink?.icon == "github" ? (
                                <BsGithub className="bg-white w-8 h-8 rounded-full p-1 text-green-600" />
                              ) : (
                                ""
                              )}
                              Source Code
                            </span>
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        {/* <Onthispage className="text-sm w-[20%]  " htmlContent={htmlContent} /> */}
      </div>
    </MaxWidthWrapper>
  );
}
