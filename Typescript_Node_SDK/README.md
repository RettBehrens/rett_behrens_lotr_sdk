# Rett Behrens LOTR SDK

This SDK makes it easy for developers to consume information about the LOTR series via the [LOTR API](https://the-one-api.dev/).

# Table of Contents
- [SDK Installation](#sdk-installation)
- [Getting Started](#getting-started)
- [Available Methods](#available-methods)
- [Usage](#usage)

## SDK Installation
To install this SDK in your project:
```
npm install rett-behrens-lotr-sdk
``` 

## Getting Started
The LOTR API rquires a valid access token in order to make API requests to the server. To obtain an access token sign up for a [LOTR API user account](https://the-one-api.dev/sign-up). Upon sign up you will be presented with an access token. You can also revisit your [account page](https://the-one-api.dev/account) to retrieve your access token at any time. Add the access token to your project evironment variables file so you can reference this key securely in your project code.
```
LOTR_TOKEN = "xxxxxxxuxxxxxxxxxx-x"
```

## Available Methods
| method | description |
| --- | --- |
| `getMovies()` | Returns a list of all movies, including the "The Lord of the Rings" and the "The Hobbit" trilogies |
| `getMovieById(id)` | Returns the specified movie |
| `getQuotes()` | Returns a list of all movie quotes |
| `getQuoteById(id)` | Returns the specified quote |
| `getQuotesByMovieId(id)` | Returns all movie quotes for one specific movie (only working for the LotR trilogy) |


## Usage
```js
require('dotenv').config()
const lotr = require('rett_behrens_lotr_sdk');
(async () => {
    // instatiating API client
    const moviesAPI = new lotr.MoviesApi()
    const quotesAPI = new lotr.QuotesApi();

    // setting your access token to the API client
    moviesAPI.accessToken = process.env.LOTR_TOKEN;
    quotesAPI.accessToken = process.env.LOTR_TOKEN;

    // GET all movies
    const movies = await moviesAPI.getMovies();
    console.log(movies.body);

    // quotes will only work for the LotR trilogy, so we're filtering here
    const movieId = movies.body.docs.filter(movie => movie.name == 'The Fellowship of the Ring')[0].id;
    console.log(movieId);

    // GET a specific movie by ID 
    const movie = await moviesAPI.getMovieById(movieId);
    console.log(movie.body);

    // GET all quotes
    const quotes = await quotesAPI.getQuotes();
    console.log(quotes.body);

    // In The Hobbit, the approximate distance traveled by Bilbo and his companions to Rivendell was 397 miles. It took them 38 days to get there.
    // GET a specific quote by ID
    const quote = await quotesAPI.getQuoteById(quotes.body.docs[397].id);
    console.log(quote.body);

    // GET quotes from specific movie
    const quotesFromTFOTR = await quotesAPI.getQuotesByMovieId(movieId);
    console.log(quotesFromTFOTR.body);
})();
```