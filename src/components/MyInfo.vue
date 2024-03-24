<template>
    <el-dialog
    title="Tips"
    :visible="uservisible"
    :before-close="handlecloseclick"
    :overflow="false"
    :close-on-click-modal="false"
    width="65%"
    @open="open">
        <span v-if="myData.type && myData.type == 1">{{ myData.address }}</span>
        <span v-else>{{ myData.name }}</span>
        <span slot="footer" class="dialog-footer">
            <el-button @click="handleCancel">Cancel</el-button>
            <el-button type="primary" @click="handlecloseclick">Confirm</el-button>
        </span>
    </el-dialog>
</template>
<script>
export default {
  name: 'MainPage',
  props: {
    title: String,
    uservisible:Boolean,
    data: Object
  },
  data(){
    return{
        myData:{}
    }
  },
  methods:{
    open(){
        this.myData = this.data
        // console.log(this.myData)
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