import Image from "next/image";
import { Share2, Heart, ChevronRight } from "lucide-react";

export function RestaurantHeader({
  name,
  logo,
}: {
  name: string;
  logo: string;
}) {
  return (
    <div className="flex flex-col  justify-between gap-3">
      <div className="flex items-center gap-3">
        <Image
          src={logo}
          alt={name}
          width={36}
          height={36}
          className="rounded"
        />
        <h1 className="font-extrabold text-dark-text text-[1.25rem]">{name}</h1>
      </div>
      <div className="text-purple-brand flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Share2 size={24} className="cursor-pointer" />
          <Heart size={24} className="cursor-pointer" />
        </div>
        <a
          href="#"
          className="text-teal-brand font-bold flex items-center gap-1"
        >
          <span>mais infos</span>
          <ChevronRight size={14} />
        </a>
      </div>
    </div>
  );
}
