const express = require('express');
const router = express.Router();

const mongoose = require('mongoose');
const Users = require('../models/users');
const jwt = require('jsonwebtoken');
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
    user.save().then((data) => {
        let payload = {subject: data._id};
        let token = jwt.sign(payload, 'secretKey');
        res.status(201).json({
            message: 'User Added',
            token: token
        });
    });
});

router.post('/login', (req,res) => {
    let userData = req.body;
    Users.findOne({email: userData.email}).then((doc) => {
        if(doc) {
            console.log('doc', doc);
            if(userData.password === doc.password){
                res.status(200).json({
                    message: ' Logged In!',
                    data: true 
                });
            } else{
                res.status(200).json({
                    message: ' Password Invalid', data: false
                });
            }
        }else {
            res.status(200).json({
                message: 'Email Invalid',data: false
            });
        }
    });
});
module.exports = router;