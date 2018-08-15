const passport = require('passport')

function initUser(app) {
    app.get('/', renderWelcome)
    app.get('/profile', passport.authenticationMiddleware(), renderProfile)
    app.post('/login', passport.authenticate('local', {
        successRedirect: '/profile',
        failureRedirect: '/'
    }))
    app.get('/logout', (req, res) => {
        req.logout()
        res.redirect('/')
    })
}

function renderWelcome(req, res) {
    res.render('user/welcome')
}

function renderProfile(req, res) {
    res.render('user/profile', {
        username: req.user.username
    })
}

module.exports = initUser