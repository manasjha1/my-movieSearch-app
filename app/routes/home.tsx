import { useEffect, useState } from "react";
// import { MovieSearch } from "./components/MovieSearch";
import { Dashboard } from "../components/Dashboard";
import { Footer } from "~/components/Footer";
import { Headers } from "~/components/Headers";
import { Calendar, Search } from "lucide-react";

interface MovieDetails {
  Title: string;
  Year: number;
  Plot: string;
  Poster: string;
  imdbRating: number;
  Genre: string;
}

let api_key = "eaca397b12af42ca89067ac3c10ff934";

function Home() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function searchMovie() {
      if (!query) {
        setLoading(true);
      }
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${api_key}`,
        );

        const data = await response.json();
        setMovies(data);
        console.log("movies detail", data);

        console.log(data);
      } catch (error) {
        console.log(error);
      }
    }
    searchMovie();
  }, []);

  return (
    <div className=" ">
      <Headers />
      {/* search section for small device */}
      <div className="flex justify-center items-center align-middle mx-auto w-full lg:hidden">
        <div className="flex justify-start align-middle w-[90%] mx-auto my-5 p-2 border border-indigo-400 rounded-3xl bg-gray-900 shadow-lg/90 mt-20">
          <Search className="mx-2 text-left text-xs text-indigo-600" />
          <input
            type="search"
            placeholder="search movies.."
            onKeyDown={(e) => e.key === "Enter"}
            value={query}
            className="text-gray-400 text-sm outline-none w-full"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        {/* <button className="text-white text-sm bg-indigo-600 hover:bg-indigo-700 py-2 px-3 mx-2 rounded-lg">Search</button> */}
      </div>

      <div className="w-full mx-auto p-2">
        { }

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 rounded-lg p-2 mt-2 lg:mt-20 mb-10">
          {!loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 rounded-lg p-2 mt-10 lg:mt-20">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="aspect-2/3 bg-gray-900 rounded-t-lg"></div>
                  <div className="bg-gray-950 p-4 rounded-b-lg space-y-3">
                    <div className="h-4 bg-gray-900 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-900 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            movies?.results?.map((movie: any) => (
              <ol key={movie.id}>
                <li className="bg-gray-900 rounded-lg p-2 shadow-lg/60 transition-transform duration-300 hover:scale-102 hover:shadow-lg/100 cursor-pointer">
                  <img
                    className="w-full h-full mb-3 object-cover"
                    src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <h1 className="text-white text-left text-xl font-medium mb-3">
                    {movie.title}
                  </h1>
                  <p className="text-left text-gray-500 text-sm font-normal mb-2 truncate">
                    {movie.overview}
                  </p>
                  <div className="flex items-center align-middle mb-3">
                    <Calendar className="text-xs text-gray-600 font-normal" />
                    <p className="text-left text-gray-600 text-sm font-normal mx-2">
                      {movie.release_date}
                    </p>
                    <img
                      className="w-4 h-4 rounded-full mx-2"
                      src="https://i.pinimg.com/1200x/ab/cc/1e/abcc1e445912566bd54bbe2fbe64ac00.jpg"
                      alt="rating star"
                    />
                    <span className="text-left text-gray-600 text-sm font-normal">
                      {movie.vote_average}
                    </span>
                  </div>
                </li>
              </ol>
            ))
          )}
        </div>
        <span className="text-left text-gray-500 text-sm font-medium">
          Showing page: {movies?.page} of pages: {movies?.total_pages}
        </span>
      </div>
      <div className=" bottom-0 w-full bg-gray-900">
        <Footer />
      </div>
    </div>
  );
}

export default Home;
