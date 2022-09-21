const User = require('../Models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports.login_page = (req,res) => {
    res.render('login');
};

module.exports.register_page = (req,res) => {
    res.render('register');
};

module.exports.user_register = (req,res) => {
    let user = new User({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password)
    });

    user.save((err,doc)=>{
        if(err){
            res.json(err);
        }else{
            res.redirect('/');
        }
    });
};

module.exports.user_login = (req,res) => {
    User.findOne({email: req.body.email},(err, user) => {
        if(err){
            res.json(err);
        }
        if(!user){
            res.json({message: 'User not found'});
        }else{
            let validatepassword = bcrypt.compare(req.body.password, user.password,(err,isMatch)=>{
                if(err){
                    res.json(err);
                }
                if(isMatch){
                    let token = jwt.sign({id: user._id}, 'abc123', {expiresIn: '1h'});
                    res.cookie('authtoken', token, {maxAge: 360000, httpOnly: true});
                    res.redirect('/students');
                }else{
                    res.json({message: 'Password not matched'});
                }
            });
        }
    });
};

module.exports.user_logout = (req,res) => {
    res.clearCookie('authtoken');
    res.redirect('/');
};