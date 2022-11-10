<template>
  <div class="selectedBox">
    <el-radio-group v-model="selectName" @change="dayChange">
      <el-radio-button label="sale_">销量</el-radio-button>
      <el-radio-button label="_money">销售额</el-radio-button>
    </el-radio-group>
    <el-select v-model="selectDay" @change="dayChange">
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
  <div id="main" style="width:100%; height: 400px;"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { reactive, toRefs, watch } from "vue";

const props = defineProps<{
  data: {}[];
}>();
const state=reactive({
  selectName:'_money',
  selectDay:'today',
  options:[{
    label:'今天',value:'today'
  },{
    label:'昨天',value:'yesterday'
  },{
    label:'前3天',value:'three_days'
  },{
    label:'前七天',value:'seven_days'
  }]
})
const {selectDay,options,selectName} = toRefs(state)
const dayChange=()=>{
  initData()
}
let myChart
const initData=()=>{
  let key=''
  if(selectName.value==='_money'){
    key=selectDay.value+selectName.value
  }else{
    key=selectName.value+selectDay.value
  }
  const arr = props.data.map((item:{[key:string]:string}) => ({
      value: item[key],
      name: item.name,
    }));
    // 基于准备好的dom，初始化echarts实例
    myChart = echarts.init(document.getElementById("main") as HTMLElement);

    // 指定图表的配置项和数据
    const option = {
      tootip:{
        trigger:'item'
      },
      legend:{
        top:20,
        right:-90,
        width:300,
        height:100,
        orient:'vertical'
      },
      title: {
        text: "",
        left: "center",
        top: "center",
      },
      series: [
        {
          type: "pie",
          data: arr,
          center:['30%','50%'],
          radius: ["40%", "70%"],
        },
      ],
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}
watch(()=>props.data,()=>{
  initData()
});
</script>

<style lang="less" scoped>
.selectedBox{
  display: flex;
  justify-content: flex-start;
  .el-select{
    margin-left: 20px;
  }
}
</style>
