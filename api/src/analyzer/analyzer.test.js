const {
    search,
    buildCriterias,
    analyze
} = require('./analyzer');

describe('search', () => {
    it('should search in empty text', () => {
        expect(search('', [])).toEqual([]);
        expect(search(undefined, undefined)).toEqual([]);
    });

    it('should find phrases in text', () => {
        const text = `"Across the road from Santa Monica Pier is exactly where you want to be when visiting Santa Monica, as well as not far from lots of shops and restaurants/bars.
        Hotel itself is very new & modern, rooms were great. Comfortable beds & possibly the best shower ever!"`;
        const phrases = [
            'not far from',
            'comfortable beds',
            'very new',
            'rooms were great',
            'foo',
            'bat'
        ];
        const expectedPhrases = [
            'not far from',
            'comfortable beds',
            'very new',
            'rooms were great'
        ];
        expect(search(text, phrases).sort()).toEqual(expectedPhrases.sort());
    });
});

describe('buildCriterias', () => {
    it('should create map of criterias', () => {
        const criterias = buildCriterias(
            'room',
            ['room', 'apartment', 'chamber'],
            ['great', 'good', 'very nice']
        );
        expect(criterias).toEqual({
            'great room': 'great room',
            'great apartment': 'great room',
            'great chamber': 'great room',
            'good room': 'good room',
            'good apartment': 'good room',
            'good chamber': 'good room',
            'very nice room': 'very nice room',
            'very nice apartment': 'very nice room',
            'very nice chamber': 'very nice room'
        });
    });

    it('should create an empty map if the input is empty', () => {
        expect(buildCriterias('', [], [])).toEqual({});
    });
});

describe('analyze', () => {
    it('should calculate score', () => {
        const review = `good apartment foo old toilet bar old bathroom baz great room bat very nice shower`;

        const topics = [
            { topic: 'room', alternateNames: ['room', 'chamber', 'apartment'] },
            { topic: 'bathroom', alternateNames: ['bathroom', 'shower', 'lavatory', 'toilet'] }
        ];

        const negatives = ['problem', 'unfriendly', 'horrible', 'old'];
        const positives = ['great', 'good', 'very nice'];

        const result = analyze(review, topics, positives, negatives);

        expect(result).toEqual({
            score: 2,
            foundPhrases:
            {
                'good apartment': 1,
                'great room': 1,
                'very nice shower': 1,
                'old toilet': -1
            }
        });

        expect(analyze('', [], [], [])).toEqual({
            score: 0,
            foundPhrases: {}
        });
    });
});

