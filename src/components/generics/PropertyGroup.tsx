import Image from "next/image";
interface PropertyGroupProps{
    img: string;
    text: string;
    img2?: string;
}
export default function PropertyGroup({img, text, img2}: PropertyGroupProps){
    return(
        <div className="flex items-center justify-between gap-3 mb-2 px-4 rounded-full bg-white/80 border border-green-100 shadow-sm">
            <Image src={img} width={28} height={28} alt={text ?? "icon"} />
            <p className="text-xs font-medium text-[#535657] text-center flex-1 px-1">{text}</p>
            {img2 ? (
                <Image src={img2} width={20} height={20} alt={`${text ?? "icon"}-extra`} className="px-1"/>
            ) : (
                <span className="w-5" />
            )}
        </div>
    )
}
