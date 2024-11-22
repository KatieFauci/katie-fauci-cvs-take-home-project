import axios from "axios"
import dotenv from "dotenv";

dotenv.config();

interface CrewMember {
    name: string;
    known_for_department: string;
}

export const fetchMovieEditors = async (id: number) => {

    try {
        // Get all credits from api
        const response = await axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
            headers: {
                "Authorization": `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
                "Cache-Control": "no-cache",
            }
        });

        // Filter for just editors
        const editors = response.data.crew
            .filter((thisCrew: CrewMember) => thisCrew.known_for_department === "Editing")
            .map((thisCrew: CrewMember) => thisCrew.name);
        
        return editors;

    } catch (error) {
        // If the call for the credit information fails, pass a empty array
        //console.error("Error fetching the credit data", error);
        return[];
    }
}