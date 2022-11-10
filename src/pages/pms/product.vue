<template>
  <el-table :data="list" style="width: 100%">
    <el-table-column prop="id" label="编号" width="80" />
    <el-table-column prop="name" label="名称" />
    <el-table-column prop="subTitle" label="描述" />
  </el-table>
</template>

<script lang="ts">
import { reactive, ref, toRefs } from "vue";
import { getlistAll } from "../../http/goods";
export default {
  name:"product",
  setup() {
    interface listItf {
      id: number;
      name: string;
      subtitle: string;
      showStatus: boolean;
    }
    let data = reactive<{
      list: listItf[];
    }>({
      list: [],
    });
    getlistAll()
      .then((res) => {
        data.list = res.data;
      })
      .catch((err) => {
        console.log(err);
      });
    return {
      ...toRefs(data),
    };
  },
};
</script>

<style lang="less" scoped></style>
