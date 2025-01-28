"use client";

import { Inter } from "next/font/google";
import React from "react";
import { useCart } from "../context/CartContext";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

const inter = Inter({ subsets: ["latin"] });

export default function CheckoutPage() {
  const { cart, clearCart, getTotalPrice } = useCart();
  const router = useRouter();

  const handlePlaceOrder = () => {
    console.log("Order placed:", {
      cart,
      total: getTotalPrice(),
    });

    clearCart();

    router.push("/products/order-success");
  };

  return (
    <div
      className={`w-full h-full flex mt-[96px] justify-center ${inter.className}`}
    >
      <div className="w-full max-w-[1100px] h-auto flex flex-col lg:flex-row mx-auto px-4 lg:px-8">
        {/* Left Column: Cart Items */}
        <div className="w-full lg:w-[733.33px] h-auto flex flex-col">
          <div className="w-full lg:w-[717.33px] h-[62.89px] bg-[#F1F1F1] p-3">
            <h1
              className={`text-[13px] font-medium text-[#111111] ${inter.className}`}
            >
              Free Delivery
            </h1>
            <div className="flex items-center">
              <h1 className={`text-[11px] text-[#111111] ${inter.className}`}>
                Applies to orders of ₹ 14 000.00 or more.
              </h1>
              <h1
                className={`text-[11px] ml-2 font-medium underline text-[#111111] ${inter.className}`}
              >
                View details
              </h1>
            </div>
          </div>

          <h1
            className={`text-[22px] font-medium text-[#111111] ${inter.className} mt-3 ml-2`}
          >
            Bag
          </h1>

          <div className="w-full flex flex-col gap-2">
            {cart.length === 0 ? (
              <p className="text-center text-gray-500">No items in your cart</p>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="w-full h-auto flex flex-col md:flex-row lg:flex-row xl:flex-row 2xl:flex-row py-[24px] border-b border-t border-slate-300"
                >
                  <div className="w-[150px] h-[150px]">
                    <Image
                      src={
                        urlFor(item.image).width(150).height(150).url() ??
                        "/images/default-image.jpg"
                      }
                      alt={item.title ?? "product image"}
                      width={150}
                      height={150}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="w-full md:w-[537.33px] flex flex-col justify-between gap-3">
                    <div>
                      <h1
                        className={`text-[15px] font-medium text-[#111111] ${inter.className}`}
                      >
                        {item.title}
                      </h1>
                      <h1
                        className={`text-[15px] text-[#757575] ${inter.className}`}
                      >
                        {item.description || "No description"}
                      </h1>
                      <div className="flex justify-between items-center">
                        <h1
                          className={`text-[15px] text-[#757575] ${inter.className}`}
                        >
                          Quantity: {item.quantity}
                        </h1>
                      </div>
                    </div>
                    <h1 className="text-[15px] text-[#111111]">
                      MRP: ₹ {item.price}
                    </h1>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column: Summary */}
        <div className="w-full lg:w-[350.67px] h-auto flex flex-col gap-5">
          <h1
            className={`text-[21px] font-medium text-[#111111] ${inter.className}`}
          >
            Summary
          </h1>
          <div className="flex justify-between items-center">
            <h1 className={`text-[15px] text-[#111111] ${inter.className}`}>
              Subtotal
            </h1>
            <h1 className={`text-[15px] text-[#111111] ${inter.className}`}>
              ₹ {getTotalPrice().toFixed(2)}
            </h1>
          </div>
          <div className="flex justify-between items-center">
            <h1 className={`text-[15px] text-[#111111] ${inter.className}`}>
              Estimated Delivery & Handling
            </h1>
            <h1 className={`text-[15px] text-[#111111] ${inter.className}`}>
              Free
            </h1>
          </div>
          <div className="flex justify-between items-center border-t border-b border-slate-300 py-2">
            <h1 className={`text-[15px] text-[#111111] ${inter.className}`}>
              Total
            </h1>
            <h1 className={`text-[15px] text-[#111111] ${inter.className}`}>
              ₹ {getTotalPrice().toFixed(2)}
            </h1>
          </div>
          <button
            type="button"
            onClick={handlePlaceOrder}
            className="w-full bg-[#111111] rounded-[30px] py-2 text-white text-center"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
