"use client";

import { MapPin, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();

  const handleLogoClick = () => {
    router.push("/");
  };
  return (
    <header className="bg-purple-brand px-4 py-3 text-white flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-2">
        <Image
          src="/images/logo.png"
          alt="Logo"
          width={32}
          height={32}
          className="w-auto cursor-pointer"
          onClick={handleLogoClick}
        />

        <div className="flex items-center ml-4">
          <MapPin size={12} />
          <div className="flex flex-col ml-2">
            <span className="text-xs text-purple-light">entregando em</span>
            <span className="text-sm font-medium flex items-center gap-1">
              Rua Mandaguari, 198
            </span>
          </div>
        </div>
      </div>

      <User size={20} className="text-white" />
    </header>
  );
}
