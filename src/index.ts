import express, { Request, Response } from "express";
import { fetchMovieData } from "./services/fetchDiscoverMovieData";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.set("json spaces", 4);


app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});


app.get("/MoviesByYear", async (req: Request, res: Response) => {
    
    // If year is not passed in returns the current year movie data (functionality of the original API)
    const year = req.query.year;

    try {
        // Get movie data
        const movieData = await fetchMovieData(Number(year));

        if (movieData === 0){
            res.status(500).json({error: "An error occured while fetching the movie details"})
        }
        else {
            res.json(movieData);
        }

    } catch (error) {
        console.error("Error Fetching Movies By Year:", error);
        res.status(500).json({error: "An error occured while fetching the movie details"})
    }
});


app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}`);
});