import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { BagIcon } from "@/components/icons/bag-icon"
import { getCookie } from "@/lib/get-cookie"

import { cartService } from "@/services/cartService"
import { COOKIE_CART_ID } from "../../constants/index"
import { useAddProductStore } from "@/hooks/useAddProductStore"
import { useCartStore } from "@/hooks/useCartStore"

export async function getItemAvailability({
  cartId,
  product,
}) {

  if (!cartId) {
    const inStockQuantity =
      product?.quantity ?? Number.POSITIVE_INFINITY
    return {
      inCartQuantity: 0,
      inStockQuantity,
    }
  }

  const cart = await cartService.getCart(cartId)
  const cartItem = cart?.items?.find((item) => item.productId === productId)

  return {
    inCartQuantity: cartItem?.quantity ?? 0,
    inStockQuantity: cartItem?.merchandise.quantityAvailable ?? Number.POSITIVE_INFINITY,
  }
}

const AddToCartButton = ({
  className,
  product,
}) => {
  const [isPending, setIsPending] = useState(false)
  const [hasAnyAvailable, setHasAnyAvailable] = useState(true)
    const [showMessage, setShowMessage] = useState(false) // NEW

  const { setProduct, clean } = useAddProductStore()
  const { cart, refresh, setCheckoutReady } = useCartStore()

  const disabled = !hasAnyAvailable || !product?.available || isPending

  const handleClick = async () => {
    if (!product?.id) return

    setIsPending(true)

    setTimeout(() => {
      setProduct({ product })
      setIsPending(false)
    }, 300)

    setTimeout(() => clean(), 4500)

    setCheckoutReady(false)
    const res = await cartService.addCartItem(product.id)

    if (!res.ok) alert("Out of stock")

    setCheckoutReady(true)
    refresh()
    console.log("Added to cart", { res })
   console.log("Added to cart", { res })
    setShowMessage(true) // Show success message
    setTimeout(() => setShowMessage(false), 3000) 
  }

  useEffect(() => {
    const checkStock = async () => {
      const cartId = getCookie(COOKIE_CART_ID)
      const itemAvailability = await getItemAvailability({
        cartId,
        product,
      })
      itemAvailability && setHasAnyAvailable(itemAvailability.inCartQuantity < (product?.quantity || 0))
    }

    checkStock()
  }, [ isPending, product?.quantity, cart?.items, product.id])

  return (
        <div className="relative w-full">

    <Button
      onClick={handleClick}
      disabled={isPending || disabled}
      variant="default"
      className={cn(
        "mx-auto w-full rounded-md p-10 py-4 transition-all hover:bg-black/85 md:w-full md:rounded-md md:py-4",
        className
      )}
    >
      <BagIcon className="mr-2 size-5 text-white" />
      Add to Bag
    </Button>
     {showMessage && (
        <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 mt-2 rounded bg-green-600 px-4 py-2 text-white shadow">
          Added to cart, coming soon...!
        </div>
      )}
    </div>
  )
}

export default AddToCartButton
