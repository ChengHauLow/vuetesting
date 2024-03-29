const Websocket = require('ws');
const wss = new Websocket.Server({port:3030})

wss.on('connection', function connection(ws){
  console.log('Websocket Connection Successful')
//   console.log(ws)
  ws.on('message', function incomming(msg){
    console.log(`Received: ${msg}`);
    // Data retrieval logic here
    const data = {
      message: "Hello bitch, I'm from the server here..." 
    };
    ws.send(JSON.stringify(data))
  })
})
