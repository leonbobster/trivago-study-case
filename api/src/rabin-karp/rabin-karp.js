/*
Following program is the javascript implementation of
Rabin Karp Algorithm given in CLRS book
d is the number of characters in input alphabet
*/
const d = 256;

/**
 * @param {string} pat Pattern
 * @param {string} txt Text
 * @param {number} q A prime number
 * 
 * @returns {Object}
 */
function rabinKarp(pat, txt, q = 101) {
    const M = pat.length;
    const N = txt.length;
    const result = {};
    result[pat] = [];
    if (N === 0)
        return result;
    let i = 0;
    let j = 0;
    let p = 0;                      // hash value for pattern
    let t = 0;                      // hash value for txt
    let h = Math.pow(d, M - 1) % q; // The value of h would be "pow(d, M-1)%q"

    // Calculate the hash value of pattern and first window of text
    for (i = 0; i < M; i++) {
        p = (d * p + pat[i].charCodeAt(0)) % q;
        t = (d * t + txt[i].charCodeAt(0)) % q;
    }

    // Slide the pattern over text one by one
    for (i = 0; i < (N - M + 1); i++) {
        // Check the hash values of current window of text and
        // pattern if the hash values match then only check
        // for characters on by one
        if (p === t) {
            // Check for characters one by one
            for (j = 0; j < M; j++) {
                if (txt[i + j] !== pat[j])
                    break;
            }
            // if p == t and pat[0...M-1] = txt[i, i+1, ...i+M-1]
            if (j === M) {
                result[pat].push(i);
            }
        }
        // Calculate hash value for next window of text: Remove
        // leading digit, add trailing digit
        if (i < N - M) {
            t = (d * (t - txt[i].charCodeAt(0) * h) + txt[i + M].charCodeAt(0)) % q;
            // We might get negative values of t, converting it to positive
            if (t < 0)
                t = t + q;
        }
    }
    return result;
}

module.exports = rabinKarp;