
import Link from "next/link";
import { FlipWords } from "../ui/FlipWords";

export default function InfoSection(){
    const words = ["radiante", "luminoso", "suave", "saludable", "natural"];
    return(
        
        <div className="flex flex-col justify-center gap-3 md:gap-5 p-3 md:p-5 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-xs bg-opacity-0 ">
            
            <p className="text-sm md:text-base text-[#535657]">Crema facial de células madre vegetales de arroz</p>
            
            <h2 className="text-3xl md:text-4xl lg:text-6xl text-[#2f3031]">Un despertar 
                <span className="italic ">
                    <FlipWords words={words} /> 
                    <br />
                </span> para tu piel
            </h2>
            
            <p className="text-sm md:text-base text-[#535657]">Con cada uso, la suavidad y el brillo natural de tu piel se intensifican, reflejando la alegría y serenidad que llevas dentro.</p>
            
            <div className="flex flex-col sm:flex-row gap-3 md:gap-5 items-center">
                <Link href="/shop" >
                    <button className="bg-lime-300 text-[#2f3031] rounded-full shadow-lg py-3 px-6 text-lg md:text-xl font-light cursor-pointer hover:scale-110 transition-all duration-300 w-full sm:w-auto">
                        Comprar
                    </button>
                </Link>
                
                
                <div className="flex flex-col text-center sm:text-left">
                    <p className="text-xl md:text-2xl text-[#2f3031]">$34</p>
                    <p className="text-xs text-[#535657]">por unidad</p>
                </div>
            </div>

        </div>
        
    )
}