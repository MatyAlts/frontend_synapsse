interface CoolButtonProps {
  text: string;
  onClick?: ()=>void;
  className?: string;
  disabled?: boolean;
}
export default function CustomButton({ text, onClick, className, disabled }: CoolButtonProps) {
    const baseClasses = " text-sm px-2 py-1 text-[#2f3031] rounded-full shadow-lg font-light cursor-pointer hover:scale-110 transition-all duration-300";
  return (
    <button onClick={onClick} className={`${baseClasses} ${className}`} disabled={disabled}>
        {text}
    </button>
  );
}