"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export default function SearchPokemon() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [practices, setPractices] = useState("name");

  const handleStringToInt = (value: string) => {
    setPractices(value);
    replace(`${pathname}`);
  };
  const handleSearch = useDebouncedCallback((query: string) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set("query", query);
      params.set("page", "1");
      params.set("type", practices);
    } else {
      params.delete("query");
      params.delete("type");
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);
  return (
    <div className="flex w-full ">
      <div className="w-full ">
        <Input
          placeholder="Search"
          onChange={(e) => {
            handleSearch(e.target.value);
          }}
          defaultValue={searchParams.get("query")?.toString()}
        />
      </div>
      <Select onValueChange={handleStringToInt}>
        <SelectTrigger className="w-[100px] mr-2">
          <SelectValue placeholder="name" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="description">description</SelectItem>
          <SelectItem value="name">name</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}
