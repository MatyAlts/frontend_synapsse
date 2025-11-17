import { CartItem } from "@/redux/types"
import { useState } from "react"
import { Loader2, Check, X, Tag } from "lucide-react"
import { couponService } from "@/services/couponService"

interface OrderSummaryProps{
    items: CartItem[]
    onCouponApplied?: (discount: number, code: string) => void
}

export default function OrderSummary({items, onCouponApplied}: OrderSummaryProps){
    const [couponCode, setCouponCode] = useState("");
    const [couponStatus, setCouponStatus] = useState<'idle' | 'loading' | 'valid' | 'invalid'>('idle');
    const [couponMessage, setCouponMessage] = useState("");
    const [appliedCoupon, setAppliedCoupon] = useState<{code: string, discount: number} | null>(null);

    const total = items.reduce((sum, item) => {
        return sum + (parseFloat(item.product.price) * item.quantity);
    }, 0);

    const shipping = 0;
    const discount = appliedCoupon ? (total * appliedCoupon.discount / 100) : 0;
    const finalTotal = total + shipping - discount;

    const handleApplyCoupon = async () => {
        if (!couponCode.trim()) return;
        
        setCouponStatus('loading');
        try {
            const response = await couponService.validateCoupon(couponCode.trim().toUpperCase());
            
            // Verificar que el cupón sea válido y tenga un código
            if (response.code && response.message.includes("válido") && response.discountPercentage > 0) {
                setCouponStatus('valid');
                setCouponMessage(response.message);
                setAppliedCoupon({code: couponCode.trim().toUpperCase(), discount: response.discountPercentage});
                
                // Notificar al componente padre
                if (onCouponApplied) {
                    onCouponApplied(response.discountPercentage, couponCode.trim().toUpperCase());
                }
            } else {
                setCouponStatus('invalid');
                setCouponMessage(response.message || "Cupón no válido");
                setAppliedCoupon(null);
                
                // Notificar al componente padre que se removió el cupón
                if (onCouponApplied) {
                    onCouponApplied(0, "");
                }
            }
        } catch (error: any) {
            setCouponStatus('invalid');
            setCouponMessage(error.message || "Error al validar el cupón");
            setAppliedCoupon(null);
            
            // Notificar al componente padre que se removió el cupón
            if (onCouponApplied) {
                onCouponApplied(0, "");
            }
        }
    };

    const handleRemoveCoupon = () => {
        setCouponCode("");
        setCouponStatus('idle');
        setCouponMessage("");
        setAppliedCoupon(null);
        if (onCouponApplied) {
            onCouponApplied(0, "");
        }
    };
    return(
        <div className=" rounded-3xl shadow-sm border border-green-100 p-8 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-light text-gray-800">Resumen de compra</h2>
            <div className="text-right">
              <p className="text-sm text-gray-500">Total</p>
              <p className="text-3xl font-light text-green-700">${finalTotal.toFixed(2)}</p>
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
                    <p className="text-sm text-gray-500">${parseFloat(item.product.price).toFixed(2)} c/u</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">x{item.quantity}</p>
                    <p className="font-semibold text-gray-800">${(parseFloat(item.product.price) * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="space-y-4">
              {/* Input de cupón */}
              <div className="p-4 rounded-2xl bg-white border-2 border-green-100">
                <div className="flex items-center gap-2 mb-3">
                  <Tag className="w-4 h-4 text-green-600" />
                  <span className="text-sm font-medium text-gray-700">¿Tenés un cupón?</span>
                </div>
                
                {!appliedCoupon ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="CODIGO123"
                      disabled={couponStatus === 'loading'}
                      className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none disabled:opacity-50 uppercase"
                      maxLength={9}
                    />
                    <button
                      onClick={handleApplyCoupon}
                      disabled={couponStatus === 'loading' || !couponCode.trim()}
                      className="px-4 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                    >
                      {couponStatus === 'loading' ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        'Aplicar'
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-medium text-green-700">{appliedCoupon.code}</span>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      className="text-red-600 hover:text-red-700 text-sm"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
                
                {couponStatus === 'valid' && (
                  <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
                    <Check className="w-3 h-3" />
                    {couponMessage}
                  </p>
                )}
                {couponStatus === 'invalid' && (
                  <p className="text-xs text-red-600 mt-2 flex items-center gap-1">
                    <X className="w-3 h-3" />
                    {couponMessage}
                  </p>
                )}
              </div>

              <div className="p-6 rounded-2xl bg-gradient-to-br from-green-50 to-green-100/50">
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">${total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Envío</span>
                    <span className="font-medium">${shipping.toFixed(2)}</span>
                  </div>
                  {appliedCoupon && discount > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-green-600">Descuento ({appliedCoupon.discount}%)</span>
                      <span className="font-medium text-green-600">-${discount.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="border-t border-green-200 pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-800">Total</span>
                      <span className="text-2xl font-semibold text-green-700">${finalTotal.toFixed(2)}</span>
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