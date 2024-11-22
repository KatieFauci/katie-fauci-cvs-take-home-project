"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fetchDiscoverMovieData_1 = require("./services/fetchDiscoverMovieData");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.set("json spaces", 4);
app.get("/", (req, res) => {
    res.send("Hello World");
});
app.get("/MoviesByYear", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const year = req.query.year;
    try {
        const movieData = yield (0, fetchDiscoverMovieData_1.fetchMovieData)(Number(year));
        res.json(movieData);
    }
    catch (error) {
        console.error("Error Fetching Movies By Year:", error);
        res.status(500).json({ error: "An error occured while fetching the movie details" });
    }
}));
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
