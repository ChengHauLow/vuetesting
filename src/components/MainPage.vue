<template>
  <div class="hello">
    <el-card>
      <template #header>
        My Little Testing Only
      </template>
      <!-- <el-table :data="list" style="width:100%" border>
        <el-table-column align="center" prop="name" label="Name" width="120px">
          <template slot-scope="scope">
            <el-button size="normal" type="primary" @click="toggleMyInfo(scope.row, 2)">{{ scope.row.name }}</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="phone" label="Phone" width="120px"></el-table-column>
        <el-table-column align="center" prop="address" label="Address" width="120px">
          <template slot-scope="scope">
            <el-button size="normal" type="default" @click="toggleMyInfo(scope.row, 1)">{{ scope.row.address }}</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="is_active" label="Is Active?" width="120px">
          <template slot-scope="scope">
            <span :class="{'active':scope.row.is_active}">{{ scope.row.is_active?'Active':'InActive' }}</span>
          </template>
        </el-table-column>
      </el-table> -->
      <div id="chart"></div>
    </el-card>
    <MyInfo :popUpTitle="title" :uservisible.sync="dialog.dialogVisible" @myinfoclose="toggleMyInfo" :data.sync="dialog.dialogData" size="small"/>
    <!-- <form :model="form" @submit.prevent="sendMessage" id="sendMymsg">
      <label for="msg">What Message:</label>
      <input type="text" v-model="form.msg" name="msg" id="msg">
      <input type="submit" value="Send Now">
    </form>
    <h1>Response from server:</h1>
    <p v-if="user?.user">{{ user.user }}</p> 
    <p v-if="user?.pw">{{ user.pw }}</p> 
    <p v-if="serverMsg != ''">{{ serverMsg }}</p> -->
  </div>
</template>

