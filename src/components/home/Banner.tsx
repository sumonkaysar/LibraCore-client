import { Button } from "@/components/ui/button";
import { Link } from "react-router";

const Banner = () => {
  return (
    <section className="flex justify-center items-center bg-gradient-to-r from-blue-100 via-blue-50 to-blue-200 py-20 px-4 text-center h-[700px]">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-4 text-blue-800">
          Welcome to LibraCore 📚
        </h1>
        <p className="sm:text-lg md:text-xl text-gray-700 mb-8 w-11/12 mx-auto">
          Manage your library with ease — add, view, borrow, and track books all
          in one place.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Button asChild>
            <Link to="/books">Browse Books</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/create-book">Add a Book</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Banner;
