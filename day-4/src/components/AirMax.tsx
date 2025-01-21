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

  const productsToShow = products.slice(0, 3);

  return (
    <>
      <div className="w-full max-w-[1440px] h-auto flex flex-col items-center mt-11 justify-center">
        <div className="w-full h-[52px] flex flex-row items-center justify-between px-4 sm:px-6 lg:px-10">
          <h1 className="ml-[48px] text-[22px] font-medium text-[#111111]">
            Best of Air Max
          </h1>
          <Image
            src="/images/AutoLayoutHorizontal.svg"
            alt="arrow"
            width={164.75}
            height={48}
            className="mr-[48px]"
          />
        </div>
        <div className="w-full max-w-[1440px] h-auto flex flex-wrap gap-3 items-center justify-center px-4 sm:px-6 lg:px-10">
          {productsToShow.map((product: Product) => {
            // Dynamically generate image URL for each product
            const imageUrl = product.image ? urlFor(product.image).width(431).height(431).url() : '';

            return (
              <div
                key={product.id}
                className="w-[441.36px] h-[510.36px] flex flex-col mb-6 sm:mb-0"
              >
                {/* Image */}
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={product.productName}
                    width={441.36}
                    height={441.36}
                    className="mb-4"
                  />
                ) : (
                  <div className="w-full h-[441.36px] bg-gray-200 flex items-center justify-center">
                    <span>No Image Available</span>
                  </div>
                )}

                {/* Product Info */}
                <div className="w-[425.36px] h-[48px] flex flex-row justify-between">
                  <div className="w-[134.27px] h-[48px] flex flex-col justify-center">
                    <h1 className="text-[15px] text-center text-[#111111] font-medium">
                      {product.productName}
                    </h1>
                    <h1 className="text-[15px] text-center text-[#757575]">
                      {product.category || "Category Unavailable"}
                    </h1>
                  </div>
                  <h1 className="font-medium text-[15px] text-right text-[#111111]">
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
