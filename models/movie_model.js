const mongoose = require('mongoose');

const movieSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true},
    rating: { type: Number, required: true},
    description: { type:String, required: true}
});

module.exports = mongoose.model('Movie', movieSchema);
