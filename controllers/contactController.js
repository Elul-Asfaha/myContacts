const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")
//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id })
    res.status(200).json(contacts)
})
//@desc Create new Contact
//@route POST /api/contacts
//@access public
const createContact = asyncHandler(async (req, res) => {
    const { name, email, phoneNumber } = req.body
    if (!name || !email || !phoneNumber) {
        res.status(400)
        throw new Error("All fields are mandatory")
    }
    const contact = await Contact.create({
        name,
        email,
        phoneNumber,
        user_id: req.user.id
    })

    res.status(200).json(contact)
})
//@desc Get A contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found")
    }
    res.status(200).json(contact)
})
//@desc update a contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found")
    }
    if (contact.user_id.toString() != req.user.id) {
        res.status(403)
        throw new Error("User doesnt have permission to update another users contacts")
    }
    const updateContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true
        }
    )
    res.status(200).json(updateContact)
})
//@desc delete contact
//@route delete /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Contact not found")
    }
    if (contact.user_id.toString() != req.user.id) {
        res.status(403)
        throw new Error("User doesnt have permission to delete another users contacts")
    }
    await Contact.deleteOne({ _id: req.params.id })
    res.status(200).json(contact)
})
module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
}