"use client";
import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";

import toast from "react-hot-toast";
import { Pen, Plus } from "lucide-react";
import Editor from "react-simple-wysiwyg";
const EditAnswerForm = (props: any) => {
  const [html, setHtml] = useState("");
  console.log(html);
  // function onChange(e: any) {
  //   setHtml(e.target.value);
  // }
  const initialFormState = { id: null, name: "", trueOrFalse: false };
  const [answer, setAnswer] = useState(
    props.editing ? props.currentAnswer : initialFormState
  );

  const handleInputChange = (event: any) => {
    // alert(JSON.stringify(event.name))
    const { name, value } = event.target;

    setHtml(event.target.value);

    setAnswer({ ...answer, [name]: value });
    console.log(answer);
  };

  useEffect(() => {
    setAnswer(props.currentAnswer);
  }, [props]);

  const resetAddAnswer = () => {
    props.setEditing(false);
    setAnswer(initialFormState);
    props.setCurrentAnswer(initialFormState);
  };

  const trueAnswer = props.answersArray.filter(
    (p: any) => p?.trueOrFalse == true
  );
  const trueAnswer1 = trueAnswer.filter((p: any) => p?.id == answer.id);
  const trueAnswer2 = props.answersArray.filter(
    (p: any) => p?.name == answer.name
  );
  const trueAnswer3 = props.answersArray.filter(
    (p: any) => p?.name == answer.name && p?.id !== answer.id
  );

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!answer.name) return;

        // if(trueAnswer2.length==1 && trueAnswer2[0].id==answer.id ){

        // }else{
        //   toast.error(`Answer in another`);
        //   return;
        // }
        // if(props.editing && trueAnswer3.length>0 ){
        //   toast.error(`Cannot be duplicate answers`);
        //   return;
        // }

        if (
          (!props.editing && trueAnswer2.length > 0) ||
          (props.editing && trueAnswer3.length > 0)
        ) {
          toast.error(`Cannot be duplicate answers`);
        } else {
          if (
            trueAnswer.length > 0 &&
            answer.trueOrFalse == true &&
            trueAnswer1.length < 1
          ) {
            // alert(`already added, Please remove true answer`)
            toast.error(`already added, Please remove true answer`);
          } else {
            if (answer.trueOrFalse == "0" || answer.trueOrFalse == false) {
              answer.trueOrFalse = false;
            }
            if (answer.trueOrFalse == "1" || answer.trueOrFalse == true) {
              answer.trueOrFalse = true;
            }
            props.editing
              ? props.updateAnswer(answer.id, answer)
              : props.addAnswer(answer);
            resetAddAnswer();
          }
        }
      }}
    >
      <div className="flex gap-2 items-center mt-3">
        <div className="w-full">
          {/* <input
            type="text"
            placeholder="Add an answer"
            className="p-2"
            value={answer.name}
            onChange={handleInputChange}
          /> */}
          <Editor
            name="name"
            value={answer.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          {props.editing ? (
            answer?.trueOrFalse == true ? (
              <select
                name="trueOrFalse"
                value={answer.trueOrFalse}
                onChange={handleInputChange}
              >
                <option
                  value={1}
                  className={trueAnswer.length > 0 ? "text-red-500 " : ""}
                >
                  True
                </option>
                <option value={0}>False</option>
              </select>
            ) : (
              <select
                name="trueOrFalse"
                value={answer.trueOrFalse}
                onChange={handleInputChange}
              >
                <option value={0}>False</option>
                <option
                  value={1}
                  className={trueAnswer.length > 0 ? "text-red-500 " : ""}
                >
                  True
                </option>
              </select>
            )
          ) : (
            <select
              name="trueOrFalse"
              value={answer.trueOrFalse}
              onChange={handleInputChange}
            >
              <option value={0}>False</option>
              <option
                value={1}
                className={trueAnswer.length > 0 ? "text-red-500 " : ""}
              >
                True
              </option>
            </select>
          )}
        </div>

        <div className="flex gap-2 ">
          <Button>
            {props.editing ? (
              <Pen className="w-4 h-4" />
            ) : (
              <Plus className="w-4 h-4" />
            )}
          </Button>
          {props.editing && (
            <Button
              onClick={resetAddAnswer}
              variant="destructive"
              className="button muted-button"
            >
              X
            </Button>
          )}
        </div>
      </div>
    </form>
  );
};

export default EditAnswerForm;
