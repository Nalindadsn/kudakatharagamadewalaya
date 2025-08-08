"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { TodosDelSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
// import { settings } from "@/components/actions/settings";
import { del } from "../actions/delete";

import { Form } from "@/components/ui/form";

import toast from "react-hot-toast";
import { Loader2, Trash2 } from "lucide-react";
const Delete = ({
  todo,
  u_id,
  varient,
}: {
  todo: any;
  u_id?: any;
  varient?: any;
}) => {
  const [error, setError] = useState<string | undefined>();
  console.log(error, u_id);
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof TodosDelSchema>>({
    resolver: zodResolver(TodosDelSchema),
    defaultValues: {
      inputId: todo ? todo : undefined,
    },
  });
  // alert(JSON.stringify(id))

  const onSubmit = (values: z.infer<typeof TodosDelSchema>) => {
    console.log(values);
    startTransition(() => {
      setError("");
      // setSuccess("");
      del(todo)
        .then((data: any) => {
          if (data.error) {
            toast.error(data.error);
          }

          if (data.success) {
            toast.error("Quiz section deleted");
          }
        })
        .catch(() => setError("Something went wrong!"));
    });
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        {varient === "small" ? (
          <Button variant="outline" className="h-6 p-0 px-2">
            {isPending ? (
              <Loader2 className="h-3 w-3 animate-spin text-gray-900" />
            ) : (
              <Trash2 className="w-3 h-3 " />
            )}
          </Button>
        ) : (
          <Button variant="outline" className="h-6 p-0 px-2">
            {" "}
            <Trash2 className="w-3 h-3 mr-1" />
            {isPending ? "DELETING..." : "DELETE"}{" "}
          </Button>
        )}
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your quiz
            and remove your data from our servers.
            {/* <FormError message={error} />
            <FormSuccess message={success} /> */}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <input type="hidden" name="inputId" value={todo} />
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction disabled={isPending} type="submit">
                Continue
              </AlertDialogAction>
            </form>
          </Form>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Delete;
