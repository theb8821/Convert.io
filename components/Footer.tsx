import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full py-6 mt-auto text-center">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-1.5 text-sm text-default-400">
        <p className="flex items-center gap-1.5 flex-wrap justify-center">
          <span>&copy; 2026 Convert.io</span>
          <span className="text-default-300 dark:text-default-600 hidden sm:inline">&bull;</span>
          <span>Crafted with</span>
          <Heart size={14} className="text-danger fill-danger inline-block animate-pulse" />
          <span>by</span>
          <a
            href="https://github.com/theb8821"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-default-600 hover:text-primary transition-colors underline-offset-4 hover:underline"
          >
            theb8821
          </a>
        </p>
      </div>
    </footer>
  );
}
