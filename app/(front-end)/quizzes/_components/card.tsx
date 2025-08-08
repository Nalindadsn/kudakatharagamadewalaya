"use client";
import Link from "next/link";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
interface IPokemon {
  data: any;
}
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  FileWarning,
  Heart,
  Languages,
  ListStart,
  Plane,
  Play,
  Send,
  Star,
} from "lucide-react";

import useFavouriteStore from "@/store/cartStore";
import { HeartFilledIcon } from "@radix-ui/react-icons";
import toast from "react-hot-toast";
export default function PokemonCard({ data }: IPokemon) {
  const addToFavourite = useFavouriteStore((state) => state.addToFavourite);

  const { items } = useFavouriteStore((state) => state);
  const maxV: any =
    items?.length > 0
      ? items?.reduce((max, curren) => (max.id > curren.id ? max : curren))
      : { id: 0 };
  return (
    <>
      <Card key={data?.id}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium"></CardTitle>
          <div className="text-right flex gap-1">
            {/* {data?.quizzesSection.length} Sections */}

            {data?.medium && (
              <>
                <br />
                <span className="flex gap-2 items-center">
                  <Languages className="h-4 w-4" /> {data?.medium} Medium
                </span>
              </>
            )}

            <Button
              onClick={() => {
                if (
                  items.filter((p: any) => p.based === data?.slug)?.length > 0
                ) {
                  toast("Already added to favourite");
                } else {
                  if (
                    window.confirm("Are you sure you wish to add favourite ?")
                  ) {
                    addToFavourite({
                      id: maxV.id + 1,
                      based: data?.slug,
                      quizzes: [],
                    });
                  }
                }
              }}
              className="h-6 p-0 px-2"
            >
              {items.filter((p: any) => p.based === data?.slug)?.length > 0 ? (
                <HeartFilledIcon className=" w-3 h-3 text-red-500 " />
              ) : (
                <Heart className=" w-3 h-3 text-red-500 " />
              )}
            </Button>
            <br />
          </div>
        </CardHeader>
        <CardContent>
          {/* <p>
            Article: {data?.atNo} | {data?.examination}
          </p> */}
          {data?.examination}
          {data?.year && <> - {data?.year}</>}

          <Link
            key={data?.id}
            href={`/quizzes/${data?.slug}`}
            className="w-full"
          >
            <h3 className="text-2xl font-bold">{data?.name}</h3>

            {/* <span className="text-xs text-gray-500">id: {data?.id}</span> */}
          </Link>

          {data?.quizzesSection.length < 1 && (
            <div className="flex justify-center items-center  text-center mt-5">
              <FileWarning /> No data
            </div>
          )}
          {data?.quizzesSection.map((x: any) => {
            return (
              <div
                key={x?.id}
                className="flex gap-2 border  mb-1 p-2 items-center"
              >
                <div className="w-full ">
                  {x?.name}
                  <p className=" text-xs text-muted-foreground">
                    {x?.questions.length} Questions
                  </p>
                </div>

                <div className="flex gap-1">
                  <Button asChild className="h-6 p-0 px-2">
                    <Link href={`/quizzes/${data?.slug}`}>
                      start
                      <Play className="w-3 h-3 ml-2" />
                    </Link>
                  </Button>
                </div>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </>
  );
}
