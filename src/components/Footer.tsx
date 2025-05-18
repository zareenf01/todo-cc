import React from "react";
import { Github, Linkedin, Twitter } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="py-4 px-6 bg-white/50 backdrop-blur-sm border-t border-pink-100">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <p className="text-pink-500 font-medium mb-2">Made with ❤️ by Zareen</p>
        <div className="flex gap-4">
          <a
            href="https://github.com/zareenf01"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-pink-500 transition-colors"
          >
            <Github size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/zareen-fatima-476110244/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-pink-500 transition-colors"
          >
            <Linkedin size={20} />
          </a>
          <a
            href="https://twitter.com/ZareenFatima01"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-600 hover:text-pink-500 transition-colors"
          >
            <Twitter size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
