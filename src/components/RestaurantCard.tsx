"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Restaurant } from "@/types/restaurant"
import { formatCurrency } from "@/lib/utils"

export function RestaurantCard(props: Restaurant) {
  const router = useRouter()

  return (
    <Card
      onClick={() => router.push(`/${props.id}`)}
      className="flex items-center gap-4 px-4 py-2 shadow-sm hover:bg-muted/50 transition cursor-pointer"
    >
      <Image
        src={props.logo}
        alt={props.name}
        width={50}
        height={50}
        className="rounded-md"
      />
      <CardContent className="p-0 flex flex-col">
        <span className="font-medium">{props.name}</span>
        <div className="text-sm text-muted-foreground flex gap-2">
          <span>{formatCurrency(props.deliveryFee)}</span>
          <span>⭐ {props.rating}</span>
        </div>
      </CardContent>
    </Card>
  )
}
