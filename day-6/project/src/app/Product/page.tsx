import Image from "next/image";
import { client } from "@/sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
import Link from "next/link";

interface Products {
  id: number;
  productName: string;
  category: string;
  price: number;
  image: string;
  status: string;
  colors: string[];
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

  return (
    <div className="w-full h-full mt-[156px] px-4">
      <div className="w-full max-w-screen-xl h-[51px] flex">
        <div className="w-full max-w-[1344px] h-[36px] flex flex-row">
          <div className="w-full max-w-[1119px] h-[33.19px]">
            <h1 className="ml-[48px] mb-[48px] text-[24px] font-medium text-[#111111]">
              New (500)
            </h1>
          </div>
          <div className="w-[224px] h-[28px]">
            <Image
              src="/images/image16.svg"
              alt="line"
              width={224}
              height={28}
            />
          </div>
        </div>
      </div>

      <div className="w-full max-w-screen-xl mt-[36px] flex flex-col lg:flex-row gap-4">
        <div className="w-full lg:w-[260px] hidden lg:flex flex-col gap-4">
          <div className="w-[192px] flex flex-col gap-[15px]">
            {/* Categories */}
            <h1 className="text-[15px] font-medium text-[#111111]">Shoes</h1>
            <h1 className="text-[15px] font-medium text-[#111111]">Sports Bras</h1>
            <h1 className="text-[15px] font-medium text-[#111111]">Tops & T-Shirts</h1>
            <h1 className="text-[15px] font-medium text-[#111111]">Hoodies & Sweatshirts</h1>
            <h1 className="text-[15px] font-medium text-[#111111]">Jackets</h1>
            <h1 className="text-[15px] font-medium text-[#111111]">Trousers & Tights</h1>
            <h1 className="text-[15px] font-medium text-[#111111]">Shorts</h1>
            <h1 className="text-[15px] font-medium text-[#111111]">Tracksuits</h1>
            <h1 className="text-[15px] font-medium text-[#111111]">Jumpsuits & Rompers</h1>
            <h1 className="text-[15px] font-medium text-[#111111]">Skirts & Dresses</h1>
            <h1 className="text-[15px] font-medium text-[#111111]">Socks</h1>
            <h1 className="text-[15px] font-medium text-[#111111]">Accessories & Equipment</h1>
          </div>

          <div className="w-[192px] flex flex-col gap-[15px] border-t border-b border-slate-300">
            <div className="flex justify-between items-center">
              <h1 className="text-[16px] font-medium text-[#111111]">Gender</h1>
              <Image
                src="/images/image17.svg"
                alt="line"
                width={14}
                height={14}
              />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-1">
                <Image
                  src="/images/Rectangle.svg"
                  alt="line"
                  width={20}
                  height={20}
                />
                <h1 className="text-[15px] text-[#111111]">Men</h1>
              </div>
              <div className="flex gap-1">
                <Image
                  src="/images/Rectangle.svg"
                  alt="line"
                  width={20}
                  height={20}
                />
                <h1 className="text-[15px] text-[#111111]">Women</h1>
              </div>
              <div className="flex gap-1">
                <Image
                  src="/images/Rectangle.svg"
                  alt="line"
                  width={20}
                  height={20}
                />
                <h1 className="text-[15px] text-[#111111]">Unisex</h1>
              </div>
            </div>
          </div>
        </div>

        
        <div className="w-full lg:w-[1092px] flex flex-col  lg:flex-row gap-4">
        <div className="w-full lg:w-[1092px] flex flex-col  lg:grid lg:grid-cols-3 ">
          {products.map((product: Products) => {
            const imageUrl = product.image
              ? urlFor(product.image).width(348).height(348).url()
              : "";

            return (
              <Link href={`/Product/${product.id}`} key={product.id}>
                <div className="w-full  sm:w-[348px] h-[533px] flex flex-col">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={product.productName}
                      width={348}
                      height={348}
                      className="mb-4"
                    />
                  ) : (
                    <div className="w-full h-[441.36px] bg-gray-200 flex items-center justify-center">
                      <span>No Image Available</span>
                    </div>
                  )}
                  <div className="flex flex-col gap-3 w-[348px]">
                    <h1 className="text-[15px] font-medium text-[#9E3500]">
                      {product.status}
                    </h1>
                    <div className="flex flex-col w-full gap-3">
                      <h1 className="text-[15px] font-medium text-[#111111]">
                        {product.productName}
                      </h1>
                      <h1 className="text-[15px] text-[#757575]">
                        {product.category}
                      </h1>
                    </div>
                    <h1 className="text-[15px] text-[#757575]">
                      {product.colors.join(", ")}
                    </h1>
                    <h1 className="text-[15px] font-medium text-[#111111]">
                      MRP : ₹ {product.price}
                    </h1>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
        </div>
      </div>
    </div>
  );
}
