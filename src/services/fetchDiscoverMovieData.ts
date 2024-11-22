import axios from "axios"
import dotenv from "dotenv";
import { fetchMovieEditors } from "./fetchMovieCreditData";

dotenv.config();

interface Movie {
    id: number;
    title: string;
    release_date: string;
    vote_average: number;
}

// Get movie DB info
export const fetchMovieData = async (year: number) => {
    try{
        // Get all movie data for the specified year
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&primary_release_year=${year}&sort_by=popularity.desc`, {
            headers: {
                "Authorization": `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
                "Cache-Control": "no-cache",
            }
        });

        // Extract Required Data
        const extractedData = await Promise.all(response.data.results.map(async (movie: Movie) => {
            
            // Get editors for the current movie
            const editors = await fetchMovieEditors(movie.id);
        
            const movieData: Record<string, any> = {
                title: movie.title,
                release_date: movie.release_date,
                vote_average: movie.vote_average,
            };

            // Include the editor field if it is not empty
            if (editors.length > 0) {
                movieData.editors = editors;
            } 

            return movieData;
        }));

        return extractedData;

    } catch (error) {
        console.error("Error fetching the movie data", error);
        return 0
    }
};
