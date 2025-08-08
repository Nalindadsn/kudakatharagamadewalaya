"use client";
import React from "react";

const AnswerTable = (props: any) => (
  <div>
    {props.answers.length > 0 ? (
      props.answers.map((answer: any) => (
        <div
          className={`border border-gray-800 rounded-full  px-5 py-2 mb-2 ${
            answer.trueOrFalse === true ? "bg-gray-800 text-white" : ""
          }`}
          key={answer.id}
        >
          <div className="flex justify-between">
            <div>
              <span> {answer.name}</span>
              {/* <span>{answer.trueOrFalse}</span> */}
            </div>
            <div className="flex gap-2">
              <button className="button muted-button"></button>
              <div
                onClick={() => props.editRow(answer)}
                className="cursor-pointer"
              >
                Edit
              </div>
              <button
                className="button muted-button"
                onClick={() => props.deleteAnswer(answer.id)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ))
    ) : (
      <div>
        <span>No Answers</span>
      </div>
    )}
  </div>
);

export default AnswerTable;