<script>
import MyInfo from '@/components/MyInfo.vue'
import { createChart } from 'lightweight-charts';
export default {
  components:{
    MyInfo
  },
  name: 'MainPage',
  props: {
    title: String
  },
  data(){
    return{
      list:[
        {
          name:'omg-1',
          phone:'phone-1',
          address:'address-1',
          is_active:false
        },
        {
          name:'omg-2',
          phone:'phone-2',
          address:'address-2',
          is_active:true
        },
        {
          name:'omg-3',
          phone:'phone-3',
          address:'address-3',
          is_active:true
        },
        {
          name:'omg-4',
          phone:'phone-4',
          address:'address-4',
          is_active:false
        },
      ],
      dialog:{
        dialogVisible: false,
        dialogData:{}
      },
      latestData:[],
      myChart0:document.getElementById('chart'),
      myChart:null,
      chartOptions:{ layout: { textColor: 'black', background: { type: 'solid', color: 'white' } } },
      areaSeries:null,
      seriesOption:{
        lineColor: '#2962FF', topColor: '#2962FF',
        bottomColor: 'rgba(41, 98, 255, 0.28)',
      },
      candleOption:{
          upColor: '#26a69a', downColor: '#ef5350', borderVisible: false,
          wickUpColor: '#26a69a', wickDownColor: '#ef5350',
      },
      candlestickSeries:null,
      seriesData:[
          { time: '2018-12-22', value: 32.51 },
          { time: '2018-12-23', value: 31.11 },
          { time: '2018-12-24', value: 27.02 },
          { time: '2018-12-25', value: 27.32 },
          { time: '2018-12-26', value: 25.17 },
          { time: '2018-12-27', value: 28.89 },
          { time: '2018-12-28', value: 25.46 },
          { time: '2018-12-29', value: 23.92 },
          { time: '2018-12-30', value: 22.68 },
          { time: '2018-12-31', value: 22.67 },
      ],
      candleData:[
          { time: '2018-12-22', open: 75.16, high: 82.84, low: 36.16, close: 45.72 },
          { time: '2018-12-23', open: 45.12, high: 53.90, low: 45.12, close: 48.09 },
          { time: '2018-12-24', open: 60.71, high: 60.71, low: 53.39, close: 59.29 },
          { time: '2018-12-25', open: 68.26, high: 68.26, low: 59.04, close: 60.50 },
          { time: '2018-12-26', open: 67.71, high: 105.85, low: 66.67, close: 91.04 },
          { time: '2018-12-27', open: 91.04, high: 121.40, low: 82.70, close: 111.40 },
          { time: '2018-12-28', open: 111.51, high: 142.83, low: 103.34, close: 131.25 },
          { time: '2018-12-29', open: 131.33, high: 151.17, low: 77.68, close: 96.43 },
          { time: '2018-12-30', open: 106.33, high: 110.20, low: 90.39, close: 98.10 },
          { time: '2018-12-31', open: 109.87, high: 114.69, low: 85.66, close: 111.26 },
      ],
      user:null,
      form:{
        msg:'',
      },
      serverMsg:'No Message',
      connection: null
    }
  },
  watch:{
    // eslint-disable-next-line
    latestData(newVal=[], oldVal){
      for (let i = 0; i < newVal.length; i++) {
        this.areaSeries.update(newVal[i])        
      }
    }
  },
  methods:{
    async toggleMyInfo(e, type){
      this.dialog.dialogData = {
        type
      }
      this.dialog.dialogData.row = e
      this.dialog.dialogVisible = !this.dialog.dialogVisible
    },
    sendMessage(){
      // e.preventDefault()
      console.log(this.connection);
      // console.log(this.form.msg)
      let param = {
        name: "LOW",
        pw:'123456'
      }
      this.connection.send(JSON.stringify(["main_index", param]));
    },
    setTitle(){
      console.log(this.connection);
      let param = {
        type: 1,
      }
      this.connection.send(JSON.stringify(["home_index", param]));
    },
    reqData(){
      let param = {
        status:1,
        detail:'req data'
      }
      this.connection.send(JSON.stringify(["stock_index", param]));
    },
    getServerMsg(msg){
      this.serverMsg = msg
    }
  },
  created(){
    let self = this
    console.log("Starting Connection to Websocket Server")
    this.connection = new WebSocket("ws://localhost:3030")

    this.connection.onopen = function(event){
      console.log(event);
      console.log("Successfully connected to websocket server...")
      self.sendMessage();
      self.setTitle();
      self.reqData()
    }

    this.connection.onmessage = function(event){
      console.log(event.data)
      // self.serverMsg = 'Typing'
      // setTimeout(()=>{
      //   self.serverMsg += '.'
      // },300)
      // setTimeout(()=>{
      //   self.serverMsg += '.'
      // },600)
      // setTimeout(()=>{
      //   self.serverMsg += '.'
      // },900)
      // setTimeout(()=>{
      //   self.serverMsg = 'Typing'
      // },1500)
      // setTimeout(()=>{
      //   self.serverMsg += '.'
      // },1800)
      // setTimeout(()=>{
      //   self.serverMsg += '.'
      // },2100)
      // setTimeout(()=>{
      //   self.serverMsg += '.'
      // },2400)
      // setTimeout(()=>{
      //   self.serverMsg = JSON.parse(event.data).message
      // },2700)
      
      // console.log(self.serverMsg)
      let dataFromSocket = JSON.parse(event.data); 
      if(dataFromSocket.type == 1){
        self.user = dataFromSocket
      }else if(dataFromSocket.type == 2){
        self.title = dataFromSocket.title
        self.serverMsg = dataFromSocket.servermsg
      }else if(dataFromSocket.type == 3){
        self.latestData = dataFromSocket.data
      }
      console.log(self.user)
    }
  },
  mounted(){
    document.title = this.title
    this.myChart0 = document.getElementById('chart')
    this.myChart = createChart(this.myChart0, this.chartOptions);
    this.areaSeries = this.myChart.addAreaSeries(this.seriesOption);
    this.areaSeries.setData(this.seriesData)
    // this.candlestickSeries = this.myChart.addCandlestickSeries(this.candleOption);
    // this.candlestickSeries.setData(this.candleData);
    this.myChart.timeScale().fitContent();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello{
  h1{
    color: red;
  }
  .el-card{
    .el-card__body{
      #chart{
        background: red;
        width: 600px;
        height: 400px;
      }
    }
  }
}
.cell{
  span{
    color: red;
    &.active{
      color: green;
    }
  }
}
</style>
