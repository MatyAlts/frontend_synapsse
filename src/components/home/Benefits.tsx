import { Droplet, Leaf, Sparkles } from "lucide-react";

export default function Benefits(){
    return(
        <section id="beneficios" className="pt-10 md:pt-20 py-10 md:py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-light mb-4 text-[#2f3031]">
              Beneficios <span className="italic font-serif text-green-600">naturales</span>
            </h2>
            <p className="text-sm md:text-base text-[#535657] max-w-2xl mx-auto">
              Descubre cómo nuestros productos transforman tu piel con ingredientes 100% naturales.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            <div className="group p-6 md:p-8 rounded-2xl bg-gradient-to-br from-blue-50 to-blue-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Droplet className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg md:text-xl font-medium mb-3 text-[#2f3031]">Hidratación Profunda</h3>
              <p className="text-sm md:text-base text-[#535657] leading-relaxed">
                Nutrición intensiva que penetra en las capas más profundas de la piel, 
                manteniéndola hidratada todo el día.
              </p>
            </div>

            <div className="group p-6 md:p-8 rounded-2xl bg-gradient-to-br from-green-50 to-green-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Leaf className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg md:text-xl font-medium mb-3 text-[#2f3031]">Regeneración y Equilibrio</h3>
              <p className="text-sm md:text-base text-[#535657] leading-relaxed">
                Las células madre vegetales estimulan la renovación celular natural, 
                devolviendo vitalidad y elasticidad a tu piel.
              </p>
            </div>

            <div className="group p-6 md:p-8 rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="w-16 h-16 bg-purple-200 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Sparkles className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg md:text-xl font-medium mb-3 text-[#2f3031]">Efecto Antiarrugas</h3>
              <p className="text-sm md:text-base text-[#535657] leading-relaxed">
                Reduce visiblemente las líneas de expresión y previene los signos del envejecimiento 
                de forma natural.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
}