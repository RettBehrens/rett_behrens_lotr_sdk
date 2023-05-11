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



    const quotesApi = new api.QuotesApi();

    quotesApi.accessToken = process.env.LOTR_TOKEN;

    const newQuote: api.Quote = new api.Quote();

    // descrepency between name 'id' and basename '_id'
    // newQuote.id = '1234567890987654321';
    newQuote.dialog = 'Pull my finger Frodo';
    newQuote.movie = 'The Unreleased Movie: The Other Ring';
    newQuote.character = '5cd99d4bde30eff6ebccfbe6';

    const rewiredApi = rewire('../../api');

    // Test Object Serializer

    const objectSerializer = rewiredApi.ObjectSerializer;

    console.log("Checking deserialization.");

    const serializedQuote = {
        // descrepency between name 'id' and basename '_id'
        // '_id': newQuote.id,
        'dialog': newQuote.dialog,
        'movie': newQuote.movie,
        'character': newQuote.character,
    };

    let exitCode = 0;

    const deserializedQuote = objectSerializer.deserialize(serializedQuote, "Quote");

    // Check types

    const quoteType: boolean = deserializedQuote instanceof rewiredApi.Quote;

    let checks = {};

    for (let key in deserializedQuote) {
        checks[key] = {};
        checks[key]["isCorrect"] = deepCheck(deserializedQuote[key], serializedQuote[key]);
        checks[key]["is"] = deserializedQuote[key];
        checks[key]["should"] = serializedQuote[key];
    }

    const correctTypes: boolean = quoteType;

    if (!correctTypes) {
        exitCode = 1;
        console.log("QuoteType incorrect: ", quoteType);
    } else {
        console.log("QuoteType correct: ", quoteType);
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

    const reserializedData = objectSerializer.serialize(newQuote, "Quote");

    if (!deepCheck(reserializedData, serializedQuote)) {
        exitCode = 1;
        console.log("Reserialized Data incorrect! \nis:\n ", reserializedData,
            "\nshould:\n ", serializedQuote);
    } else {
        console.log("Reserialized data correct!");
    }

    // Test various API calls to the LOTR API

    // GET all movies
    try {
        // GET all quotes
        const quotes = await quotesApi.getQuotes();
        console.log(quotes.body);

        // In The Hobbit, the approximate distance traveled by Bilbo and his companions to Rivendell was 397 miles. It took them 38 days to get there.
        // GET a specific quote by ID
        const quote = await quotesApi.getQuoteById(quotes.body.docs[397].id);
        console.log(quote.body);
    } catch (e) {
        exitCode = 1;
        console.log(e);
    }
})();