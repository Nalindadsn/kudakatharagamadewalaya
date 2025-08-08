"use server";

import { db } from "@/lib/db";

export async function getCategories() {
  const category = await db.category.findMany({});

  return category;
}

export async function getCategoryById(id: string) {
  const category = await db.category.findUnique({
    where: {
      id: id,
    },
  });

  return category;
}
