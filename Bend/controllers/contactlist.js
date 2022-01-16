const ContactList = require('../models/contactlist')

exports.getContactById = (req, res, next, id) => {
    console.log('id', id);
    contactlist.findById(id).exec((err, cate) => {
        console.log(err);
        if (err){
            return res.status(400).json({
                error: "Contact not found in DB"
            })
        }
        console.log(cate, '____________');
        req.category = cate;
        next();
    });
};


// ADD CONTACT LIST
exports.addContactList = (req, res) => {
    const contactlist = new ContactList(req.body);
    
    contactlist.save((err, contactlist) => {
        if(err){
            return res.status(400).json({
                message: "Not able to add contact details",
                error: err
            });
        } else{            
            res.json({
                status: 0,
                data: contactlist,
                message: "Contact Added Successfully"
            })
        }
    });
}

// TO GET ALL CONTACT LIST
exports.getAllContactList = (req, res) => {
    ContactList.find().exec((err, list) => {
        if ( err ){
            return res.json({
                status: -114,
                message: "Unable to fetch Contact List"
            });
        } else {
            res.json({
                status: 0,
                data: list,
                message: "Contact list"
            });
        }
    });
};

// TO GET PARTICULAR CONTACT LIST
exports.getContactList = (req, res) => {
    var _id = req.params.userId.split(':')[1];
    // console.log('id', window.atob(_id), _id);
    ContactList.findById(_id).exec((err, contact) => {
        if ( err ){
            return res.json({
                status: -114,
                message: 'Contact not found',
                error: err
            });
        } else {
            return res.json({
                status: 0,
                data: contact,
                message: 'Success'
            })
        }
    });
};

// TO UPDATE CONTACT LIST
exports.updateContactList = (req, res) => {
    var _id = req.params.userId.split(':')[1];
    ContactList.findByIdAndUpdate(_id, { $set: req.body }).exec((err, contact) => {
        if ( err ){
            return res.json({
                status: -114,
                message: 'User not found',
                error: err
            });
        } else {
            return res.json({
                status: 0,
                message: 'User Updated Successfully'
            })
        }
    })
};

// TO DELETE CONTACT LIST
exports.deltetContactList = (req, res) => {
    var _id = req.params.userId.split(':')[1];
    ContactList.findByIdAndDelete(_id).exec((err, contactlist) => {
        if ( err ){
            return res.json({
                status: -114,
                message: 'User not found',
                error: err
            });
        } else {
            return res.json({
                status: 0,
                data: contactlist,
                message: 'User delete successfully'
            })
        }
    })
};