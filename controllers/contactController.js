const asyncHandler = require("express-async-handler")
//@desc Get all contacts
//@route GET /api/contacts
//@access public
const getContacts = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "Get All Contacts" })
})
//@desc Create new Contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req, res) => {
    console.log(req.body)
    const { name, email, phoneNumber } = req.body
    if (!name || !email || !phoneNumber) {
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    res.status(201).json({ message: "Create New Contact" })
})
//@desc Get A contact
//@route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
    res.status(202).json({ message: `Get contact for ${req.params.id}` })
})
//@desc update a contact
//@route PUT /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
    res.status(202).json({ message: `Update contact for ${req.params.id}` })
})
//@desc delete contact
//@route delete /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
    res.status(202).json({ message: `Delete contact for ${req.params.id}` })
})
module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
}