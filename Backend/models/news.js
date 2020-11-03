const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
  title: String,
  description: String,
  theme: String,
  link: String,
  img_url: String
})

newsSchema.set('toJSON', {
  transform: (doc, returned)=>{
    returned.id=doc._id.toString()
    delete returned._id
    delete returned.__v
  }
})

module.exports = mongoose.model('News', newsSchema)