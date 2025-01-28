import { client } from "@/sanity/lib/client";
import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";

interface Product {
  id: string;
  productName: string;
  category: string;
  price: number;
  inventory: number;
  colors: string[];
  status: string;
  image: string;
  description: string;
}

const builder = imageUrlBuilder(client);
function urlFor(source: string) {
  return builder.image(source);
}

export default async function Products() {
  const fetchProducts = async () => {
    const response = await client.fetch(`*[_type == 'product']`);
    return response;
  };

  const products = await fetchProducts();

  const productsToShow = products.slice(0, 4);

  return (
    <>
      <div className="w-full max-w-[1440px] h-auto flex flex-col items-center mt-11 justify-center">
        <div className="w-full h-[52px] flex flex-row items-center justify-between px-4 sm:px-6 lg:px-10">
          <h1 className="ml-[48px] sm:text-[16px] md:text-[18px] lg:text-[22px] font-medium text-[#111111]">
            Best of Air Max
          </h1>
          <Image
            src="/images/AutoLayoutHorizontal.svg"
            alt="arrow"
            width={164.75}
            height={48}
            className="mr-[48px] hidden md:block lg:block xl:block 2xl:block"
          />
        </div>
        <div className="w-full max-w-[1440px] h-auto flex flex-wrap gap-3 items-center justify-center px-4 sm:px-6 lg:px-10">
          {productsToShow.map((product: Product) => {
            const imageUrl = product.image ? urlFor(product.image).width(431).height(431).url() : '';

            return (
              <div
                key={product.id}
                className="w-full sm:w-[441.36px] md:w-[380px] lg:w-[441.36px] h-[510.36px] flex flex-col mb-6 sm:mb-0"
              >
                {/* Image */}
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={product.productName}
                    width={431.36}
                    height={431.36}
                    className="mb-4 "
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span>No Image Available</span>
                  </div>
                )}

                {/* Product Info */}
                <div className="w-full sm:w-[425.36px] md:w-[350px] h-[48px] flex flex-row justify-between">
                  <div className="w-[134.27px] h-[48px] flex flex-col justify-center">
                    <h1 className="text-[15px] sm:text-[16px] md:text-[14px] text-center text-[#111111] font-medium">
                      {product.productName}
                    </h1>
                    <h1 className="text-[15px] sm:text-[16px] md:text-[14px] text-center text-[#757575]">
                      {product.category || "Category Unavailable"}
                    </h1>
                  </div>
                  <h1 className="font-medium text-[15px] sm:text-[16px] md:text-[14px] text-right text-[#111111]">
                    ₹ {product.price.toLocaleString()}
                  </h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
