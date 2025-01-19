
import Link from "next/link";
import Image from "next/image";
import { client } from "../sanity/lib/client";
import imageUrlBuilder from "@sanity/image-url";
 
const builder = imageUrlBuilder(client);
function urlFor(source:string) {
  return builder.image(source);
}

interface Product {
  id: number;
  title: string;
  price: string;
  description: string;
  category: string;
  image: string;
  inventory: number;
 rating: number;
}

async function fetchProductList() {
  const products = await client.fetch(`*[_type == "product"]`);
  return products;
}

export default async function ProductList() {
  let products: Product[] = [];
  try {
    products = await fetchProductList();
  } catch (error) {
    console.error("Failed to fetch products", error);
  }

  return (
    <div className="container h-full bg-gray-50 mx-auto px-6 py-12">
      <h1 className="text-5xl font-extrabold text-center mb-12 text-gray-800">
        Explore Our Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center text-2xl text-red-500">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: Product }) {
  const maxDescriptionLength = 50;
  const description =
    product.description.length > maxDescriptionLength
      ? product.description.substring(0, maxDescriptionLength) + "..."
      : product.description;

      const imageUrl = product.image ? urlFor(product.image).width(600).height(600).url() : '';

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-300 group">
      <Link href={`./products/${product.id}`}>
        <div className="relative">
                    {imageUrl ? (
            <Image
              src={imageUrl}
              alt={product.title}
              width={200}
              height={200}
              className="mx-auto w-full h-full   group-hover:opacity-90 transition-opacity duration-300"
            />
          ) : (
            <div className="w-full h-72 bg-gray-300 flex items-center justify-center">
              <span className="text-white">No Image Available</span>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-800 opacity-0 group-hover:opacity-90 transition-opacity duration-300 flex items-end p-4">
            <p className="text-white text-lg font-bold">{product.title}</p>
          </div>
        </div>
      </Link>
      <div className="p-5">
        <h2 className="text-xl font-semibold text-gray-900 truncate mb-2">
          {product.title}
        </h2>
        <p className="text-gray-700 text-sm mb-4">{description}</p>
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-green-600">${product.price}</p>
          <div className="text-yellow-500 flex items-center">
            <span className="text-sm font-medium mr-1">{product.rating}</span>
            <span>&#9733;</span>
          </div>
        </div>
      </div>
      <Link
        href={`./products/${product.id}`}
        className="block w-full bg-gradient-to-r from-violet-600 via-violet-500 to-violet-400 text-white text-center py-3 mt-2 rounded-lg font-medium hover:scale-105 transition-transform duration-300"
      >
        View Details
      </Link>
    </div>
  );
}
