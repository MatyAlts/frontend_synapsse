import { decreaseQuantity, increaseQuantity, removeFromCart, setCart } from "@/redux/cartSlice"
import { RootState } from "@/redux/store"
import { CartItem, Product } from "@/redux/types"
import { AnimatePresence, motion } from "framer-motion"
import Image from "next/image"
import { useState } from "react"
import { FiMinus } from "react-icons/fi"
import { GoPlus } from "react-icons/go"
import { PiTrashLight } from "react-icons/pi"
import { useDispatch, useSelector } from "react-redux"
import { cartService } from "@/services/cartService"
import { authService } from "@/services/authService"

interface ProductCartCardProps {
    item: CartItem,
}

export default function ProductCartCard({ item }: ProductCartCardProps) {
    const dispatch = useDispatch();
    const [isExpanded, setIsExpanded] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const productKey = item.product.id;

    const handleIncreaseQuantity = async () => {
        if (authService.isAuthenticated()) {
            try {
                setIsLoading(true);
                const cart = await cartService.getCart();
                const cartItem = cart.items.find(ci => ci.product.id === Number(item.product.id));
                
                if (cartItem) {
                    const updatedCart = await cartService.updateItem(cartItem.id, cartItem.quantity + 1);
                    dispatch(setCart(updatedCart.items.map(i => ({
                        product: {
                            id: i.product.id.toString(),
                            title: i.product.name,
                            description: i.product.description,
                            price: i.product.price.toString(),
                            img: i.product.imageUrl
                        },
                        quantity: i.quantity
                    }))));
                }
            } catch (error) {
                console.error('Error al actualizar cantidad:', error);
                dispatch(increaseQuantity({ productKey, amount: 1 }));
            } finally {
                setIsLoading(false);
            }
        } else {
            dispatch(increaseQuantity({ productKey, amount: 1 }));
        }
    }

    const handleDecreaseQuantity = async () => {
        if (authService.isAuthenticated()) {
            try {
                setIsLoading(true);
                const cart = await cartService.getCart();
                const cartItem = cart.items.find(ci => ci.product.id === Number(item.product.id));
                
                if (cartItem) {
                    const newQuantity = cartItem.quantity - 1;
                    if (newQuantity <= 0) {
                        // Si la cantidad llega a 0, eliminar el item
                        await handleRemoveItem();
                    } else {
                        const updatedCart = await cartService.updateItem(cartItem.id, newQuantity);
                        dispatch(setCart(updatedCart.items.map(i => ({
                            product: {
                                id: i.product.id.toString(),
                                title: i.product.name,
                                description: i.product.description,
                                price: i.product.price.toString(),
                                img: i.product.imageUrl
                            },
                            quantity: i.quantity
                        }))));
                    }
                }
            } catch (error) {
                console.error('Error al actualizar cantidad:', error);
                dispatch(decreaseQuantity({ productKey, amount: 1 }));
            } finally {
                setIsLoading(false);
            }
        } else {
            dispatch(decreaseQuantity({ productKey, amount: 1 }));
        }
    }

    const handleRemoveItem = async () => {
        // Si el usuario está autenticado, eliminar del backend
        if (authService.isAuthenticated()) {
            try {
                setIsLoading(true);
                // Buscar el itemId en el backend (necesitamos el id del CartItem, no del producto)
                const cart = await cartService.getCart();
                const cartItem = cart.items.find(ci => ci.product.id === Number(item.product.id));
                
                if (cartItem) {
                    // Eliminar del backend
                    const updatedCart = await cartService.removeItem(cartItem.id);
                    // Actualizar Redux con la respuesta del backend
                    dispatch(setCart(updatedCart.items.map(i => ({
                        product: {
                            id: i.product.id.toString(),
                            title: i.product.name,
                            description: i.product.description,
                            price: i.product.price.toString(),
                            img: i.product.imageUrl
                        },
                        quantity: i.quantity
                    }))));
                }
            } catch (error) {
                console.error('Error al eliminar del carrito:', error);
                // Si falla, eliminar solo de Redux
                dispatch(removeFromCart(item.product.id));
            } finally {
                setIsLoading(false);
            }
        } else {
            // Si no está autenticado, solo eliminar de Redux
            dispatch(removeFromCart(item.product.id));
        }
    }

    return (
        <div 
            className="bg-white/50 rounded-xl shadow-sm hover:scale-105 transition-all duration-300 cursor-pointer"
            onMouseEnter={() => setIsExpanded(true)}
            onMouseLeave={() => setIsExpanded(false)}
        >
            <div
                key={item.product.id}
                className="flex items-center gap-3 p-3"
            >
                <img
                    src={item.product.img}
                    alt="Producto"
                    width={60}
                    height={60}
                    className="rounded-lg"
                />
                <div className="flex-1">
                    <h3 className="text-sm font-medium text-[#2f3031]">{item.product.title}</h3>
                    <p className="text-md text-[#535657]"><span className="text-sm">x</span>{item.quantity}</p>
                </div>
                <p className="text-lg font-thin text-[#535657]"><span className="text-sm">$</span>{parseFloat(item.product.price) * item.quantity}</p>
            </div>

            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.29 }}
                        className="px-3 pb-3 text-sm text-gray-600"
                    >
                        <div>
                            <p className="mb-3 text-end text-xs font-thin text-[#535657]">{item.product.description}</p>
                            <div className="flex flex-row items-center justify-end gap-6">
                                <GoPlus
                                    onClick={handleIncreaseQuantity}
                                    className={`text-xl cursor-pointer hover:scale-125 transition-all duration-300 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                                />
                                <FiMinus
                                    onClick={handleDecreaseQuantity}
                                    className={`text-xl cursor-pointer hover:scale-125 transition-all duration-300 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                                />
                                <PiTrashLight
                                    onClick={handleRemoveItem}
                                    className={`text-xl cursor-pointer hover:scale-125 transition-all duration-300 text-red-500 ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
                                />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    )
}