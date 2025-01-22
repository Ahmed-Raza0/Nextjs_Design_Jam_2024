"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import { toast, ToastContainer } from "react-toastify";
import { useCart } from "../context/CartContext";
import { useParams } from "next/navigation";

export interface Product {
  id: number;
  productName: string;
  category: string;
  price: number;
  inventory: number;
  colors: string[];
  status: string;
  image: string;
  description: string;
  rating: number;
  quantity: number;
  title: string;
}

async function fetchProductById(id: number): Promise<Product | null> {
  try {
    const query = `*[_type == "product" && id == ${id}][0]`;
    const params = { id };
    const result = await client.fetch(query, params);
    return result || null;
  } catch (error) {
    console.error("Error fetching product:", error);
    throw new Error("Failed to fetch product");
  }
}

export default function CardDetails() {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { addToCart } = useCart();
  const router = useRouter();
  const params = useParams();
  const productId = params.id;
  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await fetchProductById(Number(productId));
        if (data) {
          setProduct(data);
        } else {
          setError("Product not found.");
        }
      } catch (error) {
        console.log(error);

        setError("Failed to load product.");
      } finally {
        setLoading(false);
      }
    }

    if (productId) {
      loadProduct();
    }
  }, [productId]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!product) return <div>Product not found.</div>;

  const handleAddToCart = () => {
    if (product && product.inventory > 0) {
      const updatedProduct = { ...product, inventory: product.inventory - 1 };
      setProduct(updatedProduct);

      addToCart(product);
      toast.success("Product added to cart successfully!", {
        position: "top-center",
        autoClose: 3000,
      });
      router.push("../../Cart");
    } else {
      toast.error("Sorry, this product is out of stock.", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  const imageUrl = product.image
    ? urlFor(product.image).width(300).height(300).url()
    : "/images/default-image.jpg";

  return (
    <div className="w-full flex justify-center px-4">
      <div className="w-full lg:w-[1200px] flex flex-col lg:flex-row justify-between">
        <div className="w-full lg:w-[653px] mb-4 lg:mb-0">
          {imageUrl && (
            <Image
              src={imageUrl}
              alt={product.productName || "Product Image"}
              width={653}
              height={653}
              className="object-cover"
            />
          )}
        </div>

        <div className="w-full lg:w-[376px] flex flex-col gap-3">
          <h1 className="text-[32px] lg:text-[48px] font-medium text-[#111111]">
            {product.productName}
          </h1>
          <p className="text-[14px] lg:text-[15px] text-[#111111]">
            {product.description}
          </p>
          <h1 className="text-[28px] lg:text-[36px] font-medium text-[#111111]">
            ₹ {product.price}
          </h1>
          <div className="flex justify-between">
            <h1 className="text-[14px] lg:text-[18px] font-medium text-[#111111]">
              Quantity:{" "}
              <span className="text-red-500">{product.inventory}</span>
            </h1>
            <h1 className="text-[14px] lg:text-[18px] font-medium text-[#111111]">
              Rating:{" "}
              <span className="text-yellow-500">{product.rating || 4.5}</span>
            </h1>
          </div>
          <button
            onClick={handleAddToCart}
            className="w-full lg:w-[174px] h-[44px] bg-black text-white rounded-[30px] mt-4"
          >
            Add to Cart
          </button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
