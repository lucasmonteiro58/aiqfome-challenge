import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export function SearchInput() {
  return (
    <div className="bg-purple-brand px-4 pb-4 pt-2">
      <div className="container mx-auto">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-icons"
          />
          <Input
            type="text"
            placeholder="busque pela loja ou culinária"
            className="pl-10 py-2 rounded-md bg-white text-sm text-text-light placeholder:text-gray-icons shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}
