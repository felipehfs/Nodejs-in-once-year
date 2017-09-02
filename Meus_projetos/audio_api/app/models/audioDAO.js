var AudioModel = require('./audioModel');

function Audio(){
}

Audio.prototype.salvar = function (audio, callback) {
    let data = new AudioModel(audio);
    data.save(callback);
}

Audio.prototype.show = function(callback){
    AudioModel.find(callback);
}

module.exports = Audio;