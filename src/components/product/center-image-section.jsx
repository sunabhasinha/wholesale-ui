import { cn } from "@/lib/utils"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"

export function CenterSection({ className, images, setApi }) {
  const hasOnlyOneImage = images.length <= 1
  return (
    <div className={cn("flex flex-col rounded-t-lg", className)}>
      <div className="md:sticky md:top-[100px]">
        <Carousel className="[&>div]:rounded-lg" setApi={setApi}>
          <CarouselContent className={cn("rounded-lg", hasOnlyOneImage ? "ml-0" : "")}>
            {images.map((image, index) => (
              <CarouselItem
                className={cn("relative aspect-square rounded-lg", hasOnlyOneImage && "pl-0")}
                key={image.url}
              >
                <img
                  alt={image.altText || `Product image ${index + 1}`}
                  src={image.url || "/default-product-image.svg"}
                  style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }}
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          {!hasOnlyOneImage && (
            <div className="mt-4 flex justify-center gap-10 pb-6">
              <CarouselPrevious className="relative" />
              <CarouselNext className="relative" />
            </div>
          )}
        </Carousel>
      </div>
    </div>
  )
}