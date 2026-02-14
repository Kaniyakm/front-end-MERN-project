/* ============================================================
   PHASE 3-4: NAVBAR COMPONENT
   ============================================================ */

import { useState } from "react";
import { FaBars } from "react-icons/fa";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="bg-primary text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-lg">Balance Blueprint</h1>

        <button
          onClick={() => setOpen(!open)}
          className="md:hidden transition-transform duration-300 hover:scale-110"
        >
          <FaBars />
        </button>

        <div className="hidden md:flex gap-6">
          <a className="hover:text-accent transition">Dashboard</a>
          <a className="hover:text-accent transition">Projects</a>
        </div>
      </div>

      {open && (
        <div className="mt-4 flex flex-col gap-4 md:hidden animate-slideDown">
          <a>Dashboard</a>
          <a>Projects</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
