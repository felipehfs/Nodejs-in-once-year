var app = require('./config/server');

/* 
	Parametrizar a porta de escuta
*/

var server = app.listen(3000, function () {
	console.log('Servidor online');
});

/*
	Configurando o socket io
*/
var io = require('socket.io').listen(server);


app.set('io', io);
/* cria a conexao por websocket */
io.on('connection', function (socket) {
	console.log('Usuário Conectou');

	socket.on('disconnect', function () {
		console.log('Usuário desconectou');
	});

	socket.on('msgParaServidor', function (data) {

		/* Dialogos */
		socket.emit('msgParaCliente', 
			{apelido: data.apelido, mensagem: data.mensagem});

		socket.broadcast.emit('msgParaCliente', 
			{ apelido: data.apelido, mensagem: data.mensagem });

		/* Participante */
		if(parseInt(data.apelido_atualizado_no_clientes) == 0){
			socket.emit('participantesParaCliente', 
				{ apelido: data.apelido });

			socket.broadcast.emit('participantesParaCliente', 
				{ apelido: data.apelido });
		}
		
	});
});