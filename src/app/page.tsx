// app/page.tsx
import { Footer } from "@/components/Footer";
import { SearchInput } from "@/components/SearchInput";
import Image from "next/image";
import { Suspense } from "react";
import RestaurantList from "@/components/restaurant/RestaurantList";
import { RestaurantListSkeleton } from "@/components/restaurant/RestaurantListSkeleton";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="bg-white shadow-sm">
        <SearchInput />
      </div>
      <div className="container mx-auto sm:mt-2 mt-0 sm:px-4 px-0 max-w-[1000px]">
        <Image
          src="/images/banner.png"
          alt="Banner"
          width={1600}
          height={600}
          className="w-full h-auto sm:rounded-lg rounded-none"
        />
      </div>

      <Suspense fallback={<RestaurantListSkeleton />}>
        <RestaurantList />
      </Suspense>

      <Footer />
    </div>
  );
}
