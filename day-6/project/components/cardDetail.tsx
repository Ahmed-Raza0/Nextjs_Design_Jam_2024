

import React from 'react';
import { useCart } from '../app/products/context/CartContext';


interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    inventory: number;
    rating: number;
    quantity: number;
}

const CardDetails: React.FC<{ product: Product }> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    if (product) {
      addToCart(product);
    }
  };

  return (
    <div className="card-details">
      <h1>{product.title}</h1>
      <button onClick={handleAddToCart}>Add to Cart</button>
    </div>
  );
};

export default CardDetails;
