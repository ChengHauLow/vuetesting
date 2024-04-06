const Websocket = require('ws');
const wss = new Websocket.Server({port:3030})
const moment = require('moment');
let dateNow = '2018-12-31';
let nextDate = ''
let nextValue = 0
const checkCMD = (cmd, data)=>{
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
    case "stock_index":
      nextDate = moment(dateNow).add(1,'day').format('YYYY-MM-DD')
      if(Math.random()*10 > 5){
        nextValue = (Math.random()*40)*(-1) + 10
      }
      if(Math.random()*10 < 5){
        nextValue = (Math.random()*40)*1
      }
      // console.log(nextValue);
      reply = {
        type: 3,
        data: [{ time: nextDate, value: nextValue }]
      }
      dateNow = nextDate;
      break;
  
    default:
      break;
  }
  return reply
}
wss.on('connection', function connection(ws){
  console.log('Websocket Connection Successful')
//   console.log(ws)
  ws.on('message', function incomming(msg){
    // console.log(`Received: ${msg}`);
    try {
      const [cmd, data] = JSON.parse(msg);
      if(data.status == 1){
        setInterval(()=>{
          let reply = checkCMD(cmd, data)
          ws.send(JSON.stringify(reply))
        }, 2000)
      }
      let reply = checkCMD(cmd, data)
      ws.send(JSON.stringify(reply))
    } catch (error) {
      console.log(error)
    }
  })
})
