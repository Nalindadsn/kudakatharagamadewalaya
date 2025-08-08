"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState, Suspense } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QuizzesSectionSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
// import { settings } from "@/components/actions/settings";
import { updateSection } from "../actions/updateSection";

import {
  Form,
  FormField,
  FormControl,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";

import toast from "react-hot-toast";
import { Textarea } from "@/components/ui/textarea";
import { Option } from "@/components/ui/multiple-selector";
import EditAnswerForm from "./EditAnswerForm";
import AnswerTable from "./AnswerTable";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Edit, Loader2 } from "lucide-react";

const EditSection = ({ obj, data }: any) => {
  const [open, setOpen] = useState(false);

  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof QuizzesSectionSchema>>({
    resolver: zodResolver(QuizzesSectionSchema),
    defaultValues: {
      name: data.name,
      type: data.type,
      description: data.description,
    },
  });

  // alert(JSON.stringify(id))

  // const allTags: any = []
  // const it = items.quizzesSection.filter((x: any) => x?.id == params?.sectionId)
  // it[0]?.questions.map((x: any) => x.questionOptions.filter((y: any) => allTags.indexOf(y?.tag) === -1 && allTags.push(y?.tag)));

  // let tagsAll:any = []
  // allTags.map((x:any)=>tagsAll.push({label:x,value:x}))

  const tagsAll: any = [];
  const OPTIONS: Option[] = tagsAll;
  console.log(OPTIONS);

  // const todoAdd = () => {
  //   tagsAll.push({ label: "tag4", value: "tag4" });
  // };

  const tagAll: any = [];
  data?.allTags.map((x: any, index: number) =>
    tagAll.push({
      id: index,
      label: x,
      value: x,
      trueOrFalse: data?.defaultsTags.includes(x),
    })
  );

  const answersData: any = tagAll;

  const initialFormState = {
    id: null,
    label: "",
    value: "",
    trueOrFalse: true,
  };
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

  const onSubmit = (values: z.infer<typeof QuizzesSectionSchema>) => {
    startTransition(() => {
      setError("");
      setSuccess("");

      const defaultTags = answers
        .filter((x: any) => x?.trueOrFalse == true)
        .map((item: any) => item.value);
      const allTags = answers.map((item: any) => item.value);

      updateSection(values, data?.id, allTags, defaultTags)
        .then((data: any) => {
          if (data.error) {
            toast.error(data.error);
          }
          if (data.success) {
            toast.success(data.success);
            // setAnswers(initialFormState);
            // setAnswers(answersData)
            setOpen(false);
            // form.reset()
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="h-6 p-0 px-2">
            <Edit className="w-3 h-3" />
          </Button>
        </DialogTrigger>
        <DialogContent className="bg-white">
          <DialogHeader>
            <DialogTitle>Create Section</DialogTitle>
            <DialogDescription>
              <h3 className="text-gray-800 ">
                <span className="font-bold">Quiz: </span>
                {obj?.obj?.name}
              </h3>
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
                <div className="flex-large mt-2">
                  <AnswerTable
                    answers={answers}
                    editRow={editRow}
                    deleteAnswer={deleteAnswer}
                  />
                </div>
              </Suspense>
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
              <div className=" w-full mt-1">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      {/* <FormLabel>Quizz Name</FormLabel> */}
                      <FormControl>
                        <Input
                          {...field}
                          placeholder=" Section"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className=" w-full mt-1">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a little bit about description"
                          className="resize-none"
                          {...field}
                          disabled={isPending}
                        />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="w-full">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="MCQ">
                            Multiple-Choice Questions {`(MCQs)`}
                          </SelectItem>
                          <SelectItem value="TRUEFALSE">
                            True{`/`}False Questions
                          </SelectItem>
                          <SelectItem value="FILLINTHEBLANK">
                            Fill-in-the-Blank
                          </SelectItem>

                          <SelectItem value="SHORTANSWER">
                            Short Answer Questions
                          </SelectItem>
                          <SelectItem value="ESSAY">Essay Questions</SelectItem>
                        </SelectContent>
                      </Select>

                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormError message={error} />
              <FormSuccess message={success} />
              {/* <Button
            disabled={isPending}
            type="submit"
          >
            Save
          </Button> */}
              <DialogFooter>
                <Button
                  disabled={isPending}
                  className="flex items-center"
                  type="submit"
                >
                  {isPending && (
                    <Loader2 className="mr-2 h-3 w-3 animate-spin text-white" />
                  )}{" "}
                  Create Section
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default EditSection;
