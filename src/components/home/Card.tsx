import Image from "next/image"
interface CardProps{
    text: string,
    img: string
    position: string
}
export default function Card({text, img, position}: CardProps){
    return(
        <div className={`relative ${position} shadow-xl rounded-full p-4 md:p-8 rotate-6 w-[100%] cursor-pointer hover:bg-gray-200 hover:-translate-x-18 transition-all duration-300 max-h-[180px] md:max-h-[220px]`}>
            <p className="text-center text-[#A7B8BB] font-light text-xl md:text-3xl">{text}</p>
            <img src={img} alt="" className="max-w-[160%]"/>
        </div>
    )
}