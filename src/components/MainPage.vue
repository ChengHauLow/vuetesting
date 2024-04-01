<template>
  <div class="hello">
    <el-card>
      <template #header>
        My Little Testing Only
      </template>
      <el-table :data="list" style="width:100%" border>
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
      </el-table>
    </el-card>
    <MyInfo :popUpTitle="title" :uservisible.sync="dialog.dialogVisible" @myinfoclose="toggleMyInfo" :data.sync="dialog.dialogData" size="small"/>
    <!-- <form :model="form" @submit.prevent="sendMessage" id="sendMymsg">
      <label for="msg">What Message:</label>
      <input type="text" v-model="form.msg" name="msg" id="msg">
      <input type="submit" value="Send Now">
    </form>-->
    <h1>Response from server:</h1>
    <p v-if="user?.user">{{ user.user }}</p> 
    <p v-if="user?.pw">{{ user.pw }}</p> 
    <p v-if="serverMsg != ''">{{ serverMsg }}</p> 
  </div>
</template>

<script>
import MyInfo from '@/components/MyInfo.vue'
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
      user:null,
      form:{
        msg:'',
      },
      serverMsg:[],
      connection: null
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
    }

    this.connection.onmessage = function(event){
      console.log(`Server response a message of`, event.data)
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
      }
      console.log(self.user)
    }
  },
  mounted(){
    document.title = this.title
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello{
  h1{
    color: red;
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
