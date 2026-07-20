import { useEffect, useState } from "react"




const apiKey = "eaca397b12af42ca89067ac3c10ff934";

export default function RecentMovie() {
    const [popularMovie, setPopularMovie] = useState<any>([])
    const [loading, setLoading] = useState(false)

    const getPopularMovies = async () => {
        try {
            setLoading(true);
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}`,
                // `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
            );
            const data = await response.json();
            setPopularMovie(data);
            console.log("popular data -->", data);

        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getPopularMovies()
    }, [])
    return (
        <div>
            <h1>HEllo Madhvan</h1>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6 items-center justify-center mx-auto p-5">
                {loading && popularMovie?.results?.map((movie: any) => (
                    <div key={movie?.id}>
                        <li className="rounded-xs hover:scale-110 bg-gray-600">
                            <h1 className="text-white text-5xl">{movie.title}</h1>
                        </li>
                    </div>
                ))}
            </div>
        </div>
    )
}
