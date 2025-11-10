import { FlipWords } from "../ui/FlipWords";

export default function CTA() {
  const words=[
    "inversión",
      "reflejo",
      "cuidado",
      "tesoro",
      "prioridad",
      "aliada",
      "belleza",
      "fortaleza",
      "secreto",
      "ritual"
  ]
  return (
    <section>
      {/* Overlay */}
      <div className="absolute inset-0"></div>
      <div className="relative w-full md:w-[85%] lg:w-[75%] mx-auto">
        <div className="px-4 md:px-8">
          <h2 className="text-2xl md:text-4xl lg:text-5xl font-thin text-[#2f3031] text-center">
            Tu piel, tu mayor {" "}
            <span className="">
              <FlipWords words={words} className="text-[#2f3031]" />
            </span>
            
          </h2>

          <p className="hidden md:mt-4 md:block text-md text-[#535657] font-light text-justify">
            Cada producto Synapsse combina innovación y pureza para acompañarte
            en tu rutina diaria. El futuro del cuidado de la piel empieza acá.
          </p>
        </div>
      </div>
    </section>
  );
}
