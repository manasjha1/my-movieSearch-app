import { env } from "./env";

// const API_URLS = {
//   MOVIES: {
//     GET_POPULAR_MOVIES: `${env.BASE_URL}//movie/popular?api_key=${env.API_KEY}`,
//   },
// };

// export default API_URLS;
// call the all api's at one place and then use it in their pages.
// 
//  const getMovies = async () => {
//     try {
//       setLoading(true);
//       const response = await fetch(
//         `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`,
//         // `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
//       );
//       console.log("movies data", response);

//       const data = await response.json();
//       setMovies(data);
//     } catch (error) {
//       console.log(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getMovies();
//   }, []);
