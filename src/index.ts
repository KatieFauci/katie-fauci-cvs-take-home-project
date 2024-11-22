import express, { Request, Response } from "express";
import { fetchMovieData } from "./services/fetchDiscoverMovieData";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.set("json spaces", 4);

interface Output {
    title: string;
    release_date: string;
    vote_average: string;
    editors?: string[];
}


app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});


app.get("/MoviesByYear", async (req: Request, res: Response) => {
    
    // If year is not passed in returns the current year movie data (functionality of the original API)
    const year = req.query.year;

    try {
        const movieData = await fetchMovieData(Number(year));
        res.json(movieData);
    } catch (error) {
        console.error("Error Fetching Movies By Year:", error);
        res.status(500).json({error: "An error occured while fetching the movie details"})
    }
});


/*
app.get("/MoviesByYear", async (req: Request, res: Response) => {
    
    const year = req.query.year;

    // Check if year value supplied is valid
    if (!year) {
        return res.status(400).json({ error: "A valid year must be supplied (format: YYYY)"});
    }
    if (isNaN(Number(year))) {
        return res.status(400).json({ error: "A valid year must be supplied (format: YYYY)"});
    }
    
    try {
        const movieData = await fetchMovieData(Number(year));
        res.json(movieData);
    } catch (error) {
        console.error("Error Fetching Movies By Year:", error);
        res.status(500).json({error: "An error occured while fetching the movie details"})
    }
});
*/

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});