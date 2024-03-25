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
