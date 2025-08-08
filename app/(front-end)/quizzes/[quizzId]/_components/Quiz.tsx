"use client";
import { useState, useEffect, Suspense } from "react";
import StatCard from "./StatCard";
import {
  Bell,
  CirclePause,
  Clock,
  Frown,
  Loader,
  Meh,
  Play,
  RotateCcw,
  Sheet,
  Smile,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

import { permanentRedirect } from "next/navigation";
import toast from "react-hot-toast";
import clsx from "clsx";
import { IoCloseOutline } from "react-icons/io5";
import { MdQuiz } from "react-icons/md";
import { useTheme } from "next-themes";

interface QuizProps {
  userId: string | undefined;
  quizzId: any;
  quizzObjId?: any;
  start?: any;
  post: any;
  questionArray: any;
  pause?: any;
  sectionId?: any;
}

const Quiz = ({
  start,
  userId,
  quizzId,
  quizzObjId,

  post,
  questionArray,
  pause,
  sectionId,
}: QuizProps) => {
  // filterData-start
  console.log(userId);

  // const [nowTime, setNowTime] = useState<number>(0.24);

  // useEffect(() => {
  //   // setNowTime(Number(`0.${Moment(new Date()).format("ss")}`));
  // }, []);

  // filterData-end
  const { theme } = useTheme();

  const quiZFiltered = questionArray;
  const [loadingLc, setLoadingLc] = useState(true);

  // useEffect(() => {
  //   setQuiZFiltered1(
  //     reorganizedData(
  //       post?.questions,
  //       parseTagsLc?.data ? parseTagsLc?.data : allTags(post?.questions)
  //     )
  //   );
  // }, []);

  useEffect(() => {
    setLoadingLc(true);
    // let valueLc;
    // // Get the valueLc from local storage if it exists
    // valueLc = localStorage.getItem("tagsLc") || null;
    // setTagsLc(valueLc);
    setLoadingLc(false);
  }, []);

  // When user submits the form, save the favorite number to the local storage

  ////////////////////////////////////

  const [loading, setLoading] = useState(false);
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<any | undefined>({
    skiped: true,
  });
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState<number | null>(
    null
  );
  const [showResults, setShowResults] = useState(false);
  const [results, setResults] = useState({
    score: 0,
    trueOrFalses: 0,
    wrongAnswers: 0,
  });
  const [answerList, setAnswerList] = useState<any | undefined>([]);
  // const [antimeRemaining, setAnTimeRemaining] = useState(5);
  const [timeRemaining, setTimeRemaining] = useState(
    quiZFiltered.length > 0
      ? quiZFiltered[0].anTime
        ? quiZFiltered[0].anTime
        : 25
      : 25
  );
  const [timerRunning, setTimerRunning] = useState(false);

  const { name, trueOrFalse } =
    quiZFiltered.length > 0 && quiZFiltered[activeQuestion];
  const answerOptions =
    quiZFiltered.length > 0 && quiZFiltered[activeQuestion]?.answerOptions;
  console.log(trueOrFalse);
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (timerRunning && timeRemaining > 0) {
      timer = setTimeout(() => {
        setTimeRemaining((prevTime: any) => prevTime - 1);
      }, 1000);
    } else if (timeRemaining === 0) {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [timerRunning, timeRemaining]);

  const startTimer = () => {
    setTimerRunning(true);
  };

  const stopTimer = () => {
    setTimerRunning(false);
  };

  const resetTimer = () => {
    if (activeQuestion !== quiZFiltered.length - 1) {
      setTimeRemaining(
        quiZFiltered?.length > 0 && quiZFiltered[activeQuestion + 1].anTime
          ? quiZFiltered[activeQuestion + 1]?.anTime
          : 25
      );
    } else {
      // console.log("finished", activeQuestion + 1)
      // console.log("added to db")
    }
  };

  const handleTimeUp = () => {
    stopTimer();

    resetTimer();

    if (!showResults) {
      nextQuestion();
    }
  };

  useEffect(() => {
    start == 1 && startTimer();

    return () => {
      stopTimer();
    };
  }, [start]);

  const onAnswerSelected = (answer: any, idx: number) => {
    //  alert(JSON.stringify(answer))
    setChecked(true);
    setSelectedAnswerIndex(idx);
    if (answer.trueOrFalse) {
      setSelectedAnswer({ ...answer, skiped: false, givenAnswer: answer.name });
    } else {
      setSelectedAnswer({ ...answer, skiped: false, givenAnswer: answer.name });
    }
  };

  const nextQuestion = () => {
    setSelectedAnswer({ skiped: true });

    setSelectedAnswerIndex(null);

    setResults((prev) =>
      selectedAnswer?.trueOrFalse == true
        ? {
            ...prev,
            score: prev.score + 1,
            trueOrFalses: prev.trueOrFalses + 1,
          }
        : {
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
          }
    );
    // alert(JSON.stringify(selectedAnswer))
    // alert(JSON.stringify(quiZFiltered[activeQuestion]))
    answerList.push({
      ...quiZFiltered[activeQuestion],
      answerStatus: {
        ...selectedAnswer,
        correctAnswer:
          quiZFiltered[activeQuestion].answerOptions &&
          quiZFiltered[activeQuestion].answerOptions.filter(
            (x: any) => x.trueOrFalse == true
          )[0].name,
      },
    });

    setAnswerList(answerList);

    const countCorrect: any = answerList.filter(
      (x: any) => x.answerStatus.trueOrFalse == true
    );
    const countWrong: any = answerList.filter(
      (x: any) => x.answerStatus.trueOrFalse == false
    );
    const skiped: any = answerList.filter(
      (x: any) => x.answerStatus.skiped == true
    );

    setLoading(true);

    if (answerList.length == quiZFiltered.length) {
      // alert("quiz finished");
      if (userId) {
        fetch("/api/quizResults", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userId,
            quizScore: quiZFiltered.length,
            correctAnswers: countCorrect.length,
            wrongAnswers: countWrong.length,
            skiped: skiped.length,
            answers: answerList,
            quizzId: quizzObjId,
            sectionId: sectionId,
          }),
        })
          .then((response) => {
            if (!response.ok) {
              toast.error("Network response was not working fam");
            }
            return response.json();
          })
          .then((data) => {
            toast.success("Quiz results saved successfully:", data);
          })
          .catch((error) => {
            toast.error("Error saving quiz results:", error);
          });
      }
    }
    setLoading(false);

    if (activeQuestion !== quiZFiltered.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setShowResults(true);
      stopTimer();
    }
    setChecked(false);
    resetTimer();
    startTimer();
    // alert(JSON.stringify(results1))
    if (selectedAnswer.skiped == true) {
      toast.dismiss();
      toast.error("Q:" + (activeQuestion + 1) + " " + "skipped answer");
    } else {
      if (selectedAnswer?.trueOrFalse == true) {
        toast.dismiss();
        toast.success("Q:" + (activeQuestion + 1) + " " + "correct answer");
      } else {
        toast.dismiss();
        toast.error("Q:" + (activeQuestion + 1) + " " + "wrong answer");
      }
    }
  };
  useEffect(() => {
    if (
      pause == 1 &&
      answerList?.length === 0 &&
      activeQuestion === 0 &&
      timeRemaining === quiZFiltered[0]?.anTime
    ) {
      permanentRedirect(`/quizzes/${quizzId}?start=${start ? start : 0}`);
    }
  }, [
    pause,
    quizzId,
    start,
    answerList,
    activeQuestion,
    timeRemaining,
    quiZFiltered,
  ]);
  function fancyTimeFormat(duration: any) {
    // Hours, minutes and seconds
    const hrs = ~~(duration / 3600);
    const mins = ~~((duration % 3600) / 60);
    const secs = ~~duration % 60;

    // Output like "1:01" or "4:03:59" or "123:03:59"
    let ret = "";

    if (hrs > 0) {
      ret += "" + hrs + ":" + (mins < 10 ? "0" : "");
    }

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;

    return ret;
  }
  const arReverse = [...answerList].reverse();
  const [isSideMenuOpen, setMenu] = useState(false);

  useEffect(() => {
    if (pause == 1 && answerList?.length > 0) {
      setMenu(true);
    }
  }, [pause, answerList]);
  // let parseTagsLcAll = [];
  // const parseTagsLcAll =
  // parseTagsLc == "undefined" ? JSON.parse(parseTagsLc?.data) : "aaa";
  if (loadingLc)
    return (
      <div className="h-screen w-full flex items-center justify-center pt-5">
        <Loader className="h-6 w-6 text-green-600 animate-spin" />
      </div>
    );

  if (start !== "1") {
    return (
      !loadingLc && (
        <>
          <div
            className={clsx(
              " z-10 fixed flex  h-full w-screen  bg-black/50  backdrop-blur-sm top-0 right-0  -translate-x-full  transition-all ",
              isSideMenuOpen ? "block translate-x-0 " : "hidden"
            )}
          >
            <div
              className={`${
                theme == "dark" ? "bg-white" : "bg-white"
              } text-black  flex absolute left-0 right-[2%] top-0 h-screen p-8 gap-8 z-50 w-[95%] flex  overflow-y-auto`}
            >
              <div className="w-full">
                {arReverse.map((i: any, index: number) => {
                  return (
                    <div
                      key={index}
                      className={`border ${
                        i?.answerStatus?.trueOrFalse
                          ? `border-green-500`
                          : `border-red-500`
                      } rounded-md p-3 mb-1`}
                    >
                      <div className="flex justify-between">
                        <div>
                          <Badge
                            className={
                              i?.answerStatus?.skiped
                                ? "text-yellow-500  flex  bg-gray-800"
                                : i?.answerStatus?.trueOrFalse
                                ? "text-white bg-gray-800  flex"
                                : "text-white bg-red-500  flex"
                            }
                          >
                            Question{" "}
                            <span className="ml-2">
                              {arReverse.length - index}
                            </span>
                          </Badge>
                        </div>

                        <div>
                          {/* <div className="flex justify-end w-full overflow-auto mb-3 p-1">
                      {userAnsweringHistory(i?.id).map((z: any) => {
                        return (
                          <div
                            key={z?.id}
                            className={`${
                              z?.trueOrFalse
                                ? "border  border-green-600 bg-green-200 "
                                : "border  border-red-600 bg-red-200 "
                            } w-3 h-3 mr-1`}
                          ></div>
                        );
                      })}
                      <div
                        className={`${
                          i?.answerStatus?.trueOrFalse
                            ? "border  border-green-500 bg-green-300 "
                            : "border  border-red-500 bg-red-300 "
                        } w-3 h-3 mr-1`}
                      ></div>
                      <div></div>
                    </div> */}

                          <div className="text-right text-sm flex items-center justify-end  pl-2 text-gray-600">
                            <div>
                              {" "}
                              <span className="text-gray-900">{i?.slug}</span>
                              <br />
                              {i?.tag}
                              {/* <ArrowBigRightDash className="w-3 h-3" /> */}
                              {" - "}
                              {i?.subTag !== null && i?.subTag}
                            </div>
                            <br />

                            {i?.answerStatus?.skiped ? (
                              <>
                                <div className="rounded-full text-[#209C05]">
                                  <Meh className="w-6 h-6 text-orange-400 p-1" />
                                </div>
                              </>
                            ) : i?.answerStatus?.trueOrFalse ? (
                              <div className=" rounded-full text-[#209C05]">
                                <Smile className="w-6 h-6 text-[#209C05] p-1" />
                              </div>
                            ) : (
                              <div className="rounded-full text-[#209C05]">
                                <Frown className="w-6 h-6 text-[#FF0A0A] p-1" />
                              </div>
                            )}
                            {/* face */}
                            {/* {(() => {
                          switch (
                            calculateGrade(
                              userAnsweringHistoryPercentage(
                                i?.id,
                                i?.answerStatus?.trueOrFalse,
                                userAnsweringHistory(i?.id).length + 1
                              )
                            )
                          ) {
                            case "A":
                              return (
                                <div className=" rounded-full text-[#209C05]">
                                  <Smile className="w-6 h-6 text-[#209C05] p-1" />
                                </div>
                              );
                            case "B":
                              return (
                                <div className=" rounded-full text-[#209C05]">
                                  <Smile className="w-6 h-6 text-[#209C05] p-1" />
                                </div>
                              );
                            case "C":
                              return (
                                <div className="rounded-full text-[#209C05]">
                                  <Meh className="w-6 h-6 text-[#EBFF0A] p-1" />
                                </div>
                              );
                            case "D":
                              return (
                                <div className="rounded-full text-[#209C05]">
                                  <Frown className="w-6 h-6 text-[#F2CE02] p-1" />
                                </div>
                              );
                            case "F":
                              return (
                                <div className="rounded-full text-[#209C05]">
                                  <Frown className="w-6 h-6 text-[#FF0A0A] p-1" />
                                </div>
                              );
                            default:
                              return "";
                          }
                        })()} */}
                          </div>
                        </div>
                      </div>

                      <div className="p-2">
                        <div
                          className="w-full"
                          dangerouslySetInnerHTML={{
                            __html: i?.name,
                          }}
                        ></div>

                        {/* 
          {i?.name} */}
                      </div>
                      {i?.answerOptions.map((x: any, index: any) => {
                        return (
                          <div
                            key={index}
                            className={`
                             
                               border  rounded-md  m-1  p-2 pl-3 

                        ${
                          x?.trueOrFalse
                            ? "bg-green-100 border-green-500  text-gray-800"
                            : i?.answerStatus?.skiped
                            ? "bg-yellow-100 border-yellow-500  text-gray-800"
                            : x?.id === i?.answerStatus?.id &&
                              "bg-red-100  border-red-500  text-gray-800"
                        }

                 
                      `}
                          >
                            <div
                              className="w-full"
                              dangerouslySetInnerHTML={{
                                __html: x?.name,
                              }}
                            ></div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>
            <div>
              <IoCloseOutline
                onClick={() => setMenu(false)}
                className=" fixed top-0 z-50 right-0  mt-0 mb-8 text-2xl cursor-pointer bg-red-500 text-white"
              />
            </div>
          </div>
          {/* {tagsArray.map((x: any) => {
            return (
              <Badge key={x} className="ml-1">
                <CheckIcon className="w-3 h-3 mr-1 text-green-500" /> {x}
              </Badge>
            );
          })} */}

          <div>
            {pause == 1 &&
            activeQuestion === 0 &&
            timeRemaining !== quiZFiltered[0]?.anTime ? (
              <div className="p-2 max-w-[1500px] mx-auto flex justify-between items-center border-b">
                <div>
                  {/* {tagsArray.map((x: any) => {
                    return (
                      <Badge key={x} className="ml-1">
                        <CheckIcon className="w-3 h-3 mr-1 text-green-500" />{" "}
                        {x}
                      </Badge>
                    );
                  })} */}

                  {/* {pause && pause == 1 && (
                    <Link
                      href={`/quizzes/${quizzId}?start=0`}
                      className="hover:bg-gray-200 bg-gray-100"
                    >
                      <Badge>
                        <Edit className="w-3 h-3 mr-1" />
                        EDIT
                      </Badge>
                    </Link>
                  )} */}
                </div>
                <div className="flex gap-3">
                  <Link
                    className="text-red-500"
                    href={`/quizzes/${quizzId}?start=1`}
                  >
                    <Play className="w-4 h-4 mr-1" />
                  </Link>

                  <button
                    className="text-blue-500"
                    // href={`/quizzes/${quizzId}?start=0`}
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you wish to restart the quiz ?"
                        )
                      )
                        window.location.reload();
                    }}
                  >
                    <RotateCcw className="w-4 h-4 mr-1" />
                  </button>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>

          {start == 1 ? (
            <>
              <Link href={`/quizzes/${quizzId}?start=1`} className="">
                <h1 className="text-4xl font-bold  text-center mb-3">
                  {/* {items?.name} */}
                  {quiZFiltered[0]?.name}
                </h1>
              </Link>
            </>
          ) : (
            <div className="text-center">
              <h1 className="text-5xl font-bold  mt-[5%]">
                <Link href={`/quizzes/${quizzId}?start=1`}>
                  {post?.title}
                  {/* <div dangerouslySetInnerHTML={{ __html: name }}></div> */}
                </Link>
              </h1>
              <br />

              <h3 className="text-2xl">
                <span className="font-bold">Section: {post?.section} </span>
                {/* {sectionDetails.length > 0 ? sectionDetails[0].name : ""} */}
              </h3>
              <h3 className="text-2xl">
                <span className="font-bold">Type: {post?.type}</span>
                {/* {sectionDetails.length > 0 ? sectionDetails[0].type : ""} */}
              </h3>
              <h3 className=" mb-2">
                <span className="font-bold">
                  Questions: {questionArray.length}{" "}
                </span>
                {/* {questionArray.length} */}
              </h3>
              {/* {JSON.stringify(quiZFiltered)}
              <hr />
              {JSON.stringify(quiZFiltered)} */}
              <Suspense fallback={"Loading... "}>
                {/* {tagsAll.map((i: any) => {
                return (
                  <Badge
                    key={i}
                    variant={allTags(post?.questions).includes(i) ? "default" : "outline"}
                    className={`mr-1 ${
                      allTags(post?.questions).includes(i) ? "" : "border border-gray-800"
                    }`}
                  >
                    {allTags(post?.questions).includes(i) && (
                      <CheckIcon className="w-3 h-3 mr-1 text-green-500" />
                    )}{" "}
                    {i}
                  </Badge>
                );
              })} */}
                <br />{" "}
                {quiZFiltered?.length > 0 ? (
                  <>
                    {activeQuestion == 0 &&
                    timeRemaining ==
                      (quiZFiltered[0]?.anTime
                        ? quiZFiltered[0]?.anTime
                        : 25) ? (
                      <Button asChild className="mt-3 border">
                        <Link href={`/quizzes/${post?.slug}?start=1`}>
                          {" "}
                          Start Quiz <Play className="w-3 h-3 ml-2" />
                        </Link>
                      </Button>
                    ) : (
                      <>
                        <Button
                          onClick={() => setMenu(true)}
                          className="mt-3 mr-1 "
                        >
                          Results
                          <MdQuiz className="w-3 h-3 ml-2" />
                        </Button>
                        <Button asChild className="mt-3 mr-1 border">
                          <a href={`/quizzes/${post?.slug}?start=1`}>
                            {" "}
                            Restart Quiz <RotateCcw className="w-3 h-3 ml-2" />
                          </a>
                        </Button>
                        {showResults ? (
                          <Button asChild className="mt-3 border">
                            <Link href={`/quizzes/${post?.slug}?start=1`}>
                              {" "}
                              Prev Result <Sheet className="w-3 h-3 ml-2" />
                            </Link>
                          </Button>
                        ) : (
                          <Button asChild className="mt-3 border">
                            <Link href={`/quizzes/${post?.slug}?start=1`}>
                              {" "}
                              Resume Quiz <Play className="w-3 h-3 ml-2" />
                            </Link>
                          </Button>
                        )}
                      </>
                    )}
                  </>
                ) : (
                  <Button className="mt-3  border" disabled>
                    Start Quiz <Play className="w-3 h-3 ml-2" />
                  </Button>
                )}
              </Suspense>
            </div>
          )}
          {/* {!loading && quiZFiltered.length > 0 ? (
          <Button asChild className="mt-3 border">
            <Link href={`/quizzes/${post?.slug}?start=1`}>
              {" "}
              Start Quiz <Play className="w-3 h-3 ml-2" />
            </Link>
          </Button>
        ) : (
          <Button className="mt-3  border" disabled>
            Start Quiz <Play className="w-3 h-3 ml-2" />
          </Button>
        )} */}
        </>
      )
    );
  }
  const tmProgress =
    (timeRemaining / questionArray[activeQuestion]?.anTime) * 100;
  return (
    !loadingLc && (
      <>
        <div className="min-h-[500px] ">
          {start == 1 ? (
            <>
              <Link href={`/quizzes/${quizzId}?start=1`} className="">
                <h1 className="text-4xl font-bold  text-center mb-3">
                  {quiZFiltered?.name}
                </h1>
              </Link>
            </>
          ) : (
            <></>
          )}
          {start == 1 ? (
            <>
              {!showResults && (
                <div className="fixed w-full left-0 bottom-0 bg-white z-50  ">
                  <span
                    className={`flex absolute bottom-0  text-white border text-xs px-1 ${
                      tmProgress < 25 ? "bg-red-600" : "bg-green-600"
                    }`}
                  >
                    <span>Q:{activeQuestion + 1} </span>
                    <span className="border-l ml-1 pl-1">
                      {fancyTimeFormat(timeRemaining)}
                    </span>
                  </span>
                  <div
                    className={`border-t ${
                      tmProgress < 25 ? "border-red-600" : "border-green-600"
                    } w-full `}
                  >
                    <div
                      className={`h-2 ${
                        tmProgress < 25 ? "bg-red-600" : "bg-green-600"
                      }`}
                      style={{
                        width:
                          (timeRemaining /
                            questionArray[activeQuestion]?.anTime) *
                            100 +
                          "%",
                      }}
                    ></div>
                  </div>
                </div>
              )}

              <div className=" border-b  flex justify-between items-center ">
                <div>
                  {/* quiz result menu content start */}
                  {/* quiz result menu content end */}
                </div>
                <div className="flex items-center  text-sm">
                  {showResults ? (
                    <span> </span>
                  ) : (
                    <span>Q:{activeQuestion + 1} &nbsp;</span>
                  )}
                  <Link
                    className="text-orange-500  flex gap-1 text-sm items-center border rounded px-2 mr-1"
                    href={`/quizzes/${quizzId}?start=0&pause=1`}
                  >
                    Pause <CirclePause className="w-3 h-3 mr-1 gap-1 " />
                  </Link>
                  <button
                    className="text-blue-500 flex text-sm items-center border rounded px-2"
                    // href={`/quizzes/${quizzId}?start=0`}
                    onClick={() => {
                      if (
                        window.confirm(
                          "Are you sure you wish to restart the quiz ?"
                        )
                      )
                        window.location.reload();
                    }}
                  >
                    Restart <RotateCcw className="w-3 h-3 mr-1" />
                  </button>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          {start == 1 ? (
            <>
              <Link href={`/quizzes/${quizzId}?start=1`} className="">
                <h1 className="text-4xl font-bold  text-center mb-3">
                  {quiZFiltered?.name}
                </h1>
              </Link>
            </>
          ) : (
            <></>
          )}

          {loading ? "Loading..." : ""}
          <div className="max-w-[1500px] mx-auto  flex justify-center py-0 flex-col">
            {!showResults ? (
              <>
                <div className="flex justify-between mb-10 items-center">
                  <div className="">
                    <h2 className="text-sm md:text-3xl ">
                      Question: {activeQuestion + 1}
                      <span>/{quiZFiltered.length}</span>
                    </h2>
                  </div>
                  <div className="md:flex md:gap-2 justify-end text-right">
                    <div
                      className={` border ${
                        timeRemaining < 6 ? "border-red-500" : ""
                      }   px-4 rounded-md py-1 flex items-center`}
                    >
                      {timeRemaining < 6 ? (
                        <Bell
                          className={` w-4 h-4 mr-2 ${
                            timeRemaining < 6
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        />
                      ) : (
                        <Clock
                          className={` w-4 h-4 mr-2 ${
                            timeRemaining < 6
                              ? "text-red-500"
                              : "text-green-500"
                          }`}
                        />
                      )}
                      {timeRemaining} seconds to answer
                    </div>
                  </div>
                </div>

                <div>
                  {/* <div className="mb-5 text-2xl font-bold"> */}
                  <div dangerouslySetInnerHTML={{ __html: name }}></div>

                  <div>
                    {answerOptions &&
                      answerOptions.length > 0 &&
                      answerOptions.map((answer: any, i: any) => (
                        <div
                          key={i}
                          onClick={() => onAnswerSelected(answer, answer.id)}
                          className={`flex  ${
                            theme == "light" && "bg-gray-100"
                          }  border cursor-pointer mb-5 py-3 rounded-md  px-3
                      ${
                        selectedAnswerIndex === answer.id &&
                        (theme == "light"
                          ? "  bg-gray-800 text-white  "
                          : theme == "dark" && "  bg-gray-800 text-white  ")
                      }
                      `}
                        >
                          <div className="w-8">
                            <input
                              type="radio"
                              checked={selectedAnswerIndex === answer.id}
                              onChange={(e) => {
                                console.log(e);
                              }}
                            />
                          </div>

                          <div
                            className="w-full"
                            dangerouslySetInnerHTML={{ __html: answer?.name }}
                          ></div>
                        </div>
                      ))}
                  </div>
                  <button
                    onClick={() => nextQuestion()}
                    disabled={!checked}
                    className={`${
                      !checked ? "cursor-not-allowed text-gray-400" : null
                    } font-bold`}
                  >
                    {activeQuestion === quiZFiltered.length - 1
                      ? "Finish"
                      : "Next Question →"}
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center">
                <h3 className="text-2xl uppercase mb-10">Results 📈</h3>
                <div className="grid lg:grid-cols-3 md:grid-cols-2 gap-10">
                  <StatCard
                    title="Percentage"
                    value={`${(
                      (results.trueOrFalses / quiZFiltered.length) *
                      100
                    ).toFixed(2)}%`}
                  />

                  <StatCard
                    title="Total Questions"
                    value={quiZFiltered.length}
                  />
                  <StatCard title=" Total Score" value={results.score} />
                  <StatCard
                    title="Correct Answers"
                    value={results.trueOrFalses}
                  />
                  <StatCard
                    title="Wrong Answers"
                    value={results.wrongAnswers}
                  />
                </div>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-10 font-bold uppercase border py-2 px-3  rounded-md"
                >
                  Restart Quiz
                </button>
              </div>
            )}
          </div>
          {showResults &&
            answerList.map((i: any, index: number) => {
              return (
                <div
                  key={index}
                  className={`border ${
                    i?.answerStatus?.trueOrFalse
                      ? `border-green-500`
                      : `border-red-500`
                  } rounded-md p-3 mb-1`}
                >
                  <div className="flex justify-between">
                    <div>
                      <Badge
                        className={
                          i?.answerStatus?.skiped
                            ? "text-yellow-500  flex  bg-gray-800"
                            : i?.answerStatus?.trueOrFalse
                            ? "text-white bg-gray-800  flex"
                            : "text-white bg-red-500  flex"
                        }
                      >
                        Question <span className="ml-2">{index + 1}</span>
                      </Badge>
                    </div>

                    <div>
                      {/* <div className="flex justify-end w-full overflow-auto mb-3 p-1">
                      {userAnsweringHistory(i?.id).map((z: any) => {
                        return (
                          <div
                            key={z?.id}
                            className={`${
                              z?.trueOrFalse
                                ? "border  border-green-600 bg-green-200 "
                                : "border  border-red-600 bg-red-200 "
                            } w-3 h-3 mr-1`}
                          ></div>
                        );
                      })}
                      <div
                        className={`${
                          i?.answerStatus?.trueOrFalse
                            ? "border  border-green-500 bg-green-300 "
                            : "border  border-red-500 bg-red-300 "
                        } w-3 h-3 mr-1`}
                      ></div>
                      <div></div>
                    </div> */}

                      <div className="text-right text-sm flex items-center justify-end  pl-2 text-gray-600">
                        <div>
                          {" "}
                          <span className="text-gray-900">{i?.slug}</span>
                          <br />
                          {i?.tag}
                          {/* <ArrowBigRightDash className="w-3 h-3" /> */}
                          {" - "}
                          {i?.subTag !== null && i?.subTag}
                        </div>
                        <br />

                        {i?.answerStatus?.skiped ? (
                          <>
                            <div className="rounded-full text-[#209C05]">
                              <Meh className="w-6 h-6 text-orange-400 p-1" />
                            </div>
                          </>
                        ) : i?.answerStatus?.trueOrFalse ? (
                          <div className=" rounded-full text-[#209C05]">
                            <Smile className="w-6 h-6 text-[#209C05] p-1" />
                          </div>
                        ) : (
                          <div className="rounded-full text-[#209C05]">
                            <Frown className="w-6 h-6 text-[#FF0A0A] p-1" />
                          </div>
                        )}
                        {/* face */}
                        {/* {(() => {
                          switch (
                            calculateGrade(
                              userAnsweringHistoryPercentage(
                                i?.id,
                                i?.answerStatus?.trueOrFalse,
                                userAnsweringHistory(i?.id).length + 1
                              )
                            )
                          ) {
                            case "A":
                              return (
                                <div className=" rounded-full text-[#209C05]">
                                  <Smile className="w-6 h-6 text-[#209C05] p-1" />
                                </div>
                              );
                            case "B":
                              return (
                                <div className=" rounded-full text-[#209C05]">
                                  <Smile className="w-6 h-6 text-[#209C05] p-1" />
                                </div>
                              );
                            case "C":
                              return (
                                <div className="rounded-full text-[#209C05]">
                                  <Meh className="w-6 h-6 text-[#EBFF0A] p-1" />
                                </div>
                              );
                            case "D":
                              return (
                                <div className="rounded-full text-[#209C05]">
                                  <Frown className="w-6 h-6 text-[#F2CE02] p-1" />
                                </div>
                              );
                            case "F":
                              return (
                                <div className="rounded-full text-[#209C05]">
                                  <Frown className="w-6 h-6 text-[#FF0A0A] p-1" />
                                </div>
                              );
                            default:
                              return "";
                          }
                        })()} */}
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <div
                      className="w-full"
                      dangerouslySetInnerHTML={{ __html: i?.name }}
                    ></div>

                    {/* 
          {i?.name} */}
                  </div>
                  {i?.answerOptions.map((x: any, index: any) => {
                    return (
                      <div
                        key={index}
                        className={`border  rounded-md  m-1  p-2 pl-3 

                        ${
                          x?.trueOrFalse
                            ? "bg-green-100 border-green-500  text-gray-800"
                            : i?.answerStatus?.skiped
                            ? "bg-yellow-100 border-yellow-500"
                            : x?.id === i?.answerStatus?.id &&
                              "bg-red-100  border-red-500  text-gray-800"
                        }

                 
                      `}
                      >
                        <div
                          className="w-full"
                          dangerouslySetInnerHTML={{ __html: x?.name }}
                        ></div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
        </div>
      </>
    )
  );
};

export default Quiz;
