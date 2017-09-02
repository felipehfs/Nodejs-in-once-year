var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/audio_api');

module.exports = mongoose;