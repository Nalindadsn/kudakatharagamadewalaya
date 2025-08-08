"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState, Suspense } from "react";

import { QuestionSchema } from "@/schemas";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
// import { settings } from "@/components/actions/settings";
import { create } from "../actions/createQuestion";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import EditAnswerForm from "./EditAnswerForm";
import AnswerTable from "./AnswerTable";
import { Separator } from "@/components/ui/separator";
// import { MinimalTiptapEditor } from "./components/minimal-tiptap";
import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

const Add = ({
  type,
  id,
  initialData,
  orgId,
  quizzId,
  sectionId,
  items,
  answersArrayExist,
  questionOptionId,
}: any) => {
  console.log(id, initialData);
  const [error, setError] = useState<string | undefined>();

  const [changeEditor, setChangeEditor] = useState<any | undefined>(true);

  const [success, setSuccess] = useState<string | undefined>();
  console.log(error, success);
  // const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const [createdData, setCreatedData] = useState<any | undefined>(null);

  const quSec: any = items.quizzesSection.filter(
    (i: any) => i?.id == sectionId
  );

  const defData: any = {
    name: answersArrayExist ? answersArrayExist?.name : "",
    anTime:
      typeof answersArrayExist?.anTime == "undefined"
        ? "25"
        : answersArrayExist?.anTime.toString(),
    tag: answersArrayExist ? answersArrayExist?.tag : "default",
    subTag: answersArrayExist?.subTag == null ? "" : answersArrayExist?.subTag,
  };
  const qu: any =
    createdData == null
      ? []
      : quSec[0].questions.filter((i: any) => i?.id == createdData?.id);

  const form = useForm<z.infer<typeof QuestionSchema>>({
    resolver: zodResolver(QuestionSchema),
    defaultValues: defData,
  });

  const answersData: any =
    type == "answer" ? answersArrayExist?.answerOptions : [];
  const initialFormState = { id: null, name: "", trueOrFalse: false };

  const [answers, setAnswers] = useState(answersData);
  const [editing, setEditing] = useState(false);

  const [currentAnswer, setCurrentAnswer] = useState(initialFormState);

  const addAnswer = (answer: any) => {
    answer.id = answers.length + 1;
    setAnswers([...answers, answer]);
  };

  const deleteAnswer = (id: any) => {
    setEditing(false);
    setAnswers(answers.filter((answer: any) => answer.id !== id));
  };

  const editRow = (answer: any) => {
    setEditing(true);

    setCurrentAnswer(answer);
  };

  const updateAnswer = (id: any, updatedAnswer: any) => {
    setEditing(false);
    setAnswers(
      answers.map((answer: any) => (answer.id === id ? updatedAnswer : answer))
    );
  };

  // const {  setValue } = useForm({});
  // const { register, setValue } = useForm(defData);
  // const { update } = useFieldArray({ name: 'array' });
  //       update(0, { test: '1', test1: '2' })

  const onSubmit = (values: any) => {
    startTransition(() => {
      if (answers.filter((i: any) => i?.trueOrFalse == true).length < 1) {
        toast.error("Please add correct answer");
        return;
      }
      setError("");
      setSuccess("");
      create(values, answers, orgId, quizzId, sectionId, type, questionOptionId)
        .then((data: any) => {
          // alert(JSON.stringify(data))
          if (data.error) {
            toast.error(data.error);
          }
          if (data.success) {
            // update();
            setCreatedData(data?.createdData);
            // setValue('name', '')
            type !== "answer" && setAnswers([]);
            // setAnswers([])
            toast.success(data.success);
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  return (
    <>
      {createdData == null ? (
        <>
          <Form {...form}>
            <form
              className="space-y-2 w-full"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              {/* <TextEditor/> */}
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="anTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Time</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="25"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="tag"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Question tag</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Tag name"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subTag"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel> sub tag</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Sub tag"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div
                  onClick={() =>
                    changeEditor
                      ? setChangeEditor(false)
                      : setChangeEditor(true)
                  }
                >
                  {changeEditor ? "editor" : "remove editor"}
                </div>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="sr-only">name</FormLabel>
                      <FormControl>
                        {changeEditor ? (
                          // <Input
                          //   {...field}
                          //   placeholder="Sub tag"
                          //   disabled={isPending}
                          // />
                          <Textarea
                            {...field}
                            placeholder="text"
                            disabled={isPending}
                            className="min-h-[500px]"
                          />
                        ) : (
                           <Textarea
                            {...field}
                            placeholder="text"
                            disabled={isPending}
                            className="min-h-[500px]"
                          />
                        )}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* <FormError message={error} />
            <FormSuccess message={success} /> */}
              <Separator className="mt-5" />
              <div className="flex-large mt-5">
                <AnswerTable
                  answers={answers}
                  editRow={editRow}
                  deleteAnswer={deleteAnswer}
                />
              </div>
              <Button
                disabled={isPending}
                type="submit"
                className="bg-orange-600"
              >
                {isPending && (
                  <Loader2 className="h-3 w-3 animate-spin text-white" />
                )}

                {type == "new" ? "Add new question" : "Update question"}
              </Button>
            </form>
          </Form>
        </>
      ) : (
        <div>
          <div className="mb-2">
            <div className="w-full flex justify-between items-center">
              <span className="text-gray-600">Latest added question</span>
              {/* <Button
                className="mt-5"
                onClick={() => {
                  setCreatedData(null);
                }}
              >
                Add new question
              </Button> */}
            </div>
          </div>
          {/* {JSON.stringify(createdData)}<hr/>
    {JSON.stringify(qu)} */}
          {qu[0]?.questionOptions.map((i: any) => {
            return (
              <Card key={i?.id} className="p-5 mb-2">
                {i?.name}

                {i?.answerOptions.map((x: any) => {
                  return (
                    <div
                      className={`border border-gray-800 rounded-full  px-5 py-2 mb-2 ${
                        x.trueOrFalse === true ? "bg-gray-800 text-white" : ""
                      }`}
                      key={x.id}
                    >
                      {x?.name}
                    </div>
                  );
                })}
              </Card>
            );
          })}
        </div>
      )}

      {createdData == null ? (
        <>
          <div className="flex-row">
            <div className="flex-large">
              <div>
                {/* <h2 className="text-xl font-bold mt-5">{editing ? "Edit Answer" : "Add Answer"}</h2> */}

                <Suspense fallback={"Loading... "}>
                  <EditAnswerForm
                    editing={editing}
                    setEditing={setEditing}
                    currentAnswer={currentAnswer}
                    setCurrentAnswer={setCurrentAnswer}
                    updateAnswer={updateAnswer}
                    addAnswer={addAnswer}
                    answersArray={answers}
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </>
      ) : (
        ""
      )}
      <div>
        <div></div>
      </div>
    </>
  );
};
export default Add;
