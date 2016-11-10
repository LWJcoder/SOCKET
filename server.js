/*var http = require('http');

http.createServer(function(request, response){

    //The following code will print out the incoming request text
    request.pipe(response);

}).listen(12080, '127.0.0.1');

console.log('Listening on port 12080...');*/
var  net = require('net');

var server = net.createServer(function(client){
	console.log('client connected');
	console.log('local = %s: %s', client.localAddress, client.localPort);
	console.log('remote = %s: %s', client.remoteAddress, client.remotePort);
	client.setTimeout(500);
	client.setEncoding('utf-8');

	client.on('data', function(data){
		console.log('received data from client on port %d:%s',client.remotePort, data.toString());
		console.log('bytes received '+client.bytesRead);
		writeData(client, 'sending :'+data.toString());
		console.log('bytes sended '+ client.bytesWritten);

	});

	client.on('error', function(err){
		console.log('error ', JSON.stringify(err));
	});

	client.on('end', function(){
		console.log('client end');
		server.getConnections(function(err,count){
			console.log('remaining connections: ' +count);
		});
	});

	client.on('timeout', function(){
		console.log('setTimeout');
	});

});

server.listen(12080, function(){
	console.log('Listening on port 12080...');
	server.on('close', function(){
		console.log('server close');
	});

	server.on('error', function(err){
		console.log('error : '+ JSON.stringify(err));
	});

});

function writeData(socket, data){
	var success = !socket.write(data);
	if(!success){
		(function(socket, data){
			socket.once('drain', function(){
				writeData(socket, data);
			});
		})(socket, data)
	}
}