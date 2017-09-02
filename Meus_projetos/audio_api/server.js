var app = require('./config/express');
var formidable = require('formidable');
var mongoose = require('./config/mongoose');
var Audio = require('./app/models/audioDAO');
var fs = require('fs');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.post('/audio', function(req, res){
    // TODO: O BodyParser nao funciona o jeito e pegar os campos pelo formidable
    let novoAudio = new Audio();

    var form = new formidable.IncomingForm();
    form.uploadDir = './uploads';
    form.keepExtensions = true;
    form.multiple = true;
    
    form.parse(req, function (err, fields, files) {
        var audio = fields;
        audio.file = files.upload.name;

        fs.rename(files.upload.path, 'uploads/' + audio.file, function (err) {
            if(err){
                console.log(err);
            }
        });

        // Banco de dados
        novoAudio.salvar(audio, function(err){
            if(err){
                res.send(err);
                return;
            } else {
                res.json(audio);
            }
        });

    });

   /* 
    */
});

app.get('/audio/:nome', function (req, res) {
    var filePath = 'uploads/' + req.params.nome;
    var stat = fs.statSync(filePath);

    res.writeHead(200, {
        'Content-Type': 'audio/mpeg',
        'Content-Length': stat.size
    });

    var readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
});

app.get('/audio', function(req, res){

    res.setHeader('Access-Control-Allow-Origin', '*');
    var AudioModel = new Audio();
    AudioModel.show(function(err, dados){
        if(err){
            console.log(err);
            return;
        } else {
            res.json(dados);
        }
    });
});

app.listen(8080, function(){
    console.log('Rodando o servidor');
});