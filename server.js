const Websocket = require('ws');
const wss = new Websocket.Server({port:3030})

wss.on('connection', function connection(ws){
  console.log('Websocket Connection Successful')
//   console.log(ws)
  ws.on('message', function incomming(msg){
    // console.log(`Received: ${msg}`);
    try {
      console.log(JSON.parse(msg));
      const [cmd, data] = JSON.parse(msg);
      // Data retrieval logic here
      // const data = {
      //   message: "Hello bitch, I'm from the server here..." 
      // };
      let reply = {
        message:'Yup, received it'
      };
      switch (cmd) {
        case "main_index":
          reply = {
            type: 1,
            user: data.name,
            pw: data.pw
          }
          break;
      
        case "home_index":
          reply = {
            type: 2,
            title: data.type == 1?'你好':'我不好',
            servermsg: "你好不好"
          }
          break;
      
        default:
          break;
      }
      ws.send(JSON.stringify(reply))
    } catch (error) {
      console.log(error)
    }
  })
})
