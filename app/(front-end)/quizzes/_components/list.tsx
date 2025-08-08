"use client"
import { Button } from "@/components/ui/button";
import { list } from "../actions/list";
import Link from "next/link";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
// import { AttachmentForm } from "../../_component/attachment-form";
import { File, Pencil, Plus, ShieldCheck, Verified } from "lucide-react";
// import DeleteF from "../[i_id]/_component/delete";
import { useState } from "react";
export default async function Language({ id, e_id,items }: { id?: any, e_id?: any ,items?:any}) {
  
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  
  const [open, setOpen] = useState(false);
  return (
    items && items.length > 0 ? (<>



    <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-2 ">
{items.map((item:any) => {
  return <Card  key={item.id}>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
    <CardTitle className="text-sm font-medium">
        
      </CardTitle>
      <div className='text-right'>

      <span className="text-xs text-gray-500">{item?.id}</span><br/>
      {item?.quizzesSection.length} Parts

      </div>
    </CardHeader>
    <CardContent>
      <Link
                          key={item.id}
                          href={`/quizzes/${item.id}`}
                          className="text-2xl font-bold"
                        >{item.name}</Link>
      <p className="text-xs text-muted-foreground">
       12 times attempt
      </p>
    </CardContent>
  </Card>
  
  
})}

  </div>



    </>) : null




  );
}
