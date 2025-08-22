import React, { useState } from "react";

const Header = () => {
    const [theme, setTheme] = useState("dark")
  return (
    <header className="px-4 py-5 border-b-1 border-[#f9e866] mb-5">
      <div className="flex flex-row justify-between">
        <div className="flex items-center gap-3">
          <div className="size-6 text-[#f9e006]">
            <svg
              fill="currentColor"
              viewBox="0 0 48 48"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M24 4C25.7818 14.2173 33.7827 22.2182 44 24C33.7827 25.7818 25.7818 33.7827 24 44C22.2182 33.7827 14.2173 25.7818 4 24C14.2173 22.2182 22.2182 14.2173 24 4Z"></path>
            </svg>
          </div>
          <div className="text-xl font-bold">LinkShrink</div>
        </div>
        {/* <div className="">change theme</div> */}
      </div>
    </header>
  );
};

export default Header;
