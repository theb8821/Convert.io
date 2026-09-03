import {ThemeSwitcher} from "@/components/ThemeSwitcher";
import {ConversionCard} from "@/components/ConversionCard";
import {Footer} from "@/components/Footer";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col relative px-4 py-8 sm:px-8">
      <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-50">
        <ThemeSwitcher />
      </div>
      
      <div className="flex-1 flex flex-col items-center justify-center max-w-5xl mx-auto w-full pt-12 pb-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4 text-foreground">
            Convert anything.
          </h1>
          <p className="text-default-500 text-lg max-w-md mx-auto">
            A minimal, fast, and modern utility to convert units and currency instantly.
          </p>
        </div>
        
        <ConversionCard />
      </div>

      <Footer />
    </main>
  );
}
