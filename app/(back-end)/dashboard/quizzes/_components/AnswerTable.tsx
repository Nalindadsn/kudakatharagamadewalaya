"use client";
import { FileWarning } from "lucide-react";
import React from "react";

const AnswerTable = (props: any) => (
  <div>
    {props.answers.length > 0 ? (
      props.answers.map((answer: any) => (
        <div
          className={`border border-gray-800 rounded-full  px-5 py-2 mb-2 ${
            answer.trueOrFalse === "" ? "bg-gray-800 text-white" : ""
          }`}
          key={answer.id}
        >
          <div className="flex justify-between">
            <div className="flex w-full justify-between">
              <span> {answer.value}</span>
              <span className=""> {answer.trueOrFalse ? "DF" : ""}</span>
            </div>
            <div className="flex gap-2">
              <button className="button muted-button"></button>
              <div
                onClick={() => props.editRow(answer)}
                className="cursor-pointer text-yellow-700"
              >
                Edit
              </div>
              <button
                className="button muted-button text-red-500"
                onClick={() => props.deleteAnswer(answer.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div className="border flex items-center justify-center p-4 flex margin-auto">
        <FileWarning className="w-3 h-3" />
        <span> No Tags</span>
      </div>
    )}
  </div>
);

export default AnswerTable;
