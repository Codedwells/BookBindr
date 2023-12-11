import cors from 'cors'
import { Logger } from 'borgen'
import express from 'express'
import bodyParser from 'body-parser'

const PORT = 6969

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

const genres = [
    { name: 'Drama', score: 80 },
    { name: 'Adventure', score: 95 },
    { name: 'SciFi', score: 75 },
    { name: 'Comedy', score: 65 },
]

// Simple in-memory db
const books = [
    {
        title: 'To Kill a Mockingbird',
        link: 'https://en.wikipedia.org/wiki/To_Kill_a_Mockingbird',
        scores: [95, 80, 60, 70], // Drama, Adventure, SciFi, Comedy
    },
    {
        title: "The Hitchhiker's Guide to the Galaxy",
        link: 'https://en.wikipedia.org/wiki/The_Hitchhiker%27s_Guide_to_the_Galaxy',
        scores: [60, 90, 80, 95],
    },
    {
        title: '1984',
        link: 'https://en.wikipedia.org/wiki/Nineteen_Eighty-Four',
        scores: [90, 70, 50, 60],
    },
    {
        title: 'The Great Gatsby',
        link: 'https://en.wikipedia.org/wiki/The_Great_Gatsby',
        scores: [80, 75, 55, 65],
    },
    {
        title: 'Brave New World',
        link: 'https://en.wikipedia.org/wiki/Brave_New_World',
        scores: [85, 60, 75, 50],
    },
    {
        title: 'The Lord of the Rings',
        link: 'https://en.wikipedia.org/wiki/The_Lord_of_the_Rings',
        scores: [70, 95, 85, 50],
    },
    {
        title: 'Pride and Prejudice',
        link: 'https://en.wikipedia.org/wiki/Pride_and_Prejudice',
        scores: [75, 50, 55, 80],
    },
    {
        title: 'The Catcher in the Rye',
        link: 'https://en.wikipedia.org/wiki/The_Catcher_in_the_Rye',
        scores: [65, 55, 60, 75],
    },
    {
        title: "Harry Potter and the Sorcerer's Stone",
        link: 'https://en.wikipedia.org/wiki/Harry_Potter_and_the_Philosopher%27s_Stone',
        scores: [75, 85, 90, 70],
    },
    {
        title: 'The Shining',
        link: 'https://en.wikipedia.org/wiki/The_Shining_(novel)',
        scores: [85, 70, 55, 75],
    },
]

// Vector difference func
function vectorDifference(user, book) {
    let diff = 0
    genres.forEach((genre, i) => {
        diff += Math.abs(user[i] - book.scores[i])
    })
    return diff
}

app.get('/recommend', (req, res) => {
    let { genre} = req.query
    let userPrefs = genres.map((g) => (g.name === genre ? g.score : 0))

    // Best match
    let minDiff = Infinity
    let bestMatch

    books.forEach((book) => {
        let diff = vectorDifference(userPrefs, book)
        if (diff < minDiff) {
            minDiff = diff
            bestMatch = book
        }
    })

    res.json([
        {
            title: bestMatch.title,
            link: bestMatch.link,
        },
    ])
})

app.listen(PORT, () => {
    Logger.info(`Server is running on port ${PORT}`)
})
