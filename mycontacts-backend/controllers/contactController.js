const asyncHandler = require("express-async-handler");;  //importing express-async-handler
const Contact = require("../models/contactModel"); //importing contact model
//@desc get individual contact
//@route GET /api/contact
//@access Private

const getContact = async(req, res) => {  
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        return res.status(404).json({message:"Contact not found"});
    }
    res.status(200).json({message:`Get  contacts for ${req.params.id}`});
}

//@desc get all contact
//@route GET /api/contact
//@access Private

const getAllContact = asyncHandler(async(req, res) => {  
   const contacts = await Contact.find(({user_id: req.user.id}));
    res.status(200).json(contacts);
});


//@desc Creates contact
//@route Post /api/contact
//@access Private

const createContact = asyncHandler(async(req, res) => {  
    console.log("The request body is: ",req.body);
    const{name, email, phone} = req.body;
    if(!name || !email || !phone){
        return res.status(400).json({message:"Please enter all fields"});
    }
    const contact =
   await Contact.create({
        name,
        email,
        phone
    })
    res.status(201).json(contact);
})

//@desc Update contact
//@route put /api/contact/:id
//@access Private

const UpdateContact = asyncHandler(async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        return res.status(404).json({message:"Contact not found"});
    }

    if(contact.user_id.toString() !== req.user.id){
        return res.status(401).json({message:"Not authorized"});
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new:true,
            runValidators:true  }
        );
    res.status(200).json(updatedContact);  
})

//@desc delete contact
//@route put /api/contact/:id
//@access Private

const deleteContact = asyncHandler(async(req, res) =>  {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        return res.status(404).json({message:"Contact not found"});
    }
    if(contact.user_id.toString() !== req.user.id){
        return res.status(401).json({message:"Not authorized"});  
    }  
    await contact.deleteOne({_di: req.params.id});
    res.status(200).json(contact);
})



module.exports = {getContact, getAllContact, createContact, UpdateContact, deleteContact};