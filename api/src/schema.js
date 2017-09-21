export default `

type Review {
    id: ID!
    text: String
}

type Score {
    id: ID!
    score: Int
    review: String
    topics: [String]
}

type Topic {
    topic: String
    alternateNames: [String]
}

type Query {
    reviews: [Review]
    scores: [Score]
    topics: [Topic]
}

type Mutation {
    createReview(text: String): Review
}

`;