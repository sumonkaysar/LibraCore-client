import { Link } from "react-router";
import logo from "../../assets/logo/LibreCore.png";

const Footer = () => {
  return (
    <footer className="bg-slate-200 py-16 mt-10">
      <div className="md:flex justify-between items-center w-11/12 max-w-7xl mx-auto text-center space-y-2">
        <div className="space-x-4 text-sm">
          <Link to="/books" className="hover:underline">
            All Books
          </Link>
          <Link to="/create-book" className="hover:underline">
            Add Book
          </Link>
          <Link to="/borrow-summary" className="hover:underline">
            Borrow Summary
          </Link>
        </div>
        <div className="m-0">
          <div className="w-28 mx-auto">
            <img src={logo} alt="Libre Core" />
          </div>
          <p className="text-sm mt-3 mb-1">
            LibraCore &copy; {new Date().getFullYear()}.
          </p>
          <p className="text-sm m-0">All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
