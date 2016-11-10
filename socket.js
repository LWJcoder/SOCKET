var net = require('net');

function getConnections(name){
	var client = net.connect({port: 12080, host: 'localhost'},function(){
		console.log("hello world, connected");
		console.log(name + "FROM CLIENT ");
		console.log(' local : %s: %s', this.localAddress, this.localPort);
		console.log(' remote : %s: %s', this.remoteAddress, this.remotePort);
		this.on('data', function(data){
		console.log(data.toString());
		//client.connection();
		//client.end();
	});

	this.on('end', function(){
		console.log('client end');
	});

	/*client.on('connection', function(client){
		client.error();
	});*/

	this.on('error', function(client){
		console.log('error test');
	});

	this.on('close',function(){
		console.log('client close');
	});

	this.on('timeout', function(){
		console.log('time out');
	});
	this.setTimeout(500);
	this.setEncoding('utf-8');
	});


return client;
}

function writeData(socket,data){
	var success = !socket.write(data);
	if(!success){
		(function(socket, data){
			socket.once('drain', function(){
				writeData(socket, data);
			});
		})(socket, data)
	}
}


var dwar = getConnections('Dwar');
var Elvas = getConnections('Elvas');
writeData(dwar, "more Arrows");
writeData(Elvas, "more dskdk");
