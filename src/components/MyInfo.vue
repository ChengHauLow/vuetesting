<template>
    <el-dialog
    :title="popUpTitle"
    :visible="uservisible"
    :before-close="handlecloseclick"
    :overflow="false"
    :close-on-click-modal="false"
    width="65%"
    @open="open">
        <el-table :data="myData" style="width:100%" border>
          <el-table-column align="center" prop="name" label="Name" width="220px"></el-table-column>
          <el-table-column align="center" prop="phone" label="Phone" width="220px"></el-table-column>
          <el-table-column align="center" prop="address" label="Address" width=""></el-table-column>
          <el-table-column align="center" prop="is_active" label="Is Active?" width="120px">
            <template slot-scope="scope">
              <span :class="{'active':scope.row.is_active}">{{ scope.row.is_active?'Active':'InActive' }}</span>
            </template>
          </el-table-column>
        </el-table>
        <!-- <span slot="footer" class="dialog-footer">
            <el-button @click="handleCancel">Cancel</el-button>
            <el-button type="primary" @click="handlecloseclick">Confirm</el-button>
        </span> -->
    </el-dialog>
</template>
<script>
export default {
  name: 'MainPage',
  props: {
    uservisible:Boolean,
    data: Object,
    popUpTitle: String
  },
  data(){
    return{
        myData:{},
        title:''
    }
  },
  methods:{
    open(){
        this.myData = [this.data.row]
    },
    handlecloseclick(){
        // console.log(this.data)
        this.$emit('myinfoclose')
    },
    handleCancel(){
        return;
    }
  }
}
</script>