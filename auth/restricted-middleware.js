const bcrypt = require('bcryptjs');



module.exports = (req, res, next) => {
    // check that we remember the clients, that is logged in already
    if (req.session && req.session.user) {
        next()

    } else {
        res.status(401).json({ message: "shall not pass" })
    }
}