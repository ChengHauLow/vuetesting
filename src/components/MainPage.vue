<template>
  <div class="hello">
    <el-card>
      <template #header>
        My Little Testing Only
      </template>
      <div class="tableHere">
        <BoardTable :boxWidth="tableWidth" :data="the_list"/>
      </div>
      <!-- <div class="item-li-titles">
        <div class="li-title" v-for="(title, titleIndex) in titles" :key="`key-${titleIndex}-${title}`">{{ title }}</div>
      </div>
      <div class="content" ref="contentRef" @scroll="handleScroll">
        <div class="fakeContent" :style="{'height':`${total*lineHeight}px`}"></div>
        <div class="item-box">
          <div class="item-li" v-for="(item, index) in visibleList" :key="index">
            <div class="cell">
              <span :class="{'active':item.is_active}" v-for="(value, valueIndex) in Object.values(item).filter((v,vIndex)=>vIndex!==0)" :key="`value-${valueIndex}-${title}`">{{value}}</span>
            </div>
          </div>
        </div>
      </div> -->
    </el-card>
  </div>
</template>

<script>
import BoardTable from './BoardTable.vue';
export default {
  components:{
    BoardTable
  },
  name: 'MainPage',
  data(){
    return{
      latestData:[],
      user:null,
      total:10000,
      lineHeight:55,
      bufferSize:2,
      the_list:[],
      visibleList:[],
      titles:[],
      list:[],
      tableWidth:500,
    }
  },
  methods:{
    getBoxWidth(){
      this.tableWidth = this.$el.querySelector('.tableHere').clientWidth
    },
    
    generateRandomNumber(min, max){
      return Math.floor(Math.random()*(max-min+1))+min;
    }
  },
  created(){
    for (let i = 0; i < this.total; i++) {
      this.the_list.push({
        id:i+1,
        name:`omg-${i}`,
        phone:`phone-${i}`,
        address:`address-${i}`,
        is_active:true
      })
    }
    setInterval(()=>{
      for (let i = 0; i < this.total; i++) {
        this.list.push({
          id:i+1,
          name:`omg-${i}`,
          phone:`phone-${this.generateRandomNumber(21,30)}`,
          address:`address-${this.generateRandomNumber(31,40)}`,
          is_active:true
        })
      }
      this.the_list = this.list;
      this.list = [];
    }, 1000)
    // this.titles = Object.keys(this.the_list[0]).filter((v,vIndex)=>vIndex!==0);
  },
  mounted(){
    this.getBoxWidth();
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.hello{
  h1{
    color: red;
  }
  width: 100%;
  height: 100%;
  .tableHere{
    width: 100%;
    max-width: 800px;
    height: 100%;
  }
}
</style>
