"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FiHeart } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { useCart } from "../app/products/context/CartContext";
import CartModal from "../components/CartModal";
import Link from "next/link";

const Header = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const { cart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartClick = () => {
    setIsCartOpen(!isCartOpen);
  };

  return (
    <div className="w-full h-[60px] flex flex-row items-center px-4 sm:px-6 md:px-8 lg:px-16 bg-white">
      <div className="flex items-center justify-start">
        <Image
          src="/images/nike.svg"
          alt="Logo"
          width={78.47}
          height={78.47}
          className="ml-4"
        />
      </div>

      <div className="hidden sm:flex flex-grow justify-center gap-6 items-center">
        <Link href="/products/">
          <h1 className="text-sm font-medium text-gray-800">New & Featured</h1>
        </Link>
        <h1 className="text-sm font-medium text-gray-800">Men</h1>
        <h1 className="text-sm font-medium text-gray-800">Women</h1>
        <h1 className="text-sm font-medium text-gray-800">Kids</h1>
        <h1 className="text-sm font-medium text-gray-800">Sale</h1>
        <h1 className="text-sm font-medium text-gray-800">SNKRS</h1>

        <Image
          src="/images/Frame.png"
          alt="Special Offer"
          width={180}
          height={40}
          className="ml-12"
        />
      </div>

      <div className="flex items-center  justify-end ml-auto">
        <div className="relative cursor-pointer mr-6 hover:text-indigo-200">
          <FiHeart className="text-[28px]" />
          <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white flex items-center justify-center translate-x-1 -translate-y-1">
            0
          </div>
        </div>

        <div
          className="relative cursor-pointer hover:text-indigo-200"
          onClick={handleCartClick}
        >
          <HiOutlineShoppingBag className="text-[28px]" />
          <div className="bg-red-600 rounded-full absolute top-0 right-0 w-[18px] h-[18px] text-[12px] text-white flex items-center justify-center translate-x-1 -translate-y-1">
            {cart.length}
          </div>
        </div>
      </div>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      <div className="sm:hidden flex items-center ml-auto">
        <button
          className="text-gray-800"
          onClick={() => setMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu" // Added aria-label here
        >
          <svg
            className="w-6 h-6"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="sm:hidden absolute top-[100px] left-0 w-full bg-white shadow-md z-10">
          <div className="flex flex-col items-center py-4">
            <h1 className="text-sm font-medium text-gray-800 py-2">
              New & Featured
            </h1>
            <h1 className="text-sm font-medium text-gray-800 py-2">Men</h1>
            <h1 className="text-sm font-medium text-gray-800 py-2">Women</h1>
            <h1 className="text-sm font-medium text-gray-800 py-2">Kids</h1>
            <h1 className="text-sm font-medium text-gray-800 py-2">Sale</h1>
            <h1 className="text-sm font-medium text-gray-800 py-2">SNKRS</h1>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
