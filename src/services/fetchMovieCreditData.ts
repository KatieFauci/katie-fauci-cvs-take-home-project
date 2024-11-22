import axios from "axios"
import dotenv from "dotenv";

dotenv.config();

interface CrewMember {
    name: string;
    known_for_department: string;
}

export const fetchMovieEditors = async (id: number) => {

    try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
            headers: {
                "Authorization": `Bearer ${process.env.API_READ_ACCESS_TOKEN}`
            }
        });

        const editors = response.data.crew
            .filter((thisCrew: CrewMember) => thisCrew.known_for_department === "Editing")
            .map((thisCrew: CrewMember) => thisCrew.name);
        
        return editors;

    } catch (error) {
        console.error("Error fetching the credit data", error);
        return[];
    }
}