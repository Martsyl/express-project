const express = require('express'); 
const router = express.Router();
const {getContact, getAllContact, deleteContact, UpdateContact, createContact} = require("../controllers/contactController");
const { validate } = require('../models/contactModel');
const { validateToken } = require('../middleware/validateTokenHandler');
// router.use(validateToken);
router.route('/',).get(getAllContact).post(createContact)
router.route('/:id',).get(getContact).put(UpdateContact).delete(deleteContact)

module.exports = router;
