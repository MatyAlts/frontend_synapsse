import { CartItem } from "@/redux/types"

interface OrderSummaryProps{
    items: CartItem[]
}
export default function OrderSummary({items}: OrderSummaryProps){
    const total = items.reduce((sum, item) => {
        return sum + (parseFloat(item.product.price) * item.quantity);
    }, 0);

    const shipping = 0;
    const finalTotal = total + shipping;
    return(
        <div className=" rounded-3xl shadow-sm border border-green-100 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-light text-gray-800">Resumen de compra</h2>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-3xl font-light text-green-700">${finalTotal}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-3">
              {items.map(item => (
                <div key={item.product.id} className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-green-50 to-transparent">
                  <img
                    src={item.product.img}
                    alt="Producto"
                    width={60}
                    height={60}
                    className="rounded-lg"
                />
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.product.title}</p>
                    <p className="text-sm text-gray-500">${item.product.price} c/u</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">x{item.quantity}</p>
                    <p className="font-semibold text-gray-800">${parseFloat(item.product.price) * item.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100/50">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${total}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Envío</span>
                    <span className="font-medium">${shipping}</span>
                  </div>
                  <div className="border-t border-green-200 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">Total</span>
                      <span className="text-2xl font-semibold text-green-700">${finalTotal}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="text-center p-3 bg-green-50 rounded-xl">
                <p className="text-xs text-green-800">🌿 Envío sustentable</p>
              </div>
            </div>
          </div>
        </div>
    )
}