"use client";
import { Provider } from "react-redux";
import { ReactNode } from "react";
import { store } from "@/redux/store";
import { useCartPersist } from "@/redux/hooks/useCartPersists";

function CartPersister({ children }: { children: ReactNode }) {
  useCartPersist(); // se ejecuta dentro del Provider
  return <>{children}</>;
}

export default function ReduxProvider({ children }: { children: ReactNode }) {
  return (
    <Provider store={store}>
      <CartPersister>{children}</CartPersister>
    </Provider>
  );
}
