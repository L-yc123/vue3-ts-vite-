<template>
  <div>
    <div id="map" style="width: 100%; height: 400px"></div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import china from "../../../data/china.json";
import { watch } from "vue";
echarts.registerMap("china", china as any);

const props = defineProps<{
  data: {}[];
}>();
let myMap: echarts.ECharts;
watch(
  () => props.data,
  () => {
    const data = props.data.map((item: { [key: string]: string | number }) => ({
      name: item.areaName,
      value: item.saleNum,
    })
    );
    
    if (!myMap) {
      myMap = echarts.init(document.getElementById("map") as HTMLElement);
      const options = {
        tooltip: {
          show: true,
          formatter:'{b0} <br/>销量：{c0}',
          backgroundColor:'rgba(50,50,50,.5)',
          textStyle: {
            color:'#fff'
          }
        },
        series: {
          type: "map",
          map: "china",
          emphasis: {
            label: { show: false },
            itemStyle: {
              areaColor: "red",
            }
          },
          itemStyle: {
            borderColor: "#fff",
          },
          data,
        },
        visualMap:{
            type:'continuous',
            min:0,
            max:100000,
            calculable:true
        }
      };
      myMap.setOption(options);
    }
  }
);
</script>

<style scoped></style>
