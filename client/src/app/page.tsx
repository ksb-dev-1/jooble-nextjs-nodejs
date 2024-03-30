// components
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <section className="min-h-[calc(100vh-4rem)]">
      <div className="hidden sm:block w-full bg-[var(--blue-2)] px-4 pt-[6rem] pb-8 lg:pt-[8rem] lg:p-16 text-white">
        <Hero />
      </div>
      <div className="max-w-[1100px] w-[100%] mx-auto">Home</div>
    </section>
  );
}
