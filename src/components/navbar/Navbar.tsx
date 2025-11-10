"use client";

import { useState, useEffect } from "react";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Settings, LogOut, Menu, X } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { shoppingCartSelect } from "@/redux/cartSlice";
import { authService, type StoredUser } from "@/services/authService";
import { usePathname, useRouter } from "next/navigation";
import SideCart from "../shoppingcart/SideCart";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Tienda" },
  { href: "/categories", label: "Categorías" },
  { href: "/mis-pedidos", label: "Mis Pedidos" },
  { href: "/profile", label: "Mi Cuenta" },
];

export default function Navbar() {
  const shoppingCart = useSelector(shoppingCartSelect);
  const totalQuantity = shoppingCart?.items?.reduce((sum, it) => sum + it.quantity, 0) ?? 0;

  const [cartOpen, setCartOpen] = useState(false);
  const [user, setUser] = useState<StoredUser | null>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const syncUser = () => setUser(authService.getUser());
    syncUser();

    window.addEventListener("user-logged-in", syncUser);
    window.addEventListener("user-logged-out", syncUser);
    return () => {
      window.removeEventListener("user-logged-in", syncUser);
      window.removeEventListener("user-logged-out", syncUser);
    };
  }, []);

  useEffect(() => {
    setUser(authService.getUser());
  }, [pathname]);

  const handleLogout = () => {
    window.dispatchEvent(new Event("user-logged-out"));
    setTimeout(() => {
      authService.logout();
      setUser(null);
      setShowUserMenu(false);
      setIsMobileMenuOpen(false);
      router.push("/");
    }, 100);
  };

  const renderUserButton = () => {
    if (!user) {
      return (
        <Link href="/login">
          <button className="text-[#2f3031] border border-gray-200 rounded-full font-light shadow-lg py-2 px-4 cursor-pointer hover:scale-105 transition-all duration-300">
            Iniciar Sesión
          </button>
        </Link>
      );
    }

    return (
      <div className="relative">
        <button
          onClick={() => setShowUserMenu((prev) => !prev)}
          className="text-[#2f3031] border border-gray-200 rounded-full font-light shadow-lg py-2 px-4 cursor-pointer hover:scale-105 transition-all duration-300"
        >
          {user.firstName ? user.firstName : user.email.split("@")[0]}
        </button>
        {showUserMenu && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 z-50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 transition"
            >
              <LogOut size={16} />
              Cerrar Sesión
            </button>
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <nav className="sticky top-2 z-20 px-3 mb-5">
        <div className="mx-auto max-w-6xl rounded-full border border-white/40 bg-white/70 backdrop-blur-md shadow-lg px-4 sm:px-6 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center justify-between gap-4 sm:gap-10 px-4">
            
            <img src="/logo.png" alt="Synapsse" className=" w-[70%] lg:w-[15%]" />
            
            <div className="hidden lg:flex items-center gap-8 text-[#5d6a6f]">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="cursor-pointer hover:scale-105 transition-all duration-300"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 sm:gap-4">
            {user?.isAdmin && (
              <Link href="/admin" className="hidden sm:block">
                <button className="flex items-center gap-2 text-white bg-green-600 rounded-full font-light shadow-lg py-2 px-4 cursor-pointer hover:scale-105 transition-all duration-300">
                  <Settings size={18} />
                  Admin
                </button>
              </Link>
            )}

            <div className="hidden sm:block">{renderUserButton()}</div>

            <button
              type="button"
              className="relative cursor-pointer hover:scale-110 transition-transform duration-300"
              onClick={() => setCartOpen(true)}
              aria-label="Abrir carrito"
            >
              {totalQuantity > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 bg-green-600 rounded-full text-white text-xs flex items-center justify-center font-medium">
                  {totalQuantity}
                </span>
              )}
              <HiOutlineShoppingBag size={26} color="#2f3031" />
            </button>

            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 text-[#2f3031] lg:hidden"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label="Abrir menú"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="mx-auto mt-2 max-w-6xl rounded-3xl border border-white/40 bg-white/80 backdrop-blur-md shadow-lg px-4 py-6 lg:hidden">
            <div className="flex flex-col gap-4 text-[#5d6a6f]">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="cursor-pointer rounded-xl px-3 py-2 hover:bg-green-100/60 transition"
                >
                  {link.label}
                </Link>
              ))}

              {user?.isAdmin && (
                <Link
                  href="/admin"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 rounded-xl px-3 py-2 text-green-700 hover:bg-green-100/60 transition"
                >
                  <Settings size={18} />
                  Panel Admin
                </Link>
              )}

              <div className="sm:hidden">
                {user ? (
                  <button
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-red-600 hover:bg-red-100/60 transition duration-300 cursor-pointer"
                  >
                    <LogOut size={16} />
                    Cerrar Sesión
                  </button>
                ) : (
                  <Link
                    href="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block rounded-xl px-3 py-2 text-[#2f3031] hover:bg-green-100/60 text-center transition"
                  >
                    Iniciar Sesión
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      <SideCart items={shoppingCart.items ?? []} isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}
