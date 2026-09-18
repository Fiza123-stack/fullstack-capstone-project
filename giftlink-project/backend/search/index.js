// Task 8 requirement: import the "natural" npm package
const natural = require('natural');

const tokenizer = new natural.WordTokenizer();
const stemmer = natural.PorterStemmer;

/**
 * Breaks a search phrase into normalized, stemmed tokens.
 * Useful for improving search matching (e.g. "chairs" -> "chair").
 */
function tokenizeAndStem(text) {
    if (!text) return [];
    const tokens = tokenizer.tokenize(text.toLowerCase());
    return tokens.map(token => stemmer.stem(token));
}

module.exports = { tokenizeAndStem };
