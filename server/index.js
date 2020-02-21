require('dotenv').config()

const express = require('express')
const massive = require('massive')
const session = require('express-session')

const { SERVER_PORT, CONNECTION_STRING, SECRET_SESSION } = process.env

const authCtrl = require('./authController')
const ctrl = require('./controller')

const app = express()

app.use(express.json())
app.use(
    session({
        resave: false,
        saveUninitialized: true,
        rejectUnauthorized: false,
        cookie: { maxAge: 1000 * 60 * 60 * 24 },
        secret: SECRET_SESSION
    })
)

massive({
    connectionString: CONNECTION_STRING,
    ssl: {
        rejectUnauthorized: false
    }
}).then(dbObj => {
    app.set('db', dbObj)
    app.listen(SERVER_PORT || 4040, () => console.log(`Server running on ${SERVER_PORT}`))
    console.log('Database connected')
})

app.post('/api/login', authCtrl.login)
app.post('/api/register', authCtrl.register)
app.post('/api/logout', authCtrl.logout)
app.get('/api/user', authCtrl.getUser)

app.get('/api/posts/:id', ctrl.getPosts)
app.post('/api/posts/:id', ctrl.addPost)
app.put('/api/posts/:id', ctrl.editPost)
app.delete('/api/posts/:id', ctrl.deletePost)



//#auth endpoints
//TODO login, register, logout, get user

//#post endpoints
//TODO get post put delete posts
//?user id

//?user id

//?post id

//?post id
