import { Suspense } from "react";
import Login from "@/components/login/Login";

export default function Page() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-screen">
        <div className="text-gray-500">Cargando...</div>
      </div>
    }>
      <Login />
    </Suspense>
  );
}
