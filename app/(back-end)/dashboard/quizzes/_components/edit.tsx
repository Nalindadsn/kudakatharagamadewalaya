"use client";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useState } from "react";

import { QuizCreateSchema } from "@/schemas";
import { Button } from "@/components/ui/button";
// import { settings } from "@/components/actions/settings";
import { update } from "../actions/update";

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
import { Edit, Loader2 } from "lucide-react";
const EditQuiz = ({ id, data, categories }: any) => {
  console.log(id);

  // const { update } = useSession();
  const [isPending, startTransition] = useTransition();
  const [selectedCategory, setSelectedCategory] = useState("");
  const form = useForm<z.infer<typeof QuizCreateSchema>>({
    resolver: zodResolver(QuizCreateSchema),
    defaultValues: {
      atNo: data?.atNo == null || "" ? "" : data?.atNo,
      name: data?.name == null || "" ? "" : data?.name,
      description: data?.description == null || "" ? "" : data?.description,
      country: data?.country == null || "" ? "" : data?.country,
      examination: data?.examination == null || "" ? "" : data?.examination,
      grade: data?.grade == null || "" ? "" : data?.grade,
      year: data?.year == null || "" ? "" : data?.year,
      medium: data?.medium == null || "" ? "" : data?.medium,
      slug: data?.slug == null || "" ? "" : data?.slug,
      section: data?.section == null || "" ? "" : data?.section,
      type: data?.type == null || "" ? "" : data?.type,
      category: data?.category == null || "" ? "" : data?.category,
      keywords: data?.keywords == null || "" ? "" : data?.keywords,
    },
  });

  // alert(JSON.stringify(id))

  const [open, setOpen] = useState(false);
  const onSubmit = (values: z.infer<typeof QuizCreateSchema>) => {
    startTransition(() => {
      // setError("");
      // setSuccess("");
      update(values, data?.id)
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
          <Button variant="outline" className="h-6 p-0 px-2">
            <Edit className="w-3 h-3" />{" "}
          </Button>
        </DialogTrigger>
        <DialogContent className="w-full overflow-scroll h-[90vh] bg-white">
          <DialogHeader>
            <DialogTitle>Update Quiz</DialogTitle>
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
                  name="atNo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Article No</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder=" Article No"
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
                          placeholder="country"
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
                        <select
                          {...field}
                          disabled={isPending}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                          onChange={(e) => {
                            setSelectedCategory(e.target.value);
                          }}
                        >
                          {selectedCategory === "" && (
                            <option value="">Select Category</option>
                          )}
                          {categories.map((category: any) => (
                            <option key={category.id} value={category.name}>
                              {category.name}
                            </option>
                          ))}
                        </select>
                        {/* <Input
                          {...field}
                          placeholder=" category"
                          disabled={isPending}
                        /> */}
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
                        <select
                          {...field}
                          disabled={isPending}
                          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        >
                          {selectedCategory &&
                            categories
                              .find(
                                (category: any) =>
                                  category.name === selectedCategory
                              )
                              ?.subCategories?.map((subCategory: any) => {
                                return (
                                  <option key={subCategory} value={subCategory}>
                                    {subCategory}
                                  </option>
                                ); // return
                              })}
                        </select>
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
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              {/* 
              <FormError message={error} />
              <FormSuccess message={success} /> */}
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
export default EditQuiz;
