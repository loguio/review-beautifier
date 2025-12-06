import { Github, Linkedin } from 'lucide-react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-neutral-950">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-neutral-400">
            © {new Date().getFullYear()} Screenshot Studio. Tous droits réservés.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com/loguio"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-neutral-300 hover:text-white transition-colors group"
              aria-label="Visiter mon profil GitHub"
            >
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">GitHub</span>
            </Link>
            <Link
              href="https://www.linkedin.com/in/marius-bourse-52618a220/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-neutral-300 hover:text-blue-400 transition-colors group"
              aria-label="Visiter mon profil LinkedIn"
            >
              <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-medium">LinkedIn</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

