const express = require('express');
const router = express.Router();

const keys = require('../../config/keys.config');

const User = require('../../models/user.model');

//@route    GET api/users/tests
//@dest     Test users route
//@access   Public
router.get('/tests', (req, res) => res.json({ msg: "users WOrks" }));


//@route    POST api/users/login
//@dest     Login User / Returning JWT 
//@access   Public
router.post('/login', (req, res) => {

    const email = req.body.email;
    const name = req.body.name;
    const password = req.body.password;

    //find user by email
    User.findOne({ name }).then(user => {
        //check for user
        if (!user) {
            return res.status(404).json({ name: 'User not found!' });
        }
        //Check Password
        if (user.password === password) {
            let pickUser = {
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                date: user.date
            }
            return res.status(200).json(pickUser)
        } else {
            return res.status(301).json({ password: 'password incorrect!' });
        }
    });
});

module.exports = router;