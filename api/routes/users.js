const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user')

router.post('/signup', (req, res, next) => {

    User.find({ email: req.body.email }, (err, data) => {
        if (err) {

        } else {
            //data is an empty array
            if (data.length >= 1) {
                return res.status(409).json({ message: "Mail exists" })
            } else {
                bcrypt.hash(req.body.password, 10, (err, hash) => {
                    if (err) {
                        res.status(500).json(err);
                    } else {

                        const user = new User({
                            email: req.body.email,
                            password: hash

                        });
                        user.save((err, data) => {
                            if (err) {
                                res.status(500).json(err);
                            } else {
                                res.status(201).json({ message: "userCreated" });
                            }
                        })
                    }
                })
            }
        }
    })


})

router.post('/login', (req, res, next) => {
    User.find({ email: req.body.email }, (err, data) => {
        if (err) {
            res.status(500).json(err);
        } else {
            if (data.length < 1) {
                return res.status(401).json({
                    message: 'Auth failed'
                })
            }
            bcrypt.compare(req.body.password, data[0].password, (err, resposne) => {
                if (err) {
                    res.status(500).json(err);
                }
                //response is either true or false
                if (resposne) {
                    const token = jwt.sign({
                        email: data[0].email,
                        userId: data[0]._id
                    }, "secret",
                        {
                            expiresIn: "1h"
                        })
                    return res.status(200).json({
                        message: 'Auth successful',
                        token: token
                    })
                } else {
                    return res.status(401).json({ message: 'Auth failed' })
                }
            })
        }
    })
})



router.delete('/:userId', (req, res, next) => {
    User.remove({ _id: req.params.userId }, (err, data) => {
        if (err) {
            res.status(500).json(err);
        } else {
            res.status(200).json({ message: "user Deleted" })
        }
    })
})

















module.exports = router;