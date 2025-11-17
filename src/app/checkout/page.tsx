"use client";
import CheckoutFlow from "@/components/checkout/CheckoutFlow";
import { shoppingCartSelect } from "@/redux/cartSlice";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function Page(){
    const cartItems = useSelector(shoppingCartSelect);
    
    useEffect(() => {
        console.log('📦 Checkout Page - Cart State:', cartItems);
        console.log('📦 Checkout Page - Items:', cartItems.items);
        console.log('📦 Checkout Page - Items count:', cartItems.items?.length || 0);
    }, [cartItems]);
    
    return(
        <div>
            <CheckoutFlow items={cartItems.items}/>
        </div>
    )
}