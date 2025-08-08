// import { Product } from "@/quizzIds/quizzIds";
import { redirect } from "next/navigation";
import toast from "react-hot-toast";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface FavouriteItem {
  id: number;
  based: string;
  quizzes: any;
}

interface FavouriteSate {
  items: FavouriteItem[];
  addToFavourite: (product: any) => void;
  removeFromFavourite: (id: number) => void;
  updateQuizzFavourite: (quizzId: any, id: number) => void;
}

const useFavouriteStore = create<FavouriteSate>()(
  persist(
    (set, get) => ({
      items: [],
      addToFavourite: (product) => {
        // const existingProduct = get().items.find(
        //   (item) => item.id === product.id
        // );
        set({
          items: [
            ...get().items,
            {
              id: product.based,
              based: product.based,
              quizzes: product.quizzes,
            },
          ],
        });

        toast.success(" Added successfully");
        redirect("/favourite");
      },
      removeFromFavourite: (id) => {
        set({
          items: get().items.filter((item) => item.id !== id),
        });
        toast.error("Item removed");
      },
      updateQuizzFavourite: (newArray, id) => {
        const item = get().items.find((item) => item.id === id);
        if (!item) {
          return;
        }

        item.quizzes = newArray;
        set({
          items: [...get().items],
        });
      },
    }),
    {
      name: "cart-storage",
    }
  )
);

export default useFavouriteStore;
