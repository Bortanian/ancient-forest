require('dotenv').config()
const express = require('express')
    , session = require('express-session')
    , bodyParser = require('body-parser')
    , passport = require('passport')
    , Auth0Strategy = require('passport-auth0')
    , ctrl = require('./controller')
    , massive = require('massive')

const {
    SERVER_PORT,
    CONNECTION_STRING,
    SESSION_SECRET,
    DOMAIN,
    CLIENT_ID,
    CLIENT_SECRET,
    CALLBACK_URL,
} = process.env

const app = express()

app.use( express.static( `${__dirname}/../build` ) );

massive(CONNECTION_STRING).then(db => app.set('db', db))

app.use(bodyParser.json())

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())

passport.use(new Auth0Strategy({
    domain: DOMAIN,
    clientID: CLIENT_ID,
    clientSecret: CLIENT_SECRET,
    callbackURL: CALLBACK_URL,
    scope: 'openid profile'
}, (accessToken, refreshToke, extraParams, profile, done) => {
    const db = app.get('db')
    let { id, displayName} = profile
    db.find_user([id]).then(user => {
        if (user[0]) {
            done(null, user[0].id)
        } else {
            db.create_user([displayName, id]).then( (createdUser) => {
                done(null, createdUser[0].id)
            })
        }
    })
}))

passport.serializeUser((primaryKeyID, done) => {
    done(null, primaryKeyID)
})
passport.deserializeUser((primaryKeyID, done) => {
    app.get('db').find_session_user([primaryKeyID]).then(user => {
        done(null, user[0])
    })
})

app.get('/auth', passport.authenticate('auth0'))
app.get('/auth/callback', passport.authenticate('auth0', {
    successRedirect: `${process.env.FRONTEND_URL}#/select`
}))
app.get('/auth/logout', (req, res) => {
    req.logOut();
    res.redirect(process.env.FRONTEND_URL)
})
app.get('/auth/user', (req, res) => {
    if(req.user) {
        res.status(200).send(req.user)
    } else {
        res.status(401).send("How Mod U R Sun!?")
    }
})

app.get('/api/chars/:id' , ctrl.getChars)
app.post('/api/chars', ctrl.addChar)
app.delete('/api/chars/:id', ctrl.deleteChar)
app.get('/api/enemy/:id', ctrl.getEnemy)
app.get('/api/hero/:id', ctrl.getHero)
app.post('/api/abilities', ctrl.addAbilities)
app.delete('/api/abilities/:id', ctrl.deleteAbilities)
app.post('/api/map', ctrl.addMap)
app.delete('/api/map/:id', ctrl.deleteMap)
app.get('/api/position/:id', ctrl.getPosition)
app.patch('/api/position/:id', ctrl.savePosition)



app.listen(SERVER_PORT, () => {
    console.log(`Server is listening on port: ${SERVER_PORT}`)
})