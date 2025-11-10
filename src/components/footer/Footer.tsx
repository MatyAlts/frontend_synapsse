export default function Footer() {
  return (
    <section className=" bg-[url('/plant2.png')] bg-fit bg-center sticky bottom-0 -z-10">
      <div className="relative mx-auto max-w-screen-xl px-4 pt-8 sm:px-6 lg:px-8 lg:pt-24">

        <div className="lg:flex lg:items-end lg:justify-between">
          <div className="w-full">
            <div className="flex justify-center">
              <img src="/logo.png" alt="Synapsse" className="w-32 sm:w-40"/>
            </div>

            <p className="mx-auto mt-6 max-w-md text-center leading-relaxed text-[#535657] font-thin">
              La armonía entre naturaleza y tecnología en cada gota.
            </p>
          </div>
        </div>

        <div className="text-center text-xs text-[#535657] mt-8 pb-1 border-t border-[#E0E0E0] pt-4">
            © {new Date().getFullYear()} Synapsse. Todos los derechos reservados.
        </div>
      </div>
    </section>
  );
}

