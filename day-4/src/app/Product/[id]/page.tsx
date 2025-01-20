"use client";

import { useState, useEffect } from "react";
import React from "react";
import { client } from "@/sanity/lib/client";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";

export interface Product {
  id: number;
  productName: string;
  category: string;
  price: number;
  inventory: number;
  colors: string[];
  status: string;
  image: {
    asset: {
      _ref: string;
    };
  };
  description: string;
}

async function fetchProductById(id: number): Promise<Product | null> {
  const query = `*[_type == "product" && id == ${id}][0]`;
  const result = await client.fetch(query);
  return result || null;
}

export default function CardDetails({ params }: { params: { id: number } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProduct() {
      const data = await fetchProductById(params.id);
      setProduct(data);
      setLoading(false);
    }

    loadProduct();
  }, [params]);

  if (loading) return <div>Loading...</div>;

  if (!product) return <div>Product not found.</div>;

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

          <button className="w-full lg:w-[174px] h-[44px] bg-black text-white rounded-[30px] mt-4">
            <Link href="/Cart/">Add to Cart</Link>
          </button>
        </div>
      </div>
    </div>
  );
}
