require('dotenv').config()
import api = require('../../api');
import rewire = require('rewire');

(async () => {

    // a should define the required properties
    function deepCheck(objectA: any, objectB: any): boolean {
        let a = objectA;
        let b = objectB;
        let isString: boolean = (typeof a === "string" && typeof b === "string");
        let isBool: boolean = (typeof a === "boolean" && typeof b === "boolean");
        let isNumber: boolean = (typeof a === "number" && typeof b === "number");

        if (a instanceof Array && b instanceof Array) {
            for (let i = 0; i < a.length; i++) {
                if (!deepCheck(a[i], b[i])) {
                    return false;
                }
            }
            return true;
        } else if (isString || isBool || isNumber) {
            return a === b;
        } else if (typeof a === "object" && typeof b === "object") {
            for (let key in a) {
                if (!deepCheck(a[key], b[key])) {
                    return false;
                }
            }
            return true;
        } else {
            return a === b;
        }
    }



    const moviesApi = new api.MoviesApi();

    moviesApi.accessToken = process.env.LOTR_TOKEN;

    const newMovie: api.Movie = new api.Movie();

    // descrepency between name 'id' and basename '_id'
    // movie.id = '1234567890987654321';
    newMovie.name = 'The Unreleased Movie: The Other Ring';
    newMovie.runtimeInMinutes = 530;
    newMovie.budgetInMillions = 100;
    newMovie.boxOfficeRevenueInMillions = 999;
    newMovie.academyAwardNominations = 17;
    newMovie.academyAwardWins = 12;
    newMovie.rottenTomatoesScore = 98;

    const rewiredApi = rewire('../../api');

    // Test Object Serializer

    const objectSerializer = rewiredApi.ObjectSerializer;

    console.log("Checking deserialization.");

    const serializedMovie = {
        // descrepency between name 'id' and basename '_id'
        // '_id': movie.id,
        'name': newMovie.name,
        'runtimeInMinutes': newMovie.runtimeInMinutes,
        'budgetInMillions': newMovie.budgetInMillions,
        'boxOfficeRevenueInMillions': newMovie.boxOfficeRevenueInMillions,
        'academyAwardNominations': newMovie.academyAwardNominations,
        'academyAwardWins': newMovie.academyAwardWins,
        'rottenTomatoesScore': newMovie.rottenTomatoesScore,
    };

    let exitCode = 0;

    const deserializedMovie = objectSerializer.deserialize(serializedMovie, "Movie");

    // Check types

    const movieType: boolean = deserializedMovie instanceof rewiredApi.Movie;

    let checks = {};

    for (let key in deserializedMovie) {
        checks[key] = {};
        checks[key]["isCorrect"] = deepCheck(deserializedMovie[key], serializedMovie[key]);
        checks[key]["is"] = deserializedMovie[key];
        checks[key]["should"] = serializedMovie[key];
    }

    const correctTypes: boolean = movieType;

    if (!correctTypes) {
        exitCode = 1;
        console.log("MovieType incorrect: ", movieType);
    } else {
        console.log("MovieType correct: ", movieType);
        console.log("Deserialized data correct!");
    }

    for (let key in checks) {
        let check = checks[key];
        if (!check["isCorrect"]) {
            exitCode = 1;
            console.log(key, " incorrect ", "\nis:\n ",
                check["is"], "\nshould:\n ", check["should"]);
        }
    }

    console.log("Checking serialization");

    const reserializedData = objectSerializer.serialize(newMovie, "Movie");

    if (!deepCheck(reserializedData, serializedMovie)) {
        exitCode = 1;
        console.log("Reserialized Data incorrect! \nis:\n ", reserializedData,
            "\nshould:\n ", serializedMovie);
    } else {
        console.log("Reserialized data correct!");
    }

    // Test various API calls to the LOTR API

    // GET all movies
    try {
        const movies = await moviesApi.getMovies();
        console.log(movies.body);

        // quotes will only work for the LotR trilogy, so we're filtering here
        const movieId = movies.body.docs.filter(movie => movie.name == 'The Fellowship of the Ring')[0].id;
        console.log(movieId);

        // GET a specific movie by ID
        const movie = await moviesApi.getMovieById(movieId);
        console.log(movie.body);

        // GET quotes from specific movie
        const quotesFromTFOTR = await moviesApi.getQuotesByMovieId(movieId);
        console.log(quotesFromTFOTR.body);
    } catch (e) {
        exitCode = 1;
        console.log(e);
    }
})();