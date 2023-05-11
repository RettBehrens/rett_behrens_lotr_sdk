require('dotenv').config()
const lotr = require('rett_behrens_lotr_sdk');

(async () => {
    const moviesAPI = new lotr.MoviesApi()
    const quotesAPI = new lotr.QuotesApi();

    moviesAPI.accessToken = process.env.LOTR_TOKEN;
    quotesAPI.accessToken = process.env.LOTR_TOKEN;

    const movies = await moviesAPI.getMovies();
    console.log(movies.body.docs);

    // quotes will only work for the LotR trilog, so we're filtering here
    const movieId = movies.body.docs.filter(movie => movie.name == 'The Fellowship of the Ring')[0].id;
    console.log(movieId);


    const movie = await moviesAPI.getMovieById(movieId);
    console.log(movie.body.docs);

    const quotes = await quotesAPI.getQuotes();
    console.log(quotes.body.docs);

    // In The Hobbit, the approximate distance traveled by Bilbo and his companions to Rivendell was 397 miles. It took them 38 days to get there.
    const quote = await quotesAPI.getQuoteById(quotes.body.docs[397].id);
    console.log(quote.body.docs);

    // finally, quotes from specific movie
    const quotesFromTFOTR = await quotesAPI.getQuotesByMovieId(movieId);
    console.log(quotesFromTFOTR.body.docs);
})();