"use client";
import React, { useEffect, useState } from "react";
import Quiz from "./Quiz";
import { Loader } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface QuizProps {
  start?: any;
  arrUserAn: any;
  userId: string | undefined;
  quizzId: any;
  post: any;
  pause?: any;
  posts: any;
  tagParams?: any;
  quizzFilterData?: any;
}

function Filter({
  start,
  arrUserAn,
  userId,
  quizzId,
  post,
  pause,
  posts,
  tagParams,
  quizzFilterData,
}: QuizProps) {
  console.log(arrUserAn, tagParams);

  // const filterData = JSON.parse(tagsLc);

  const filterData: any = quizzFilterData;

  // tagParams
  //   ? {
  //       data: [
  //         // { slug: "advanced-level-accounting", tags: ["tag", "tag1"] },
  //         { slug: quizzId, tags: [tagParams] },
  //         // { slug: "advanced-level-accounting", tags: ["ta22g3", "ta22g3"] },
  //       ],
  //     }
  //   : {
  //       data: [
  //         {
  //           slug: "advanced-level-accounting",
  //           tags: allTags(
  //             posts?.find((y: any) => y?.slug == "advanced-level-accounting")
  //               ?.questions
  //           ),
  //         },
  //         {
  //           slug: "advanced-level-economics",
  //           tags: allTags(
  //             posts?.find((y: any) => y?.slug == "advanced-level-economics")
  //               ?.questions
  //           ),
  //         },
  //         // { slug: "advanced-level-accounting", tags: ["ta22g3", "ta22g3"] },
  //       ],
  //     };

  const tagsCount = filterData?.data
    .map((x: any) => x?.tags?.length)
    .reduce((a: number, b: number) => a + b, 0);

  // const allSlugs: any[] = posts
  //   ?.filter((x: any) => x?.slug)
  //   .map((a: any) => a.slug);
  const mergeArrays = (filterData: any) => {
    const slugsArray = filterData?.data.map((a: any) => a.slug);
    const filteredBySlug = posts.filter((y: any) =>
      slugsArray?.includes(y?.slug)
    );
    const maxLen = filteredBySlug
      .map((x: any) => ({
        qLen: x?.questions?.quizzesSection[0]?.questions?.length,
        ...x,
      }))
      .reduce(function (prev: any, current: any) {
        return prev && prev.qLen > current.qLen ? prev : current;
      });

    const newArray: any = maxLen?.questions?.quizzesSection[0]?.questions;
    const new1: any = [];
    newArray.map((x: any, i: any) => {
      new1.push(questionOptions(filteredBySlug, filterData, i));
    });

    const new2 = new1.map((x: any, i: any) => ({
      index: i,
      questionOptions: x?.questionOptions,
    }));
    console.log(new2);
    const questionArray = new2.map((x: any) =>
      x?.questionOptions[0]?.id ? x?.questionOptions[0] : null
    );

    return questionArray.filter((x: any) => x !== null);
  };

  const [loadingLc, setLoadingLc] = useState(true);
  const [questionArray, setQuestionArray] = useState<any>(null);

  useEffect(() => {
    setLoadingLc(true);
    // let valueLc;
    // // Get the valueLc from local storage if it exists
    // valueLc = localStorage.getItem("tagsLc") || null;
    // setTagsLc(valueLc);
    tagsCount > 0 && setQuestionArray(mergeArrays(filterData));
    setLoadingLc(false);
  }, []);
  const questionOptions = (data: any, filterData: any, ind: any) => {
    const newArray: any = [];
    filterData?.data.map((x: any, i: any) => {
      data[i]?.questions?.quizzesSection[0]?.questions[
        ind
      ]?.questionOptions?.map((y: any, j: any) => {
        console.log(j);
        filterData?.data
          ?.filter((z: any) => z?.slug == data[i]?.slug)[0]
          ?.tags.includes(y?.tag) &&
          newArray.push({ slug: data[i]?.slug, ...y });
      });
    });

    return { questionOptions: shuffle(newArray) };
  };
  // -------------------------
  const shuffle = (array: any) => {
    const suffledData = array.sort(() => Math.random() - 0.5);

    return suffledData;
  };

  ///////////////////////////

  return (
    <div className="">
      <div className="">
        {!loadingLc ? (
          filterData?.data.find((x: any) => x?.slug == quizzId)?.data?.length >
          0 ? (
            <>
              <div className="border p-1 my-1">
                {filterData?.data?.map((x: any, i: any) => (
                  <div key={i} className="border mb-1 p-1">
                    {x?.slug}
                    <div>
                      {x?.tags?.map((y: any, i: any) => (
                        <Badge key={i} className="border p-1">
                          {y}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <></>
          )
        ) : (
          <div className="h-screen w-full flex items-center justify-center pt-5">
            <Loader className="h-6 w-6 text-green-600 animate-spin" />
          </div>
        )}
        <hr />
      </div>
      {questionArray?.length > 0 ? (
        !loadingLc && tagsCount > 0 ? (
          <>
            <Quiz
              start={start}
              userId={userId}
              quizzId={quizzId}
              quizzObjId={post?.questions?.id}
              post={post}
              questionArray={questionArray}
              pause={pause}
              sectionId={post?.questions?.quizzesSection[0]?.id}
            />
          </>
        ) : (
          <div className="h-full w-full flex items-center justify-center pt-5">
            <Loader className="h-6 w-6 text-green-600 animate-spin" />
          </div>
        )
      ) : (
        "No questions"
      )}{" "}
      {/* </div> */}
      {/* {JSON.stringify(posts)} */}
    </div>
  );
}

export default Filter;
