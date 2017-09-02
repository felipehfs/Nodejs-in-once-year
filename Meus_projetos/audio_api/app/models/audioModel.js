var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

let schema = {
    title: {
        type: String,
        required: true
    },
    song: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true
    },
    file: {
        type: String,
        trim: true
    },
    gender: {
        type: String,
    }
}

let audioSchema = new Schema(schema);
let audioModel = mongoose.model('audios', audioSchema);

module.exports = audioModel;