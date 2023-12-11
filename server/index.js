import cors from 'cors'
import { Borgen, Logger } from 'borgen'
import express from 'express'
import bodyParser from 'body-parser'
import { books } from './books.js'

const PORT = 6969

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(Borgen({}))

const genres = [
    { name: 'Drama', score: 80 },
    { name: 'Adventure', score: 95 },
    { name: 'SciFi', score: 75 },
    { name: 'Comedy', score: 65 },
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
    try {
        let { genre } = req.query
        let userPrefs = genres.map((g) => (g.name === genre ? g.score : 0))

        // Find top four matches
        let matches = []
        for (let i = 0; i < 4; i++) {
            let minDiff = Infinity
            let bestMatch

            books.forEach((book) => {
                // Exclude books that are already in the result
                if (matches.some((match) => match.title === book.title)) {
                    return
                }

                let diff = vectorDifference(userPrefs, book)
                if (diff < minDiff) {
                    minDiff = diff
                    bestMatch = book
                }
            })

            // Add the best match to the result
            matches.push({
                title: bestMatch.title,
                link: bestMatch.link,
            })
        }

        res.status(200).json(matches)
    } catch (err) {
        res.status(500).json({
            message: 'An error occured while fetching data',
        })
    }
})

app.listen(PORT, () => {
    Logger.info(`Server is running on port ${PORT}`)
})
