"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";

import { QuizCreateSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
// import { settings } from "@/components/actions/settings";
import { create } from "../actions/create";

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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Loader2, Plus } from "lucide-react";
const Add = (id?: any, initialData?: any) => {
  console.log(initialData);

  // const { update } = useSession();
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof QuizCreateSchema>>({
    resolver: zodResolver(QuizCreateSchema),
    defaultValues: {
      name: id ? id.initialData?.name : undefined,
      description: id ? id.initialData?.description : undefined,
      country: "GLOBAL",
      examination: id ? id.initialData?.examination : undefined,
      grade: id ? id.initialData?.grade : undefined,
      year: id ? id.initialData?.year : undefined,
      medium: id ? id.initialData?.medium : undefined,
      slug: id ? id.initialData?.slug : undefined,
      section: id ? id.initialData?.section : undefined,
      type: id ? id.initialData?.type : undefined,
      category: id ? id.initialData?.category : undefined,
      keywords: id ? id.initialData?.keywords : undefined,
      status: id ? id.initialData?.status : undefined,
    },
  });

  // alert(JSON.stringify(id))

  const [open, setOpen] = useState(false);
  const onSubmit = (values: z.infer<typeof QuizCreateSchema>) => {
    startTransition(() => {
      // setError("");
      // setSuccess("");
      create(values, id)
        .then((data: any) => {
          if (data.error) {
            toast.error(data.error);
          }
          if (data.success) {
            //   update();

            toast.success(data.success);
            setOpen(false);
          }
        })
        .catch(() => toast.error("Something went wrong!"));
    });
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="text-white hover:text-white bg-[#050708] hover:bg-[#050708]/90   font-medium rounded-lg text-sm px-3 py-2 text-center inline-flex items-center dark:focus:ring-[#050708]/50 dark:hover:bg-[#050708]/30 me-2 mb-2"
          >
            <Plus className="w-4 h-4" /> Create
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full overflow-scroll h-[90vh] bg-white">
          <DialogHeader>
            <DialogTitle>Create Quiz</DialogTitle>
            <DialogDescription>
              {/* Make Pin to This profile here. Click save when youre done. */}
              {/* <div className=" p-1 bg-gray-800 text-white">Name: {data?.name}<br/>Nic: {data?.nic}<br/>Email: {data?.email}</div>  */}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form className="space-y-2" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Quizz Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder=" Name"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Tell us a little bit about quizz"
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

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder=" country"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="examination"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Examination</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder=" examination"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="grade"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Grade</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder=" grade"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="year"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Year</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder=" year"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="medium"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>medium</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder=" medium"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Slug</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder=" slug"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="section"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Section</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder=" section"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>type</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder=" type"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder=" category"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="subCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sub Category</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder=" subCategory"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="keywords"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Keywords</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder=" keywords"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="status"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Status</FormLabel>
                      <FormControl>
                        <select {...field} value={field.value}>
                          <option value="PENDING">PENDING</option>
                          <option value="PUBLISHED">PUBLISHED</option>
                        </select>
                        {/* <Input
                          {...field}
                          placeholder=" status"
                          disabled={isPending}
                        /> */}
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                  Quiz Create
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  );
};
export default Add;
