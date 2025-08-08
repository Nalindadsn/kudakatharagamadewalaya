import { siteConfig } from "@/constants/site";
import Image from "next/image";
import React from "react";
const loaderProp = ({ src }: any) => {
  return src;
};
export default function ImageColumn({
  row,
  accessorKey,
}: {
  row: any;
  accessorKey: any;
}) {
  const imageUrl = row.getValue(`${accessorKey}`);

  // const thum = row.getValue(`${accessorKey}`);
  // console.log(imageUrl);
  return (
    <div className="shrink-0">
      <Image
        alt={`${accessorKey}` || siteConfig.name}
        className="aspect-square w-8 h-8 rounded-md object-cover"
        height={200}
        src={imageUrl ?? ""}
        width={200}
        loader={loaderProp}
      />
    </div>
  );
}
