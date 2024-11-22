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
exports.fetchMovieData = void 0;
const axios_1 = __importDefault(require("axios"));
const dotenv_1 = __importDefault(require("dotenv"));
const fetchMovieCreditData_1 = require("./fetchMovieCreditData");
dotenv_1.default.config();
// Get movie DB info
const fetchMovieData = (year) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(`https://api.themoviedb.org/3/discover/movie?language=en-US&page=1&primary_release_year=${year}&sort_by=popularity.desc`, {
            headers: {
                "Authorization": `Bearer ${process.env.API_READ_ACCESS_TOKEN}`,
                "Cache-Control": "no-cache",
                Pragma: "no-cache",
            }
        });
        // Extract Required Data
        const extractedData = yield Promise.all(response.data.results.map((movie) => __awaiter(void 0, void 0, void 0, function* () {
            const editors = yield (0, fetchMovieCreditData_1.fetchMovieEditors)(movie.id);
            const movieData = {
                title: movie.title,
                release_date: movie.release_date,
                vote_average: movie.vote_average,
            };
            // Include the editor field if it is not empty
            if (editors.length > 0) {
                movieData.editors = editors;
            }
            return movieData;
        })));
        return extractedData;
    }
    catch (error) {
        console.error("Error fetching the movie data", error);
        throw new Error("Failed to fetch movie data");
    }
});
exports.fetchMovieData = fetchMovieData;
