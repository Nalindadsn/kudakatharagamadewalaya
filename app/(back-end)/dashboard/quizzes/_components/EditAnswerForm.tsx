"use client";
import React, { useState, useEffect } from "react";

import { Button } from "@/components/ui/button";

import toast from "react-hot-toast";
import { Pen, Plus } from "lucide-react";
const EditAnswerForm = (props: any) => {
  const initialFormState = {
    id: null,
    label: "",
    value: "",
    trueOrFalse: true,
  };
  const [answer, setAnswer] = useState(
    props.editing ? props.currentAnswer : initialFormState
  );

  const handleInputChange = (event: any) => {
    // alert(JSON.stringify(event.name))
    const { name, value } = event.target;

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
  console.log(trueAnswer1);
  const trueAnswer2 = props.answersArray.filter(
    (p: any) => p?.value == answer.value
  );
  const trueAnswer3 = props.answersArray.filter(
    (p: any) => p?.value == answer.value && p?.id !== answer.id
  );

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        if (!answer.value) {
          toast.error(`Value is required.`);
          return;
        }

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
          toast.error(`Cannot be duplicate value`);
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
      }}
    >
      <div className="flex gap-2 items-center mt-3">
        <div className="w-full flex gap-1">
          {/* <input
        type="text"
        name="label"
        placeholder="Label"
        className="p-2"
        value={answer.label}
        onChange={handleInputChange}
      /> */}
          <input
            type="text"
            name="value"
            placeholder="Value"
            className="p-2"
            value={answer.value}
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
                <option value={1} className={trueAnswer.length > 0 ? "" : ""}>
                  Default
                </option>
                <option value={0}>Not Default</option>
              </select>
            ) : (
              <select
                name="trueOrFalse"
                value={answer.trueOrFalse}
                onChange={handleInputChange}
              >
                <option value={1} className={trueAnswer.length > 0 ? "" : ""}>
                  Default
                </option>

                <option value={0}>Not Default</option>
              </select>
            )
          ) : (
            <select
              name="trueOrFalse"
              value={answer.trueOrFalse}
              onChange={handleInputChange}
            >
              <option value={1} className={trueAnswer.length > 0 ? "" : ""}>
                Default
              </option>
              <option value={0}>Not Default</option>
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
