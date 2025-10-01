
import { useParams } from "react-router-dom";

import Breadcrumbs from "../../components/breadcrumbs"
import { ProductTitle } from "../../components/product/product-title"
import { RightSection } from "../../components/product/right-section"
import { mapCurrencyToSign } from "../utils/currency-utils"
import AddToCartButton  from "../../components/product/add-to-cart-button"
import { FavoriteMarker } from "../../components/product/favorite-marker"
import { FaqSectionClient, FaqAccordionItem } from "../../components/product/faq-section/faq-section-client"
import { nameToSlug } from "@/lib/utils"
import { RichText } from "@/components/product/rich-text"
import { ProductImages } from "@/components/product/product-images"
import { ecommerceAPI } from '@/services/api';
import { useFetch } from '@/hooks/useApi';
import { ProductStock } from "@/components/product/stock-details"


function makeBreadcrumbs(product) {
  return {
    Home: "/",
    [product.categories[0]?.label]: `/category/${product.categories[0]?.name}`,
    [product.name]: "",
  }
}

function getDefaultFaqAccordionItemRichText() {
  return `
    <ul class="list-disc pl-5">
      <li>Material: 190T polyester fabric with UV protection coating</li>
      <li>Frame: Fiberglass poles for durability and flexibility</li>
      <li>Size: 7.2ft x 3.6ft x 3.6ft (LxWxH), fits up to 4 people</li>
      <li>Weight: 4.4 lbs, easy to carry with included travel bag</li>
      <li>Setup: Instant pop-up design, sets up in seconds</li>
      <li>Ventilation: Mesh windows and rear vent for airflow</li>
      <li>Anchoring: Sand pockets and stakes for stability</li>
      <li>Care: Hand wash with mild soap and air dry</li>
    </ul>
  `
}

const ProductDetailPage = () => {
  const { productId } = useParams();

    const {
      data: product,
      loading: productLoading,
      error: productsError,
    } = useFetch(() => ecommerceAPI.getProduct(productId));
      console.log("Product details:", product);
    
	if (productLoading) {
		return (
			<div className="flex items-center justify-center h-64">
				Loading product...
			</div>
		);
	}

	if (productsError) {
		return (
			<div className="flex items-center justify-center h-64 text-red-500">
				Error: {productsError}
			</div>
		);
	}

  const imagesToShow = product?.images?.[0]?.sizes.filter((img) => img.size === 'MEDIUM') || []
  const activeIndex = 1
  return (
    <div className="relative mx-auto max-w-container-md px-4 xl:px-0">
      {/* <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateJsonLd(product, slug)) }}
      ></script> */}
      <div className="mb:pb-8 relative flex w-full items-center justify-center gap-10 py-4 md:pt-12">
        <div className="mx-auto w-full max-w-container-sm">
          <Breadcrumbs className="mb-8" items={makeBreadcrumbs(product)} />
        </div>
      </div>
      <main className="mx-auto max-w-container-sm">
        <div className="grid grid-cols-1 gap-4 md:mx-auto md:max-w-screen-xl md:grid-cols-12 md:gap-8">
          <ProductTitle
            className="md:hidden"
            title={product.name}
            price={product.amount}
            currency={product?.amount ? mapCurrencyToSign('INR') : "₹"}
          />
          <ProductImages key={productId} images={imagesToShow} initialActiveIndex={activeIndex} />
          <RightSection className="md:col-span-6 md:col-start-8 md:mt-0">
            <ProductTitle
              className="hidden md:col-span-4 md:col-start-9 md:block"
              title={product.name}
              price={product.amount}
              currency={product?.amount ? mapCurrencyToSign('INR') : "₹"}
            />
            {/* {!hasOnlyOneVariant && (
              <VariantDropdowns
                variants={product.variants}
                handle={product.handle}
                combination={combination}
                currentSlug={slug}
              />
            )} */}
            <p>{product.description}</p>
            <ProductStock product={product} />
            <AddToCartButton className="mt-4" product={product} />
            <FavoriteMarker handle={productId} />
            <FaqSectionClient defaultOpenSections={[nameToSlug(null)]}>
              <FaqAccordionItem title="Product details">
                <RichText
                  data={getDefaultFaqAccordionItemRichText()}
                  className="prose prose-sm max-w-none"
                />
              </FaqAccordionItem>
              {/* <FaqAccordionItem title="Size and Fit">
                <p>
                  Est veniam qui aute nisi occaecat ad non velit anim commodo sit proident. Labore sint officia nostrud
                  eu est fugiat nulla velit sint commodo. Excepteur sit ut anim pariatur minim adipisicing dolore sit
                  dolore cupidatat. Amet reprehenderit ipsum aute minim incididunt adipisicing est.
                </p>
              </FaqAccordionItem> */}
              {/* <FaqAccordionItem title="Free Delivery and Returns">
                <p>
                  Aliqua Lorem ullamco officia cupidatat cupidatat. Nostrud occaecat ex in Lorem. Et occaecat
                  adipisicing do aliquip duis aliquip enim culpa nulla. Nulla quis aute ex eu est ullamco enim
                  incididunt fugiat proident laboris.
                </p>
              </FaqAccordionItem> */}
              <FaqAccordionItem title="Supplier Information">
                    <ul class="list-disc pl-5">
                      <li>
                        <strong>Supplier Name:</strong> A K Traders. (Wholesale & Retails)
                      </li>

                      <li>
                        <strong>Location:</strong> Petlawad, Madhya Pradesh, India
                      </li>
                      <li>
                        <strong>Contact:</strong> <a href="mailto:support@aktraders.com" class="text-blue-600 underline">support@aktraders.com</a>
                      </li>
                      <li>
                        <strong>Bulk Orders:</strong> Special pricing and support available for bulk and B2B orders.
                      </li>
                    </ul>
              </FaqAccordionItem>
            </FaqSectionClient>
          </RightSection>
        </div>
        {/* <Suspense fallback={<SimilarProductsSectionSkeleton />}>
          <SimilarProductsSection objectID={product.objectID} slug={slug} />
        </Suspense> */}
      </main>
    </div>
  )
}


export default ProductDetailPage;

