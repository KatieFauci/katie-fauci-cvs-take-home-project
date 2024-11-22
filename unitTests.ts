import axios from "axios";
import { fetchMovieData } from "./src/services/fetchDiscoverMovieData";
import { fetchMovieEditors } from "./src/services/fetchMovieCreditData";


async function testFetchMovieData() {
    const results = await fetchMovieData(2019);
    if (results === 0){
        console.log("fetchMovieData -- FAIL")
    }
    else {
        const resultExists = results.some(result => 
            result.title === "Joker" && result.release_date === "2019-10-01" && result.vote_average == 8.1 && result.editors.length === 7
        );

        if (resultExists){
            console.log("fetchMovieData -- Pass");
        }
        else {
            console.log("fetchMovieData -- FAIL")
        }
    }
}

async function testFetchMovieEditors() {
    const results = await fetchMovieEditors(475557);
    if (results.length === 7){
        console.log("fetchMovieEditors -- Pass");
    }
    else {
        console.log("fetchMovieEditors -- FAIL")
    }
}

async function testCreditFails() {
    const results = await fetchMovieEditors(-1);
    if (results.length > 0){
        console.log("Credits Optional -- FAIL")
    }
    else {
        console.log("Credits Optional -- Pass")
    }
}

async function testEndpointStatus() {
    const results = await axios.get(`http://localhost:3000/MoviesByYear?year=2019`);
    if (results.status === 200){
        console.log("Endpoint Available -- Pass");
    }
    else {
        console.log("Endpoint Available -- FAIL");
    }
}

testFetchMovieData();
testFetchMovieEditors();
testCreditFails();

// Server must be running to pass
testEndpointStatus();