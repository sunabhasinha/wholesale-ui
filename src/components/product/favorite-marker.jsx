"use client"

import { useEffect, useState, useTransition } from "react"

import { getParsedFavoritesHandles, toggleFavoriteProduct } from "@/lib/favorite"

import { Spinner } from "@/components/ui/spinner"
import { HeartIcon } from "@/components/icons/heart-icon"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function FavoriteMarker({ handle }) {
  const [isActive, setIsActive] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    const checkIsFavorite = () => {
      startTransition(async () => {
        const favorites = await getParsedFavoritesHandles()

        setIsActive(favorites.includes(handle))
      })
    }

    checkIsFavorite()
  }, [handle])

  const handleClick = () => {
    setIsAnimating(true)
    const isFavorite = toggleFavoriteProduct(handle)

    setIsActive(isFavorite)
  }

  return (
    <>
      <Button
        aria-label="Favorite this item"
        type="submit"
        onClick={handleClick}
        variant="outline"
        className="group w-full bg-white transition-all hover:bg-gray-100"
      >
        {isPending ? (
          <div className="flex items-center justify-center">
            <Spinner className="size-4 bg-transparent" />
          </div>
        ) : (
          <>
            <HeartIcon
              onAnimationEnd={() => {
                setIsAnimating(false)
              }}
              className={cn(
                "mr-2 size-5 transition-all",
                isActive ? "text-red-500 " : "text-gray-300",
                isAnimating && "animate-single-bounce"
              )}
            />
            {isActive ? "Saved to Favorites" : "Add to Favorites"}
          </>
        )}
      </Button>
    </>
  )
}



