"use client";
import { motion } from "framer-motion";
import { HiOutlineX } from "react-icons/hi";
import { CartItem } from "@/redux/types";
import SideCartProduct from "./SideCartProduct";
import CustomButton from "../ui/CustomButton";
import { useDispatch } from "react-redux";
import { clearCart } from "@/redux/cartSlice";
import Link from "next/link";
import { cartService } from "@/services/cartService";
import { authService } from "@/services/authService";
import { useState } from "react";

interface SideCartProps {
  items: CartItem[];
  isOpen: boolean;
  onClose: () => void;
}

export default function SideCart({ items, isOpen, onClose }: SideCartProps) {

  const dispatch = useDispatch();
  const [isClearing, setIsClearing] = useState(false);

  const handleClearCart = async () => {
    if (isClearing) return; // Evitar múltiples clics
    
    // Si el usuario está autenticado, vaciar el carrito en el backend
    if (authService.isAuthenticated()) {
      try {
        setIsClearing(true);
        await cartService.clearCart();
        // Vaciar Redux después de que el backend confirme
        dispatch(clearCart());
      } catch (error) {
        console.error('Error al vaciar el carrito:', error);
        // Si falla, vaciar solo de Redux
        dispatch(clearCart());
      } finally {
        setIsClearing(false);
      }
    } else {
      // Si no está autenticado, solo vaciar Redux
      dispatch(clearCart());
    }
  }
  const total = items.reduce((sum, item) => {
    return sum + (parseFloat(item.product.price) * item.quantity);
  }, 0);
  
  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: isOpen ? 0 : "100%" }}
      transition={{ type: "spring", stiffness: 70 }}
      className="fixed top-0 right-0 h-full w-[350px] backdrop-blur-xl shadow-2xl z-50 flex flex-col rounded-l-2xl"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-2xl  text-[#535657] font-thin">Tu carrito</h2>
        <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 cursor-pointer hover:rotate-45 transition-all duration-300">
          <HiOutlineX size={22} />
        </button>
      </div>

      {/* Items */}
      {items.length == 0 && (
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.5, 
            ease: "easeOut",
            delay: 0.2 
          }}
          className="pt-10"
        >
          <p className="text-md text-center text-[#535657] font-thin">Wow! Cuánto vacío...</p>
        </motion.div>
      )}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {items.map((item, key) => (
          
          <SideCartProduct key={key} item={item}/>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-gray-200">
        {/* Total */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg text-[#535657]">Total:</span>
          <span className="text-xl text-[#535657]"><span className="text-sm">$</span>{total.toFixed(2)}</span>
        </div>
        
        {/* Buttons */}
        <div className="flex flex-row items-center justify-evenly gap-2">
          <Link href="/checkout" > 
            <CustomButton text="Iniciar Compra" className="flex-1"/>
          </Link>
          
          <CustomButton 
            onClick={handleClearCart} 
            text={isClearing ? "Vaciando..." : "Vaciar Carrito"} 
            className={`flex-1 ${isClearing ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={isClearing}
          />
        </div>
      </div>
    </motion.div>
  );
}




