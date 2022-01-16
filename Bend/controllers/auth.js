const User = require("../models/users");

// SIGNUP 
exports.signup = (req, res) => {
    const user = new User(req.body);

    user.save((err, user) => {
        if(err){
            return res.status(400).json({
                message: "Not able to save your details in DB"
            });
        } else{
            var userData = {  
                name: user.name,
                email: user.email 
            }
            
            res.json({
                status: 0,
                data: userData,
                message: "Registration Success"
            })
        }
    });
}

// LOGIN
exports.login = (req, res) => {
    var email = req.body.email;

    User.findOne({email}, (err, user) => {
        if(err || !user){
            return res.json({
                status: -114,
                message: "User does not exist"
            })
        } else {
            if ( req.body.password !== user.password ){ // CHECK PASSWORD 
                return res.json({
                    status: -110,
                    message: "Entered Password does't match"
                })
            } else {
                let userData = {
                    name: user.name,
                    email: user.email,
                    _id: user._id
                }
                res.json({
                    status: 0,
                    data: userData,
                    message: user.name + " login successfully"
                })
            }
        }
    });
}
