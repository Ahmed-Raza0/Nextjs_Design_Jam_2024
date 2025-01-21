"use client";

import React, { useState } from "react";
import { useCart } from "../app/Product/context/CartContext";
import Image from "next/image";
import { urlFor } from "@/sanity/lib/image";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, clearCart, increaseQuantity, decreaseQuantity, getTotalPrice } = useCart();
  const [alertMessage, setAlertMessage] = useState<string>("");

  if (!isOpen) return null;

 
  const handleIncreaseQuantity = (productId: string, productInventory: number) => {
    const productInCart = cart.find((item) => String(item.id) === productId);
    if (productInCart && productInCart.quantity >= productInventory) {
      setAlertMessage("Sorry, we don't have enough stock for this product.");
      return;  
    }
    increaseQuantity(Number(productId));
    setAlertMessage(""); 
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 mr-4 text-black text-2xl font-semibold"
        >
          &times;
        </button>

        <h2 className="text-2xl text-black font-semibold mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-center text-black">Your cart is empty.</p>
        ) : (
          <div>
            <ul>
              {cart.map((product) => (
                <li key={product.id} className="flex justify-between border-2 border-gray-100 rounded-lg items-center mb-4">
                  {product.image && (
                    <Image
                      src={urlFor(product.image).width(300).height(300).url() ?? ""}
                      alt={product.title ?? ""}
                      width={50}
                      height={50}
                      className="w-16 h-16 object-cover rounded-lg "
                    />
                  )}
                  <div className="flex-1 ml-4">
                    <p className="font-semibold text-indigo-800 mb-[2px]">{product.title}</p>
                    <p className="text-sm text-green-600">${product.price.toFixed(2)}</p>

                     
                    <div className="flex items-center ">
                      <p className="text-sm text-green-600 ">
                        x: {product.quantity}  
                      </p>
                      <button
                        onClick={() => decreaseQuantity(product.id)}
                        className="text-black p-2 rounded-full"
                      >
                        -
                      </button>
                      <button
                        onClick={() => handleIncreaseQuantity(String(product.id), product.inventory)} // Pass inventory to the function
                        className="text-black p-2 rounded-full"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(product.id)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>

             
            <div className="mt-4 flex justify-between items-center">
              <p className="font-semibold">Total:</p>
              <p className="text-lg text-indigo-800">${getTotalPrice().toFixed(2)}</p>
            </div>

             
            {alertMessage && (
              <div className="mt-4 bg-yellow-100 p-2 text-yellow-700 rounded">
                {alertMessage}
              </div>
            )}

            
            <div className="mt-4">
              <button
                onClick={clearCart}
                className="bg-red-500 text-white p-2 rounded w-full mb-4"
              >
                Clear Cart
              </button>
              <button
                onClick={onClose}
                className="bg-gray-300 text-black p-2 rounded w-full"
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartModal;
