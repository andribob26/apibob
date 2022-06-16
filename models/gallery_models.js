const mongoose = require("mongoose")
const timestamps = require("mongoose-timestamp")

gallerySchema = mongoose.Schema({

    title: {
        type: String
    },
    category: {
        type: String
    },
    desc: {
        type: String
    },
    image: {
        type: String
    },
    cloudinaryId: {
        type: String
    },

})

gallerySchema.plugin(timestamps)

module.exports = mongoose.model("Gallery", gallerySchema)