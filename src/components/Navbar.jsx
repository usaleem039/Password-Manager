// eslint-disable-next-line no-unused-vars
import React from "react";

const Navbar = () => {
  return (
    <div>
      <nav className="bg-purple-800 flex justify-between items-center h-12 px-4 text-white">
        <div className="flex  logo font-bold pl-10">
          <span><img className="invert" src="src\icons\logo.svg" alt="" /></span>
          <span className="text-white">&lt;</span> Pass
          <span className="text-white"></span>Keeper{" "}
          <span className="text-white">&gt;</span>
        </div>
        {/* <ul>
          <li className="flex px-2 gap-4">
            <a className="hover:font-bold" href="/">
              Home
            </a>
            <a className="hover:font-bold" href="/">
              About Us
            </a>
            <a className="hover:font-bold" href="/">
              Contact Us
            </a>
          </li>
        </ul> */}

      {/* <div className="flex mr-16">
        <button className="flex gap-2 text-center items-center px-2"> <img className="w-10 invert" src="src\icons\github.svg" alt="github logo" />GITHUB</button>
      </div> */}

      </nav>
    </div>
  );
};

export default Navbar;
