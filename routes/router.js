const router = require('express').Router()
const { addGallery, getAllGallery, deleteGalleryById } = require('../controllers/gallery_controller')
const {sendEmail} = require('../controllers/email_controller')

router.get('/get-all-gallery', getAllGallery)

router.post('/add-gallery', addGallery)

// router.put('/', (req, res) => {

// })

router.delete('/delete-gallery-by-id/:id', deleteGalleryById)
////

router.post('/send-email', sendEmail)

module.exports = router