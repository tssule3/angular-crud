const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Users = require('../models/users');
const jwt = require('jsonwebtoken');
const sgMail = require('@sendgrid/mail');

mongoose.connect('mongodb://tejas:sule@localhost:27017/customerDatabase', { useNewUrlParser: true }).
    then(() => { console.log('connected') }).catch((err) => {
        console.log('err', err);
    });
router.get('/getUserList', (req, res) => {
    Users.find().then((data) => {
        res.status(200).json({
            message: 'User List', data: data
        });
    });
});

router.post('/register', (req, res) => {
    let userBody = req.body;
    let user = new Users({
        email: userBody.email,
        password: userBody.password
    });
    Users.find().then((doc) => {
        let result = doc.filter((d) => {
            return d.email === userBody.email;
        });
        if (result.length > 0) {
            console.log('result', result);
            res.status(200).json({
                message: 'Email ALready Exists'
            });
        } else {
            user.save().then((data) => {
                let payload = { subject: data._id };
                let token = jwt.sign(payload, 'secretKey');
                res.status(201).json({
                    message: 'User Added',
                    token: token
                });
            });
        }
    });

});

router.post('/login', (req, res) => {
    let userData = req.body;
    Users.findOne({ email: userData.email }).then((doc) => {
        if (doc) {
            let payload = { subject: doc._id };
            let token = jwt.sign(payload, 'secretKey');
            console.log('doc', doc);
            if (userData.password === doc.password) {
                res.status(200).json({
                    message: ' Logged In!',
                    data: token
                });
            } else {
                res.status(200).json({
                    message: ' Password Invalid', data: false
                });
            }
        } else {
            res.status(200).json({
                message: 'Email Invalid', data: false
            });
        }
    });
});
router.post('/forgot', (req, res) => {
    let forgotData = req.body;
    Users.findOne({ email: forgotData.email }).then((doc) => {
        if (doc) {
            console.log('forgotData.email', doc);
            sgMail.setApiKey('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');
            const msg = {
                to: `${forgotData.email}`,
                from: 'pradhanrohit893@gmail.com',
                subject: 'Password Reset Request',
                text: `Please Find Your Password, Store It Safe, Don't Disclose It,
                    Your Password is:- ${doc.password}`
            };
          
            res.status(200).json({
                message: 'Password Sent To Email!',
                mail: sgMail.send(msg)
            });
        } else {
            res.status(200).json({
                message: 'Email DoesNot Exist!'
            });
        }
    });
});

module.exports = router;