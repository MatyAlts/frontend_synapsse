"use client";
import CheckoutFlow from "@/components/checkout/CheckoutFlow";
import { shoppingCartSelect } from "@/redux/cartSlice";
import { useSelector } from "react-redux";

export default function Page(){
    const cartItems = useSelector(shoppingCartSelect);
    return(
        <div>
            <CheckoutFlow items={cartItems.items}/>
        </div>
    )
}