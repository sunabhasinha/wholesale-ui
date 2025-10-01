import { useCallback } from "react"
import { Carousel, CarouselContent } from "../ui/carousel"
import { cn } from "@/lib/utils"

export function SideImages({ className, images, api, setThumbsApi, current }) {
  const onThumbClick = useCallback(
    (index) => {
      api?.scrollTo(index)
    },
    [api]
  )

  return (
    <div className={className}>
      <Carousel
        className="my-4 md:sticky md:top-[100px]"
        orientation="vertical"
        setApi={setThumbsApi}
        opts={{ skipSnaps: true, watchDrag: false }}
      >
        <CarouselContent className="mt-0 w-full flex-row justify-center gap-4 md:flex-col">
          {images.map((image, index) => (
            <div
              className={cn("", index === current && "border-2 border-black")}
              key={"thumbnail_" + image.url}
              onMouseEnter={() => onThumbClick(index)}
            >
              <img
                alt={image.altText || `Product image ${index + 1}`}
                src={image.url || `/default-product-image.svg`}
                width={100}
                height={100}
                style={{ objectFit: "cover", borderRadius: "inherit" }}
                loading={index === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}