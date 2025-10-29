const express = require("express")
const router = express.Router()

const {contactUsController} = require("../controllers/ContactUsController")

router.post("./Contact",contactUsController)

module.exports= router