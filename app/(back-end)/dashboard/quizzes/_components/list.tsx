"use client";
import { Button } from "@/components/ui/button";

import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// import { AttachmentForm } from "../../_component/attachment-form";
import { Pencil } from "lucide-react";
// import DeleteF from "../[i_id]/_component/delete";
import Delete from "./delete";
export default async function Language({
  id,
  e_id,
  items,
}: {
  id?: any;
  e_id?: any;
  items?: any;
}) {
  // const dateOptions: Intl.DateTimeFormatOptions = {
  //   year: "numeric",
  //   month: "long",
  //   day: "numeric",
  // };

  return items && items.length > 0 ? (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            <Link href={`/dashboard/users/${id}/proficiency`}>Quizzes</Link>{" "}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div style={{ overflowX: "scroll" }} className="w-full ">
            <table className="w-full rtl:text-right">
              <thead className="text-xs text-white uppercase bg-green-600 rounded-t-lg">
                <tr>
                  <th scope="col" className="px-6 py-3 text-nowrap text-left">
                    Quizz Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left w-full">
                    Description
                  </th>

                  <th className="text-left">Action</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item: any) => {
                  return (
                    <>
                      <tr
                        key={item.id}
                        className={`${
                          e_id == item.id
                            ? "bg-yellow-200 hover:bg-yellow-200"
                            : "bg-white hover:bg-gray-50"
                        } border-green-200  border-b dark:bg-green-800 dark:border-green-700  dark:hover:bg-green-600`}
                      >
                        <th
                          scope="row"
                          className="flex items-center px-6 py-4 whitespace-nowrap "
                        >
                          <div className="ps-3 ">
                            <div className="font-normal  text-left">
                              <span className="text-xs text-gray-500">
                                {item?.id}
                              </span>
                              <br />
                              <Link
                                key={item.id}
                                href={`/dashboard`}
                                className=""
                              >
                                {item.name}
                              </Link>

                              <div className="flex">
                                <div className="h-2.5 w-2.5 rounded-full bg-green-500 me-2"></div>{" "}
                                {item.description}
                              </div>
                            </div>
                          </div>
                        </th>

                        <td className="px-6 py-4">
                          <div className="border p-2">
                            <ul className="items-center list-disc ml-5 mt-2">
                              {item?.quizzesSection.length > 0 ? (
                                ""
                              ) : (
                                <li>No any sections for this quizz</li>
                              )}

                              {item?.quizzesSection.map((i: any) => {
                                return (
                                  <li
                                    key={item?.id}
                                    className="border mb-1 py-1 px-1"
                                  >
                                    {" "}
                                    <Link
                                      href={`/dashboard/quizzes/${item?.id}?section=${i?.id}`}
                                    >
                                      {i?.name} - {i?.type}
                                    </Link>
                                  </li>
                                );
                              })}
                            </ul>
                            {/* {JSON.stringify(item)} */}
                          </div>
                        </td>

                        <td className=" ">
                          <div className="flex">
                            <Button size="sm" className="mr-2" asChild>
                              <Link href={`/dashboard`}>
                                <Pencil className="w-3 h-3 -mt-1 mr-1" /> EDIT
                              </Link>
                            </Button>

                            <Delete todo={item.id} u_id={id} />
                          </div>
                        </td>
                      </tr>
                    </>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </>
  ) : null;
}
