import { Button } from "@/components/ui/button";
import React from "react";

function View({ data, sectionId }: any) {
  console.log(sectionId);
  // const x=0
  return (
    <div>
      {data.map((i: any) => {
        // x++
        return (
          <div key={i?.id}>
            {/* {i?.id}-{sectionId} */}
            <div className=" mb-1">
              {/* <h3 className='bg-red-600 text-white p-2 flex justify-between w-full'><span>{i?.name}</span><div><span>{i?.type}</span>|</div></h3> */}
              {/* {searchParams?.view=="1"?"yes":"no"} */}

              {/* {JSON.stringify(i)} */}

              {i?.questions.map((x: any) => {
                return (
                  <div className="border mb-1 p-3" key={x.id}>
                    -{x.id}-<Button>Add more options</Button>
                    <hr />
                    {x.questionOptions.map((y: any) => {
                      return (
                        <div className="ml-5 mt-1" key={y.id}>
                          {y?.name}
                          {y?.answerOptions.map((z: any) => {
                            return (
                              <div
                                className={`border border-gray-800 rounded-full  px-5 py-2 mb-2 ${
                                  z.trueOrFalse === true
                                    ? "bg-gray-800 text-white"
                                    : ""
                                }`}
                                key={z.id}
                              >
                                {z?.name}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default View;
