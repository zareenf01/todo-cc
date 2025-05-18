import React from "react";
import { ChevronLeft, LogIn, Search, Settings } from "lucide-react";

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b">
      <div className="flex items-center gap-4">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <ChevronLeft size={24} color="black" />
        </button>
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center w-8 h-8 bg-black rounded-lg">
            <span style={{ color: "white" }}>Z</span>
          </div>
          <div>
            <h1 className="text-base font-semibold">Zareen</h1>
            <p className="text-xs text-gray-500">5 boards · 24 members</p>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Search size={20} />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <LogIn size={24} />
        </button>
        <button className="p-2 rounded-full hover:bg-gray-100">
          <Settings />
        </button>
      </div>
    </header>
  );
};

export default Header;
