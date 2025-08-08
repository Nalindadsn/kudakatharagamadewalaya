"use client"
import React, { useState } from "react";
import AnswerTable from "./AnswerTable";
import EditAnswerForm from "./EditAnswerForm";

const CreateQuestion = () => {
  const answersData:any = [];
  const initialFormState = { id: null, name: "", trueOrFalse: false };

  const [answers, setAnswers] = useState(answersData);
  const [editing, setEditing] = useState(false);
  const [currentAnswer, setCurrentAnswer] = useState(initialFormState);

  const addAnswer = (answer:any) => {
    answer.id = answers.length + 1;
    setAnswers([...answers, answer]);
    alert("oop")
  };

  const deleteAnswer = (id:any) => {
    setEditing(false);
    setAnswers(answers.filter((answer:any) => answer.id !== id));
  };

  const editRow = (answer:any) => {
    setEditing(true);

    setCurrentAnswer(answer);
  };

  const updateAnswer = (id:any, updatedAnswer:any) => {
    setEditing(false);
    setAnswers(answers.map((answer:any) => (answer.id === id ? updatedAnswer : answer)));
  };

  return (
    <div className="container">
      <div className="flex-row">
        <div className="flex-large">
          <div>
            <h2>{editing ? "Edit answer" : "Add answer"}</h2>
            <EditAnswerForm
              editing={editing}
              setEditing={setEditing}
              currentAnswer={currentAnswer}
              setCurrentAnswer={setCurrentAnswer}
              updateAnswer={updateAnswer}
              addAnswer={addAnswer}
            />
          </div>
        </div>
        <div className="flex-large">
          <h2>View answers</h2>
          <AnswerTable answers={answers} editRow={editRow} deleteAnswer={deleteAnswer} />
        </div>
      </div>
    </div>
  );
};

export default CreateQuestion;
