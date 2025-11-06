const express = require("express")
const router = express.Router()

const {contactUsController ,resolveContactInquiry} = require("../controllers/ContactUsController")

router.post("/contact",contactUsController)
router.put('/api/contact/:ticketId/resolve', resolveContactInquiry);

module.exports= router