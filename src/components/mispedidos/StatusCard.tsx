import { Package, Truck, CheckCircle } from "lucide-react";

interface StatusCardProps{
    text: string,
    total: number,
    icon: string,
}
export default function StatusCard({text, total, icon}: StatusCardProps){

    return(
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-green-100 p-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                {icon == "Package" ?(
                    <Package className="text-green-600" size={24} />
                ): icon == "Truck"?(
                    <Truck className="text-blue-600" size={24} />
                ):
                    <CheckCircle className="text-green-600" size={24} />
                }
                
              </div>
              <div>
                <p className="text-2xl font-semibold text-gray-800">{total}</p>
                <p className="text-sm text-gray-500">{text}</p>
              </div>
            </div>
        </div>
    )
}