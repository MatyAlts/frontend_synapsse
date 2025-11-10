"use client"
import { addToCart, setCartOpen } from "@/redux/cartSlice";
import { Product } from "@/redux/types";
import { useDispatch } from "react-redux";

interface ProductCardProps {
  id: string
  title: string;
  description: string;
  price: string;
  img: string;
}
export default function ProductCard({id, title, description, price, img}: ProductCardProps) {

  const dispatch = useDispatch();

  const handleAddToCart = () => {
    
    const product: Product = { id, title, description, price, img };
    console.log("[ProductCard] click add:", product);
    dispatch(addToCart({ product, quantity: 1 }));
    dispatch(setCartOpen(true)); // opcional: abre el sidebar
  };
  
  
  return (
    <div className="flex flex-col p-3 
        bg-neutral-100
        border border-white 
        shadow-[12px_17px_20px_rgba(0,0,0,0.22)] 
        backdrop-blur-[6px]
        rounded-[17px] 
        text-center 
        cursor-pointer 
        transition-all duration-500 
        items-center justify-end 
        select-none 
        font-bold 
        text-black
         hover:scale-105
        active:scale-95 active:rotate-[1.7deg]
      ">
      <div
        className="
        flex flex-row
        p-5 
        bg-neutral-100
        border border-white 
        shadow-[12px_17px_51px_rgba(0,0,0,0.22)] 
        backdrop-blur-[6px]
        rounded-[17px] 
        text-center 
        cursor-pointer 
        transition-all duration-500 
        items-center justify-end 
        select-none 
        font-bold 
        text-black
        hover:border-black hover:scale-105
        active:scale-95 active:rotate-[1.7deg]
        
      "
      >
        <img src={img} alt="" className="relative left-5" />
        <div className="text-end">
          <p className="text-[#2f3031] font-medium text-start text-lg">
            <span>
              
            </span>
            {title}
          </p>
          <p className="text-[#535657] text-xs font-thin">{description}</p>
        </div>
        
      </div>
      <div className="flex flex-row items-center justify-between pt-2 w-[90%] mx-auto">
        <button onClick={handleAddToCart} className="bg-lime-300 text-sm px-2 py-1 text-[#2f3031] rounded-full shadow-lg font-light cursor-pointer hover:scale-110 transition-all duration-300">
          Comprar
        </button>
        <p className="text-[#2f3031] font-medium text-lg">${price}</p>
      </div>
    </div>
  );
}
