const passport = require('passport')

function initNote(app) {
    app.get('/notes/:id', passport.authenticationMiddleware(), (req, res) => {
        res.render('note/overview', {
            id: req.params.id
        })
    })
}

module.exports = initNote