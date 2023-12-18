const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000
const cors = require('cors')
const connection = require('./connectDB')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
app.use(express.json())
app.use(cors())



app.get('/', (req, res) => {
    res.send("hello world")
})

app.post('/signup', (req, res) => {
    const { email, password, confirmPassword } = req.body;
    console.log(email, password)

    if (password !== confirmPassword) {
        return res.json({ message: "Incorrect! password" })

    }

    const sql = 'SELECT * FROM users WHERE user_email = ?'
    connection.query(sql, [email], async (err, results) => {
        if (err) {
            console.log("Failed query: ", err.message);
        }
        else {
            if (results.length != 0) {
                // It means that the email alredy exist
                return res.json({ message: "Email already exist" })
            }
            else {
                // Insert the new user into database

                try {

                    const hashPassword = await bcrypt.hash(password, 10)
                    const newUser = [email, hashPassword]
                    const sql2 = 'INSERT INTO users(user_email, user_password) VALUES(?, ?)'
                    connection.query(sql2, newUser, (err, results) => {
                        if (err) {
                            console.log("query failed: ", err.message);
                        }
                        else {
                            return res.status(201).json({ message: "User created successfully", hashPassword: hashPassword })
                        }
                    })
                } catch (error) {
                    return res.status(400).send({ message: error.message });
                }

            }
        }
    })
})


app.post('/login', async (req, res) => {

    const { email, password } = req.body
    try {

        const sql = 'SELECT * FROM users WHERE user_email = ?'
        connection.query(sql, [email], async (err, results) => {
            if (err) {
                console.log("Failed query: ", err.message);
            }
            else {
                // It can be possible that user enter a wrong password so wen need  to chekc here
                if (results.length === 0) {
                    // means that user with the email does not exist
                    return res.send({ message: "Email not found" })
                }

                const userPassword = results[0].user_password

                if (await bcrypt.compare(password, userPassword)) {
                    // lets create a token so that we can identify the user in future request
                    const userId = { userId: results[0].id }
                    const token = jwt.sign(userId, process.env.JWT_SECRET)

                    return res.status(201).send({ jwtToken: token })

                }
                else {
                    return res.status(400).send({ message: "Incorrect!! password" })

                }
            }
        })

    }
    catch (error) {
        return res.status(400).send({ message: error.message })
    }


})

app.post('/logout', auth, (req, res) => {
    const token = req.headers["authorization"]
    // put the token in invalidate token so that in future any one access it will not be able to access the private content
    const sql = "INSERT INTO expireTokens(invalidToken) VALUE(?)"
    connection.query(sql, [token], (err, results) => {
        if (err) {
            console.log("Failed query : ", err.message)
        }
        else {
            return res.status(200).send({ message: "LogOut successfully" })

        }
    })

})

function auth(req, res, next) {
    const authheader = req.headers["authorization"]

    if (!authheader) {
        return res.status(500).send({ message: "Missing auth header" })
    }
    // now decode the authorization header
    const decoded = jwt.verify(authheader, process.env.JWT_SECRET)

    if (decoded && decoded.userId) {
        req.userId = decoded.userId;
        next();
    }
    else {
        return res.status(500).send({ message: "Incorrect!! token" })
    }
}



app.get('/notes', auth, (req, res) => {
    const userId = req.userId
    const currentToken = req.headers["authorization"]
    // check the whether currentToken lies in table of invalidate token or not 
    const sql = 'SELECT *FROM expireTokens  WHERE invalidToken = ? '
    connection.query(sql, [currentToken], (err, results) => {
        if (err) {
            console.log('Query Failed: ', err.message)
            return res.status(500)
        }
        else {
            // if results length === 0 it means all is ok
            if (results.length === 0) {
                // write a new query to fetch all the notes form notes table 
                const sql1 = 'SELECT *FROM notes WHERE userId = ?'
                connection.query(sql1, [userId], (err, results) => {
                    if (err) {
                        console.log('Query Failed: ', err.message)
                        return res.status(500)
                    }
                    else {
                        return res.status(200).send(results)
                    }
                })
            }
            else {
                // means that some one has access to old token and he is making request for accessign content of a user
                return res.status(401);

            }
        }
    })
})


app.post('/postNotes', auth, (req, res) => {
    const noteTitle = req.body.title
    const userId = req.userId
    const sql = 'INSERT INTO notes(title, userId) VALUES(?, ?)'
    connection.query(sql, [noteTitle, userId], (err, results) => {
        if (err) {
            console.log("Query failed: ", err.message)
            return res.status(500).send({ message: "Query failed" })
        }
        else {
            return res.status(200).send({ message: "notes created successfully" })
        }
    })
})


app.post('/deleteNote', auth, (req, res) => {

    const noteId = req.body.noteId
    // const title = req.body.title
    const sql = 'DELETE FROM notes WHERE id = ?'
    connection.query(sql, [noteId], (err, results) => {
        if (err) {
            console.log("Query failed: ", err.message)
            return res.status(500).send({ message: "Query failed" })
        }
        else {
            return res.status(201).send({ message: "notes deleted successfully" })
        }

    })
})



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})
