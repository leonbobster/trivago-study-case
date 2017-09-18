const AhoCorasick = require('aho-corasick');

/**
 * Search phrases in a string using Aho-Corasick algorithm implementation
 * 
 * @param {string} text String to search in
 * @param {string[]} phrases Phrases to find in the string
 * 
 * @returns {string[]} Found phrases
 */
function search(text, phrases) {
    if (!text || !phrases)
        return [];

    const ac = new AhoCorasick();
    const phraseMap = {};
    phrases.forEach(phrase => {
        const p = phrase.toLocaleLowerCase();
        ac.add(p);
        phraseMap[p] = phrase;
    });
    ac.build_fail();

    const actual = new Set();
    ac.search(
        text.toLocaleLowerCase(),
        foundPhrase => actual.add(phraseMap[foundPhrase])
    );

    return Array.from(actual);
};

/**
 * Combine topics and adjectives to build search criterias
 * 
 * @param {string} topic
 * @param {string[]} alternateNames
 * @param {string[]} adjectives
 * 
 * @returns {Object.<string, string>} Criterias
 */
function buildCriterias(topic, alternateNames, adjectives) {
    const criterias = {};
    for (let i = 0; i < alternateNames.length; i++) {
        for (let j = 0; j < adjectives.length; j++) {
            criterias[`${adjectives[j]} ${alternateNames[i]}`] = `${adjectives[j]} ${topic}`;
        }
    }
    return criterias;
}

/**
 * Analyze review
 * 
 * @param {string} review Review
 * @param {{topic: string, alternateNames: string[]}} topics Array of topics
 * @param {string[]} positives Positive adjectives
 * @param {string[]} negatives Negative adjectives
 * 
 * @return {{score: number, foundPhrases: Object.<string, number>}} Score 
 */
function analyze(review, topics, positives, negatives) {
    const positiveCriterias = {};
    const negativeCriterias = {};
    topics.forEach(topic => {
        Object.assign(
            positiveCriterias,
            buildCriterias(topic.topic, topic.alternateNames, positives)
        );
        Object.assign(
            negativeCriterias,
            buildCriterias(topic.topic, topic.alternateNames, negatives)
        );
    });

    // remove duplicates, topics with different alternate names but the same adjective
    let duplicates = {};
    const predicate = p => {
        if (duplicates[positiveCriterias[p]] !== undefined)
            return false;
        duplicates[positiveCriterias[p]] = p;
        return true;
    };
    const foundPositive = search(review, Object.keys(positiveCriterias)).filter(predicate);
    duplicates = {};
    const foundNegative = search(review, Object.keys(negativeCriterias)).filter(predicate);

    const reducer = score => (x, y) => {
        x[y] = score;
        return x;
    };

    return {
        score: foundPositive.length - foundNegative.length,
        foundPhrases: Object.assign(
            foundPositive.reduce(reducer(1), {}),
            foundNegative.reduce(reducer(-1), {})
        )
    };
};

module.exports = {
    search,
    buildCriterias,
    analyze
};