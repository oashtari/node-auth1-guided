const bcrypt = require('bcryptjs')

const router = require("express").Router();

const Users = require("../users/users-model.js");

router.post("/register", (req, res) => {

    const userInfo = req.body;

    // the password will be hased and rehashed to 2 ^ 8 times
    const ROUNDS = process.env.HASHING_ROUNDS || 8;
    const hash = bcrypt.hashSync(userInfo.password, ROUNDS);

    userInfo.password = hash;

    Users.add(userInfo)
        .then(user => {
            res.json(user);
        })
        .catch(err => res.send(err));
});


router.post("/login", (req, res) => {

    const { username, password } = req.body;
    // find the user

    Users.findBy({ username })
        .then(([user]) => {
            //checking to see if correct password for that user
            if (user && bcrypt.compareSync(password, user.password)) {
                // req.loggedIn = true;
                // req.user = user;
                // remember this client
                // session is saved in server
                req.session.user = {
                    id: user.id,
                    username: user.username
                };

                res.status(200).json({ hello: user.username })
            } else {
                res.status(401).json({ message: "invaliad creentials" })
            }
        }
        )
        .catch(error => {
            res.status(500).json({ message: "error finding the user" })
        })

});

router.get('/logout', (req, res) => {
    if (req.session) {
        req.session.destroy(error => {
            if (error) {
                res.status(500).json({ message: "you can never leave" })
            } else {
                res.status(200).json({ message: "log out success" })
            }
        });
    } else {
        res.status(200).json({ message: "I do not know you" })
    }
})

module.exports = router;