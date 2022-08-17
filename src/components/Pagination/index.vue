<template>
  <div class="pagination">
    <button :disabled="PageNo==1" @click="$emit('getPageNo',PageNo-1)" :class="{active:PageNo==1}">上一页</button>
    <button v-if="StartANDEnd.start>1" @click="$emit('getPageNo',1)">1</button>
    <button v-if="StartANDEnd.start>2">···</button> 

    <button v-for="(page,index) in StartANDEnd.end" :key="index" v-if="page>=StartANDEnd.start" @click="$emit('getPageNo',page)" :class="{active:PageNo==page}">{{page}}</button>
    
    <button v-if="StartANDEnd.end<totalPage-1">···</button>
    <button v-if="StartANDEnd.end<totalPage" @click="$emit('getPageNo',totalPage)" :class="{active:PageNo==totalPage}">{{totalPage}}</button>
    <button :disabled="PageNo==totalPage" @click="$emit('getPageNo',PageNo+1)">下一页</button>
    
    <button style="margin-left: 30px">共{{total}}条</button>
  </div>
</template>

<script>
export default {
  name: "Pagination",
  props: ["PageNo", "PageSize", "total", "continues"],
  computed: {
    totalPage() {
      return Math.ceil(this.total / this.PageSize);
    },
    StartANDEnd() {
      const { continues, PageNo, totalPage } = this;
      let start = 0;
      let end = 0;
      //先确定页数小于连续页数的情况
      if (continues > totalPage) {
        start = 1;
        end = totalPage;
      }else{
         //再确定页数大于连续页数的情况
      start = PageNo - parseInt(continues / 2);
      end = PageNo + parseInt(continues / 2);

      if (start < 1) {
        start = 1;
        end = continues;
      }
      if (end > totalPage) {
        start = totalPage - continues+1;
        end = totalPage;
      }
      }
     
      return { start, end };
    },
  },
};
</script>

<style lang="less" scoped>
.pagination {
  text-align: center;

  button {
    margin: 0 5px;
    background-color: #f4f4f5;
    color: #606266;
    outline: none;
    border-radius: 2px;
    padding: 0 4px;
    vertical-align: top;
    display: inline-block;
    font-size: 13px;
    min-width: 35.5px;
    height: 28px;
    line-height: 28px;
    cursor: pointer;
    box-sizing: border-box;
    text-align: center;
    border: 0;

    &[disabled] {
      color: #c0c4cc;
      cursor: not-allowed;
    }

    &.active {
      
      background-color: #409eff;
      color: #fff;
    }
  }
}
</style>