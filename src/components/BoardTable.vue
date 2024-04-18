<template>
  <div class="table_wrap" :style="{'width':`${parseInt(boxWidth)}px`,'height':'550px','border-bottom':'#2d9f75 0.5px solid','overflow':'hidden'}">
    <div class="item-li-titles" :style="{'width':`${parseInt(boxWidth)-1.1}px`}">
      <div class="li-title" v-for="(title, titleIndex) in titles" :key="`key-${titleIndex}-${title}`">{{ title }}</div>
    </div>
    <div class="content" ref="contentRef" @scroll="handleScroll">
      <div class="fakeContent" :style="{'height':`${total*lineHeight}px`}"></div>
      <div class="item-box">
        <div class="item-li" v-for="(item, index) in visibleList" :key="index">
          <div class="cell">
            <span :class="{'active':item.is_active}" v-for="(value, valueIndex) in Object.values(item).filter((v,vIndex)=>vIndex!==0)" :key="`value-${valueIndex}-${value}`">{{value}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BoardTable',
  props: {
    boxWidth:{
      default: 500
    },
    total:{
      type: Number,
      default: 10000
    },
    data:{
      type: Array
    }
  },
  watch:{
    data(newVal){
      this.updateData(newVal);
    },
    // visibleList(newVal){
    //   console.log(newVal);
    // }
  },
  data(){
    return{
      latestData:[],
      user:null,
      lineHeight:55,
      bufferSize:2,
      the_list:[],
      visibleList:[],
      titles:[],
      updateList:[]
    }
  },
  methods:{
    updateVisibleList(){
      let content = this.$el.querySelector('.content');
      let itemBox = this.$el.querySelector('.item-box');
      let start = Math.floor(content.scrollTop / this.lineHeight);
      let end = start + Math.ceil(content.clientHeight/this.lineHeight) + this.bufferSize;
      this.visibleList = this.the_list.slice(start, end);
      itemBox.style.top = `${start * this.lineHeight}px`;
    },
    updateData(data){
      if(this.updateList.length < 1){
        this.updateList = data;
        if(this.updateList.length>0){
          for (let i = 0; i < this.updateList.length; i++) {
            this.visibleList.map(v=>{
              if(v.id === this.updateList[i].id){
                v.name = this.updateList[i].name;
                v.phone = this.updateList[i].phone;
                v.address = this.updateList[i].address;
                return v
              }
            })
            if(i == this.updateList.length-1){
              this.updateList = [];
            }
          }
        }
      }
    },
    handleScroll(){
      this.updateVisibleList();
    },
    generateRandomNumber(min, max){
      return Math.floor(Math.random()*(max-min+1))+min;
    }
  },
  created(){
    if(this.the_list < 1){
      this.the_list = this.data;
      this.titles = Object.keys(this.data[0]).filter((v,vIndex)=>vIndex!==0);
    }
    // setInterval(()=>{
    //   for (let i = 0; i < this.total; i++) {
    //     this.updateList.push({
    //       id:i+1,
    //       name:`omg-${i}`,
    //       phone:`phone-${this.generateRandomNumber(21,30)}`,
    //       address:`address-${this.generateRandomNumber(31,40)}`,
    //       is_active:true
    //     })
    //   }
    //   if(this.updateList.length>0){
    //     for (let i = 0; i < this.updateList.length; i++) {
    //       this.visibleList.map(v=>{
    //         if(v.id === this.updateList[i].id){
    //           v.name = this.updateList[i].name;
    //           v.phone = this.updateList[i].phone;
    //           v.address = this.updateList[i].address;
    //           return v
    //         }
    //       })
    //       if(i == this.updateList.length-1){
    //         this.updateList = [];
    //       }
    //     }
    //   }
    // }, 1000)
  },
  mounted(){
    this.updateVisibleList();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.table_wrap{
  .item-li-titles{
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .li-title{
        width: 100%;
        height: 55px;
        line-height: 55px;
        border-left:#2d9f75 0.5px solid;
        border-top:#2d9f75 0.5px solid;
        &:last-child{
          border-right:#2d9f75 0.5px solid;
        }
      }
    }
  .content{
    width: 100%;
    height: 100%;
    overflow: auto;
    border-bottom: #2d9f75 1px solid;
    border-top: #2d9f75 1px solid;
    position: relative;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 3px;
      background: #ccc;
      position: absolute;
      left: 0;
      bottom: 0;
      right: -10px;
      top: 0;
    }
    &::-webkit-scrollbar-thumb{
      background: #111;
    }
    .item-box{
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      .item-li{
        width: 100%;
        text-align: center;
        height: 55px;
        line-height: 55px;
        border-left: #2d9f75 1px solid;
        border-bottom: #2d9f75 1px solid;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        // &:first-child{
        //   border-top: #2d9f75 1px solid;
        // }
        .cell{
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          span{
            width: 100%;
            text-align: center;      
            border-right: #2d9f75 1px solid;
          }
        }
      }
    }
  }
}
</style>
