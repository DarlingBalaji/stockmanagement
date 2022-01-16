var User = require('../models/users');

exports.userProfile = (req, res) => {
    let email = 'balaji@gmail.com'
    User.findOne({email}).exec((err, user) => {
        if(err || !user){
            return res.json({
                status: -114,
                message: "User not found"
            })
        } else {
            res.json({
                status: 0,
                data: user,
                message: "Success"
            })
        }
    })
};