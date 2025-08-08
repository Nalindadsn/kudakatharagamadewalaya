"use client";
import { useState, useEffect } from "react";
import ReactCountryFlag from "react-country-flag";

import Filter from "./filter";
import useFavouriteStore from "@/store/cartStore";
import { Globe } from "lucide-react";

interface QuizProps {
  userId: string | undefined;
  quizzId: any;
  arrUserAn: any;
  start?: any;
  post: any;
  pause?: any;
  posts: any;
  tagParams?: any;
  poolId?: any;
}

const QuizData = ({
  start,
  arrUserAn,
  userId,
  quizzId,
  post,
  pause,
  posts,
  tagParams,
  poolId,
}: QuizProps) => {
  const { items } = useFavouriteStore((state) => state);
  const currentPool = items?.find((x: any) => x?.id == poolId);

  const allTags: any = (items: any) => {
    const sectionDetails = items?.quizzesSection.filter(
      (x: any) => x?.id == items?.quizzesSection[0]?.id
    )[0];
    const allTags: any = [];
    sectionDetails?.questions.map((x: any) =>
      x.questionOptions.filter(
        (y: any) => allTags.indexOf(y?.tag) === -1 && allTags.push(y?.tag)
      )
    );
    return allTags;
  };

  const reorganizePoolArray = (currentPool: any, posts: any) => {
    const data = currentPool?.quizzes.map((x: any) => ({
      slug: x,
      tags: allTags(posts?.find((y: any) => y?.slug == x)?.questions),
    }));

    // const data = currentPool?.quizzes.map((x: any) => ({
    //   slug: x,
    //   tags: allTags(posts?.find((y: any) => y?.slug == x)?.questions),
    // }));
    data?.push({
      slug: currentPool?.based,
      tags: allTags(
        posts?.find((y: any) => y?.slug == currentPool?.based)?.questions
      ),
    });
    return data;
  };

  const [loadingLc, setLoadingLc] = useState(true);
  const quizzFilterData = [
    {
      slug: quizzId,
      tags: allTags(posts?.find((y: any) => y?.slug == quizzId)?.questions),
    },
  ];

  useEffect(() => {
    setLoadingLc(true);

    setLoadingLc(false);
  }, []);

  return (
    <div className="">
      <div className="flex justify-between items-center">
        <div>
          {post?.examination}
          {post?.year && " -" + post?.year}
        </div>
        <div>
          {" "}
          <div>
            {!poolId && post?.country && (
              <>
                {(() => {
                  switch (post?.country) {
                    case "LK":
                      return (
                        <span className="flex items-center gap-2">
                          <span>Sri Lanka</span>
                          <ReactCountryFlag
                            countryCode="LK"
                            svg
                            style={{
                              width: "2em",
                              height: "2em",
                            }}
                            title="LK"
                          />
                        </span>
                      );
                    case "GLOBAL":
                      return (
                        <span className="flex items-center gap-2">
                          <span>Global</span>
                          <Globe />
                        </span>
                      );
                    default:
                      return (
                        <span className="flex items-center gap-2">
                          <span>Global</span>
                          <Globe />
                        </span>
                      );
                  }
                })()}
              </>
            )}
          </div>
        </div>
      </div>
      {!loadingLc && (
        <Filter
          start={start}
          arrUserAn={arrUserAn}
          userId={userId}
          quizzId={quizzId}
          post={post}
          pause={pause}
          posts={posts}
          tagParams={tagParams}
          quizzFilterData={
            poolId
              ? { data: reorganizePoolArray(currentPool, posts) }
              : { data: quizzFilterData }
          }
        />
      )}
    </div>
  );
};

export default QuizData;
