import { useState } from "react";
import { Search, Star, X } from "react-feather";

function App() {
  const [showSearch, setShowSearch] = useState<boolean>(false)
  return (
    <div className="w-full min-h-screen bg-gradient-to-tr from-sky-950 via-sky-900 to-sky-800 p-10 space-y-8">
      <div className="flex justify-between items-center gap-3">
        <div className="text-3xl text-white font-bold">
          Browse Movies
        </div>
        {showSearch ? (
          <form className="inline-flex items-center gap-3">
            <input
              type="text"
              className="w-full rounded-full px-5 py-2 bg-transparent border-white border-2 text-white"
              placeholder="Search movie..."
            />
            <X 
              className="w-8 text-white cursor-pointer"
              onClick={() => setShowSearch(false)}
            />
          </form>
        ) : (
          <Search 
            className="w-8 text-white cursor-pointer"
            onClick={() => setShowSearch(true)}
          />
        )}
      </div>
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {[1,2,3,4,5].map(v => (
          <div className="w-full group cursor-pointer shadow-xl relative rounded-lg overflow-hidden transition-all duration-300 scale-[.98] hover:scale-100">
            <img
              alt=""
              loading="lazy"
              src="https://www.themoviedb.org/t/p/w440_and_h660_face/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg"
              className="w-full aspect-[9/12] object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/10 flex flex-col justify-between p-4">
              <div className="w-fit inline-flex shadow-lg items-center gap-1 bg-red-600 rounded-md px-2 py-1 text-white text-sm font-semibold">
                <Star className="w-3"/>
                9.0
              </div>
              <div className="w-full space-y-2">
                <h2 className="text-white text-lg font-semibold leading-6">Spider-Man Across the Spider-Verse</h2>
                <p className="text-white text-xs transition-all ease-in-out duration-300 w-full max-h-0 group-hover:max-h-16 overflow-hidden line-clamp-4">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni vel perferendis sapiente ullam, debitis possimus impedit ut totam maiores doloremque ea, sit repellat beatae tempore consequatur provident! Deserunt, officiis tenetur.
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <button 
          type="button"
          className="w-fit px-5 py-2 rounded-full border-2 border-red-500 text-red-500 font-semibold transition-all hover:bg-red-500 hover:text-white"
        >
          Load More
        </button>
      </div>
    </div>
  );
}

export default App;
