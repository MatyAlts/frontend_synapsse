"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setCart } from "@/redux/cartSlice";
import { authService } from "@/services/authService";
import { cartService } from "@/services/cartService";

const STORAGE_KEY = "miapp_cart_v1";

export function useCartPersist() {
  const dispatch = useAppDispatch();
  const cart = useAppSelector((s) => s.cart);
  const pathname = usePathname();

  // Cargar carrito del backend si el usuario está autenticado, sino del localStorage
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // No cargar carrito en rutas de admin
    if (pathname?.startsWith('/admin')) {
      console.log('Skipping cart load on admin route');
      return;
    }
    
    const loadCart = async () => {
      try {
        if (authService.isAuthenticated()) {
          // Usuario autenticado: cargar del backend
          console.log('User authenticated, loading cart from backend...');
          try {
            const backendCart = await cartService.getCart();
            
            const cartItems = backendCart.items.map(item => ({
              product: {
                id: item.product.id.toString(),
                title: item.product.name,
                description: item.product.description,
                price: item.product.price.toString(),
                img: item.product.imageUrl
              },
              quantity: item.quantity
            }));

            console.log('Cart loaded from backend:', cartItems.length, 'items');
            dispatch(setCart({ items: cartItems, isOpen: false }));
          } catch (backendError: any) {
            // Si es error 401/403, el token es inválido - hacer logout silencioso
            if (backendError.status === 401 || backendError.status === 403) {
              console.warn('Token inválido, haciendo logout silencioso');
              authService.logout();
              // Cargar del localStorage como usuario no autenticado
              const raw = localStorage.getItem(STORAGE_KEY);
              if (raw) {
                try {
                  const parsed = JSON.parse(raw);
                  if (parsed && Array.isArray(parsed.items)) {
                    dispatch(setCart(parsed));
                  } else if (Array.isArray(parsed)) {
                    dispatch(setCart({ items: parsed, isOpen: false }));
                  }
                } catch {
                  dispatch(setCart({ items: [], isOpen: false }));
                }
              } else {
                dispatch(setCart({ items: [], isOpen: false }));
              }
            } else {
              // Otro tipo de error - usar localStorage
              console.warn('Error loading cart from backend, using localStorage:', backendError);
              const raw = localStorage.getItem(STORAGE_KEY);
              if (raw) {
                try {
                  const parsed = JSON.parse(raw);
                  if (parsed && Array.isArray(parsed.items)) {
                    dispatch(setCart(parsed));
                  } else if (Array.isArray(parsed)) {
                    dispatch(setCart({ items: parsed, isOpen: false }));
                  }
                } catch {
                  /* ignore */
                }
              }
            }
          }
        } else {
          // Usuario no autenticado: cargar del localStorage
          console.log('User not authenticated, loading cart from localStorage');
          const raw = localStorage.getItem(STORAGE_KEY);
          if (raw) {
            try {
              const parsed = JSON.parse(raw);
              // Asegurarse de que parsed tenga la estructura correcta
              if (parsed && Array.isArray(parsed.items)) {
                dispatch(setCart(parsed));
              } else if (Array.isArray(parsed)) {
                dispatch(setCart({ items: parsed, isOpen: false }));
              }
            } catch {
              /* ignore */
            }
          }
        }
      } catch (error) {
        console.error('General error loading cart:', error);
      }
    };

    // Cargar inicialmente
    loadCart();

    // Escuchar evento personalizado de login
    const handleLoginEvent = () => {
      console.log('Evento de login detectado, recargando carrito...');
      loadCart();
    };

    // Escuchar evento de logout
    const handleLogoutEvent = () => {
      console.log('Evento de logout detectado, vaciando carrito...');
      dispatch(setCart({ items: [], isOpen: false }));
      localStorage.removeItem(STORAGE_KEY);
    };

    window.addEventListener('user-logged-in', handleLoginEvent);
    window.addEventListener('user-logged-out', handleLogoutEvent);

    return () => {
      window.removeEventListener('user-logged-in', handleLoginEvent);
      window.removeEventListener('user-logged-out', handleLogoutEvent);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, pathname]);

  // Guardar en localStorage y sincronizar con backend si está autenticado
  useEffect(() => {
    if (typeof window === "undefined") return;
    
    // No guardar carrito en rutas de admin
    if (pathname?.startsWith('/admin')) {
      return;
    }
    
    const saveCart = async () => {
      try {
        // Siempre guardar en localStorage
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));

        // Si está autenticado, también sincronizar con backend
        if (authService.isAuthenticated() && cart.items && cart.items.length > 0) {
          // Por ahora solo guardamos en localStorage
          // La sincronización completa con backend se hará cuando agreguen productos
        }
      } catch {
        /* noop */
      }
    };

    saveCart();
  }, [cart, pathname]);
}