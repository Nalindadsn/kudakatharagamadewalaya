"use client";
import * as React from "react";

import { Button } from "@/components/ui/button";

import Add from "./add";
import {
  ArrowRight,
  CircleCheck,
  Edit,
  Minus,
  Pencil,
  Plus,
  Square,
  ViewIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function DrawerSec({
  id,
  sectionParamsId,
  initialData,
  orgId,
  quizzId,
  items,
  data,
}: any) {
  console.log(id, initialData, data);
  const [sectionId, setSectionId] = React.useState(
    sectionParamsId ? sectionParamsId : null
  );
  const filterById = items.quizzesSection.filter(
    (i: any) => i?.id == (sectionId !== null ? sectionId : sectionParamsId)
  );

  const [open, setOpen] = React.useState(false);
  const isBrowser = () => typeof window !== "undefined"; //The approach recommended by Next.js

  function scrollToTop(id: string) {
    setSectionId(id);
    if (!isBrowser()) return;
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const [drawerType, setDrawerType] = React.useState<any | undefined>(null);
  const [drawerSection, setDrawerSection] = React.useState<any | undefined>(
    null
  );
  const [drawerQuestion, setDrawerQuestion] = React.useState<any | undefined>(
    null
  );
  const setDrawerValues: any = (
    type = null,
    section: any = {},
    question = null
  ) => {
    setDrawerType(type);
    setDrawerSection(section);
    setSectionId(section?.id);
    setDrawerQuestion(question);
    setOpen(true);
  };

  // const funReplace = (text: any, type: any) => {
  //   var original = text;

  //   var stringToFind = `—Sigma(1,2)—`;
  //   var indexOf = original.indexOf(stringToFind);
  //   original = original.replace(
  //     original.substring(indexOf, indexOf + stringToFind.length)
  //   );
  //   // console.log(e)
  //   // switch (type) {
  //   //   case "SIGMA":
  //   //     return original

  //   //   break;

  //   //   default:
  //   return original;
  //   // break;
  //   // }
  // };
  return (
    <div>
      <div className="flex w-full justify-between mb-3">
        <span className="font-bold text-3xl">{items?.name}</span>
        {/* <Button onClick={()=>setDrawerValues(null,{id:sectionId!==null?sectionId:sectionParamsId},null)}>Create new</Button> */}
        {open && (
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="h-6 p-0 px-2">
                <Edit className="w-3 h-3" />
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white max-h-screen overflow-y-scroll max-w-[800px] ">
              <DialogHeader>
                <DialogTitle>{items?.name}</DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <div>
                <div className=" w-full ">
                  <div className="mx-auto">
                    <div>
                      <h3 className="font-bold ">
                        Section :{drawerSection?.name}
                      </h3>
                      {drawerQuestion?.id && (
                        <h4 className="font-bold ">
                          Section id:{drawerSection?.id}
                        </h4>
                      )}
                      {drawerQuestion?.id && (
                        <h4 className="font-bold ">
                          Question id:{drawerQuestion?.id}
                        </h4>
                      )}

                      <Add
                        type={drawerType}
                        answersArrayExist={drawerQuestion}
                        setDrawerValues={setDrawerValues}
                        orgId={orgId}
                        quizzId={quizzId}
                        sectionId={
                          sectionId !== null ? sectionId : sectionParamsId
                        }
                        items={items}
                        questionOptionId={drawerQuestion?.id}
                      />
                    </div>
                  </div>
                  {/* <DrawerFooter>
<Button>Submit</Button>
<DrawerClose asChild>
<Button variant="outline">Cancel</Button>
</DrawerClose>
</DrawerFooter> */}
                </div>
              </div>
            </DialogContent>
          </Dialog>
        )}
      </div>

      {items?.quizzesSection.map((i: any) => {
        return (
          <div key={i?.id} className="border border-gray-800 mb-1">
            <h3 className="bg-gray-800 text-white p-2 flex justify-between w-full">
              <span className="font-bold">
                {i?.name} {i?.id == sectionId ? <Badge>SELECTED</Badge> : ""}
              </span>
              <div>
                <div className="flex gap-2 items-center">
                  <span>{i?.type}</span>
                  {i?.id == sectionId ? (
                    <Minus
                      className="cursor-pointer"
                      onClick={() => setSectionId(null)}
                    />
                  ) : (
                    <button
                      className={` rounded-s-full  items-center text-xs flex gap-2`}
                      onClick={() => scrollToTop(i?.id)}
                    >
                      <ViewIcon className="cursor-pointer" />
                    </button>
                  )}
                  <Square />
                  <Button
                    className="h-10 fixed bottom-2 right-2"
                    onClick={() => setDrawerValues("new", i, null)}
                  >
                    Create New
                  </Button>
                </div>

                {/* {searchParams?.view=="1"?<Link href={`/org/${params?.id}/quizzes/${params?.quizzId}?section=${i?.id}&view=0`}>Create</Link>:<Link href={`/org/${params?.id}/quizzes/${params?.quizzId}?section=${i?.id}&view=1`}>View</Link>} */}
              </div>
            </h3>

            {/* {searchParams?.view=="1"?"yes":"no"} */}
            {i?.id == sectionId ? (
              <div className="p-2">
                <div>
                  {filterById.map((i: any) => {
                    // x++
                    return (
                      <div key={i?.id}>
                        {/* {i?.id}-{sectionId} */}
                        <div className=" mb-1">
                          {/* <h3 className='bg-red-600 text-white p-2 flex justify-between w-full'><span>{i?.name}</span><div><span>{i?.type}</span>|</div></h3> */}
                          {/* {searchParams?.view=="1"?"yes":"no"} */}
                          {/* {JSON.stringify(i)} */}
                          <div className="p-3">
                            {i?.questions.map((x: any, index: number) => {
                              return (
                                <div
                                  key={x.id}
                                  className="border-t  mb-1 p-3 bg-green-500 border-gray-800"
                                >
                                  <div className="flex w-full justify-between">
                                    <div className="flex items-center gap-2  text-white">
                                      <Badge>{index + 1}</Badge> Question |{" "}
                                      {x?.id}{" "}
                                    </div>
                                    {/* <Button
                                      variant="link"
                                      className="underline text-white"
                                      onClick={() =>
                                        setDrawerValues("option", i, x)
                                      }
                                    >
                                      <Plus className="w-3 h-3" />
                                      More Options
                                    </Button> */}
                                  </div>

                                  {x.questionOptions.map(
                                    (y: any, ind: number) => {
                                      return (
                                        <Card
                                          key={y.id}
                                          className="ml-5 p-5 mb-3"
                                        >
                                          <div className="flex w-full items-center gap-1 justify-end">
                                            <div className="border flex items-center gap-1 px-2">
                                              {y?.tag}
                                              {y?.subTag ? (
                                                <>
                                                  <ArrowRight className="w-3 h-3" />
                                                  {y?.subTag}
                                                </>
                                              ) : (
                                                ""
                                              )}
                                            </div>
                                            <Button
                                              variant="outline"
                                              className=""
                                              onClick={() =>
                                                setDrawerValues("answer", i, y)
                                              }
                                            >
                                              <Pencil className="w-3 h-3 mr-2" />{" "}
                                              Update
                                            </Button>
                                            {/* <Button
                                              variant="outline"
                                              className=""
                                              onClick={() =>
                                                setDrawerValues(null, i, x)
                                              }
                                            >
                                              <Trash className="w-3 h-3 mr-2" />{" "}
                                              Delete
                                            </Button> */}
                                          </div>
                                          <div className="flex items-center gap-2 mb-3">
                                            <Badge>{ind + 1} Option </Badge> for
                                            question number {index + 1}
                                          </div>
                                          <React.Suspense
                                            fallback={<div>Loading...</div>}
                                          ></React.Suspense>
                                          <div className="mb-2 flex gap-2">
                                            <CircleCheck />
                                            {/* -----|{res}|-
{funReplace(y?.name, "SIGMA")} */}
                                            <div
                                              dangerouslySetInnerHTML={{
                                                __html: y?.name,
                                              }}
                                            ></div>

                                            {/* <hr/>
                              <div dangerouslySetInnerHTML={{ __html: y?.name }}></div> */}
                                          </div>
                                          {y?.answerOptions.map((z: any) => {
                                            return (
                                              <div
                                                className={`border text-gray-600 border-gray-400 rounded-full  px-5 py-2 mb-2 ${
                                                  z.trueOrFalse === true
                                                    ? "bg-gray-800 text-white"
                                                    : ""
                                                }`}
                                                key={z.id}
                                              >
                                                <div
                                                  dangerouslySetInnerHTML={{
                                                    __html: z?.name,
                                                  }}
                                                ></div>
                                              </div>
                                            );
                                          })}
                                        </Card>
                                      );
                                    }
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* 
                    {searchParams?.view=="1"?<View data={filterById} sectionId={searchParams?.section}/>:<Add orgId={params?.id} quizzId={params?.quizzId} sectionId={searchParams?.section} items={items} />}          */}

                {/* <CreateQuestion /> */}
              </div>
            ) : (
              ""
            )}
          </div>
        );
      })}
    </div>
  );
}

// export default Drawer
