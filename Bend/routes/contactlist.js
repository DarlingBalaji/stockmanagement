var express = require('express');
var router = express.Router();

const { updateContactList, getContactList, addContactList, getAllContactList, deltetContactList } = require('../controllers/contactlist');

router.post('/contact-list/add', addContactList);
router.get('/contact-list/getall', getAllContactList);
router.get('/contact-list/get/:userId', getContactList);
router.put('/contact-list/update/:userId', updateContactList);
router.delete('/contact-list/delete/:userId', deltetContactList);

module.exports = router;
