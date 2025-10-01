'use client'

import { COOKIE_FAVORITES } from "@/constants/index"

export function toggleFavoriteProduct(handle) {
  const handles = getParsedFavoritesHandles()
  const isFavorite = handles.includes(handle)
  const newFavorites = handles.includes(handle) 
    ? handles.filter((i) => i !== handle) 
    : [...handles, handle]

  document.cookie = `${COOKIE_FAVORITES}=${JSON.stringify(newFavorites)};path=/`
  return !isFavorite
}

export function getParsedFavoritesHandles() {
  const cookies = document.cookie.split(';')
  const favoriteCookie = cookies
    .find(cookie => cookie.trim().startsWith(`${COOKIE_FAVORITES}=`))
  
  if (!favoriteCookie) return []
  
  const favoriteValue = favoriteCookie.split('=')[1]
  return JSON.parse(favoriteValue || '[]')
}