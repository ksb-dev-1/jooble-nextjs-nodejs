// components
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <section className="min-h-[calc(100vh-4rem)]">
      <div className="hidden sm:block w-full bg-[var(--blue-2)] pt-[6rem] lg:pt-[6rem] text-white p-4 lg:p-8">
        <Hero />
      </div>
      <div className="max-w-[1100px] w-[100%] mx-auto">Home</div>
    </section>
  );
}
