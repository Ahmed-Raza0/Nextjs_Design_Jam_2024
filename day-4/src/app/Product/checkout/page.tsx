"use client";

import React from "react";
import { useCart } from "../context/CartContext"; 
import { useRouter } from "next/navigation";
import Image from "next/image"; 
import { urlFor } from "@/sanity/lib/image";  

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
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-gradient-to-r from-blue-50 to-indigo-100 min-h-screen">
      <h1 className="text-4xl font-extrabold text-indigo-700 mb-8 text-center">Checkout</h1>

     
      <div className="mb-6">
        <h2 className="text-2xl font-semibold text-indigo-600 mb-4">Your Cart</h2>
        <ul className="space-y-4">
          {cart.length === 0 ? (
            <li className="text-center text-gray-500">No items in the cart.</li>
          ) : (
            cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-4 bg-white shadow-lg rounded-lg hover:shadow-xl transition duration-300"
              >
                <div className="flex items-center space-x-4">
                 
                  {item.image && (
                    <Image
                      src={urlFor(item.image).width(100).height(100).url() ?? ""}
                      alt={item.title ?? ""}
                      width={100}
                      height={100}
                      className="object-cover rounded-md"
                    />
                  )}
                  <span className="text-lg font-medium text-indigo-700">{item.title}</span>
                </div>
                <div className="text-md text-gray-600">
                  <span>{item.quantity} x ${item.price.toFixed(2)}</span>
                </div>
                <span className="text-lg font-bold text-indigo-700">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))
          )}
        </ul>
      </div>

      
      <div className="flex justify-between items-center text-lg font-semibold mb-6 text-gray-900">
        <span className="text-indigo-700">Total:</span>
        <span className="text-xl font-bold text-indigo-700">${getTotalPrice().toFixed(2)}</span>
      </div>

       
      <button
        type="button"
        onClick={handlePlaceOrder}
        className="w-full sm:w-2/3 md:w-1/2 lg:w-1/3 py-4 px-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg shadow-md transition duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        Place Order
      </button>
    </div>
  );
}
