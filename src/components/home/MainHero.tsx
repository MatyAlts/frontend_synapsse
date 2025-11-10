import Image from "next/image"
import Card from "./Card"
import CardSection from "./CardsSection"
import Link from "next/link"
import { FlipWords } from "../ui/FlipWords";
import PropertyGroup from "../generics/PropertyGroup";
import InfoSection from "./InfoSection";

export default function MainHero(){
    const words = ["radiante", "luminoso", "suave", "saludable", "natural"];
    return(
        <div className="bg-white">
            <div className="grid grid-cols-1 lg:grid-cols-2 mx-4 md:mx-10 mt-10 bg-white gap-6">
                {/* Column 1: Info */}
                <div className="flex flex-col md:flex-row items-center justify-center bg-gradient-to-r from-gray-300 to-white shadow-3xl rounded-3xl md:rounded-full p-4 md:p-0">
                    
                    <InfoSection />
                    <div className="mt-4 md:mt-0">
                        <Image src="/main-product.png" alt="" className="w-[30%] lg:w-full md:w-[90%] mx-auto" width={400} height={400}  />
                    </div>

                </div>
                
                {/* Column 2 */}
                <div className="flex flex-col relative">
                    
                    {/* Cards */}
                    <div className="hidden lg:block">
                        <CardSection />
                    </div>

                    {/* Properties */}
                    <div className="lg:absolute -bottom-15 self-start w-full lg:w-[43%] mb-6 lg:mb-0 ">
                        <PropertyGroup img="/hidratacion-icon.png" text="Hidratación Profunda" img2="/plus-sign.svg"/>
                        <PropertyGroup img="/regeneracion-icon.png" text="Regeneración y Equilibrio" img2="/plus-sign.svg"/>
                        <PropertyGroup img="/antiarrugas-icon.png" text="Efecto Antiarrugas" img2="/plus-sign.svg"/>
                    </div>

                    {/* Go shop button */}
                    <div className="lg:absolute -bottom-15 self-center lg:self-end w-[60%] lg:w-auto">
                        <Link href="/shop"
                            className="relative bg-[#839EA7] text-white font-light text-[17px] px-4 py-[0.35em] pl-5 h-[2.8em] rounded-[0.9em] flex items-center overflow-hidden cursor-pointer shadow-[inset_0_0_1.6em_-0.6em_#714da6] group"
                        >
                            <span className="mr-10">Ir a la Tienda</span>
                            <div className="absolute right-[0.3em] bg-white h-[2.2em] w-[2.2em] rounded-[0.7em] flex items-center justify-center transition-all duration-300 group-hover:w-[calc(100%-0.6em)] shadow-[0.1em_0.1em_0.6em_0.2em_#7b52b9] active:scale-95" >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    width="24"
                                    height="24"
                                    className="w-[1.1em] transition-transform duration-300 text-[#7b52b9] group-hover:translate-x-[0.1em]"
                                >
                                    <path fill="none" d="M0 0h24v24H0z"></path>
                                    <path
                                        fill="currentColor"
                                        d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                    ></path>
                                </svg>
                            </div>
                        </Link>

                    </div>

                </div>
                
            </div>
        </div>
    )
}