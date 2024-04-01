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
    <form :model="form" @submit.prevent="sendMessage" id="sendMymsg">
      <label for="msg">What Message:</label>
      <input type="text" v-model="form.msg" name="msg" id="msg">
      <input type="submit" value="Send Now">
    </form>
    <h1>Response from server:</h1>
    <template v-if="serverMsg.length > 0">
      <p v-for="(msg, key) in serverMsg" :key="key">{{ msg }}</p>
    </template>
    <template v-else>
      <p>No Message</p>
    </template>
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
    sendMessage(e){
      e.preventDefault()
      console.log(this.connection);
      // console.log(this.form.msg)
      if(this.form.msg != ''){
        this.connection.send(this.form.msg);
        this.form.msg = '';
      }
      else{
        alert('Message content is required!')
        this.form.msg = '';
        return;
      }
    },
  },
  created(){
    let self = this
    console.log("Starting Connection to Websocket Server")
    this.connection = new WebSocket("ws://localhost:3030")

    this.connection.onopen = function(event){
      console.log(event);
      console.log("Successfully connected to websocket server...")
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
      self.serverMsg.push(JSON.parse(event.data).message)
      
      console.log(self.serverMsg)
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
