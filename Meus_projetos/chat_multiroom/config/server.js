var express = require('express');


/* Importar o módulo do consign */
var consign = require('consign');


/* Importar o módulo do body-parser */
var bodyParser = require('body-parser');

var expressValidator = require('express-validator');


/* Iniciamento do objeto express */
var app = express();

/* setar as variáveis da view engine */
app.set('view engine', 'ejs');
app.set('views', './app/views');

/* configurando middlewares do express */

app.use(express.static('./app/public'));

/* configurando o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));

app.use(expressValidator());

/* efetua o autoload das rotas, models e controllers para o objeto app */
consign()
	.include('app/routes')
	.then('app/models')
	.then('app/controllers')
	.into(app);


/* exportar o objeto app */
module.exports = app;