const upload = require('../middleware/upload')
const cloudinary = require('../utils/cloudinary')
const Gallery = require('../models/gallery_models')

const addGallery = async (req, res) => {
    try {
        upload(req, res, async err => {
            if (err) {
                res.json({
                    error: true,
                    message: 'File type tidak suport'
                })
            } else {
                const result = await cloudinary.uploader.upload(req.file.path)
                console.log(req.file)
                console.log(req.body)
                let gallery = new Gallery({
                    title: req.body.title,
                    category: req.body.category,
                    desc: req.body.desc,
                    image: result.secure_url,
                    cloudinaryId: result.public_id
                })
                await gallery.save((err, doc) => {
                    if (err) {
                        res.json({
                            error: err
                        })
                    } else {
                        const galleryData = {
                            title: doc.title,
                            category: doc.category,
                            desc: doc.desc,
                            image: doc.image,
                            cloudinaryId: doc.cloudinaryId
                        }
                        res.status(200).json({
                            success: true,
                            message: 'Data berhasil di tambahkan',
                            galleryData
                        })
                    }
                })
            }
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

const getAllGallery = async (req, res) => {
    try {
        Gallery.find({}, (err, gallery) => {
            let galleryData = []
            gallery.forEach(item => {
                galleryData.push({
                    id: item._id,
                    title: item.title,
                    category: item.category,
                    desc: item.desc,
                    image: item.image,
                    cloudinaryId: item.cloudinaryId,
                    updatedAt: item.updatedAt,
                    createdAt: item.createdAt
                })
            })

            if (err) {
                res.status(400).json({
                    success: false,
                    message: 'Gagal memuat data!'
                })
            } else {
                res.status(200).json({
                    success: true,
                    message: 'Berhasil memuat data',
                    galleryData
                })
            }
        })
    } catch (error) {
        res.json({
            success: false,
            message: error.message
        })
    }
}

const deleteGalleryById = async (req, res) => {
    let gallery = await Gallery.findById(req.params.id)

    await cloudinary.uploader.destroy(gallery.cloudinaryId)
    Gallery.findByIdAndRemove(req.params.id)
        .then((gallery) => {
            if (!gallery) {
                res.status(404).json({
                    status: false,
                    message: "Produk tidak di temukan"
                })
            } else {
                res.status(200).json({
                    status: true,
                    message: "Berhasil hapus data",
                })
            }
        }).catch((err) => {
            res.json({
                error: err
            })
        })
}

module.exports = { addGallery, getAllGallery, deleteGalleryById }
