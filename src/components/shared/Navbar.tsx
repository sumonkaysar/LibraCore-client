import { Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router";
import logo from "../../assets/logo/LibreCore.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const activeNav = ({ isActive }: { isActive: boolean }) =>
    `py-1 transition border-b ${
      isActive
        ? "text-[#5271FF] border-[#5271FF]"
        : "hover:text-[#5271FF] sm:border-transparent hover:border-[#5271FF]"
    }`;

  return (
    <nav className="border-b-1 border-[#5271FF] relative">
      <div className="flex justify-between items-center w-11/12 max-w-7xl mx-auto py-10">
        <div className="w-28">
          <img src={logo} alt="Libra Core" />
        </div>
        <div className="hidden sm:flex space-x-6 text-sm sm:text-base font-medium">
          <NavLink to="/" className={activeNav}>
            Home
          </NavLink>
          <NavLink to="/books" className={activeNav} end>
            All Books
          </NavLink>
          <NavLink to="/create-book" className={activeNav}>
            Add Book
          </NavLink>
          <NavLink to="/borrow-summary" className={activeNav}>
            Borrow Summary
          </NavLink>
        </div>
        <div className="sm:hidden">
          <button onClick={toggleMenu} className="cursor-pointer">
            {menuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>
      {menuOpen && (
        <div className="sm:hidden px-6 pb-4 space-y-2 text-base font-medium flex flex-col absolute right-0 bg-white w-3/4 z-10 shadow-2xl">
          <NavLink
            to="/"
            className={activeNav}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/books"
            className={activeNav}
            onClick={() => setMenuOpen(false)}
            end
          >
            All Books
          </NavLink>
          <NavLink
            to="/create-book"
            className={activeNav}
            onClick={() => setMenuOpen(false)}
          >
            Add Book
          </NavLink>
          <NavLink
            to="/borrow-summary"
            className={activeNav}
            onClick={() => setMenuOpen(false)}
          >
            Borrow Summary
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
