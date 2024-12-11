const mongoose = require('mongoose');

const urlSchema = new mongoose.Schema({
    originalURL: { type: String, required: true },
    shortID: { type: String, required: true, unique: true },
    clicks: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('URL', urlSchema);
