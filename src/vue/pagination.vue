<template>
	<ul class="pages" v-if="count!=0">
		<li class="page-item" v-if="pageNo!=first" @click="gotoPage(pageNo-1)">上一页</li>
		<li class="page-item" v-if="first<pageItemList[0]" @click="gotoPage(first)">{{first}}</li>
		<strong v-if="pageItemList[0]-first>1">...</strong>
		<li v-for="item in pageItemList" class="page-item" :class="{active:pageNo==item}" :key="item" @click="gotoPage(item)">
			{{item}}
		</li>
		<strong v-if="end-pageItemList[pageItemList.length-1]>1">...</strong>
		<li class="page-item" v-if="end>pageItemList[pageItemList.length-1]" @click="gotoPage(end)">{{end}}</li>
		<li class="page-item" v-if="pageNo!=end" @click="gotoPage(pageNo+1)">下一页</li>
	</ul>
</template>
<script>
export default {
  name: "pagination",
  data: function() {
    return {};
  },
  props: {
    index: {
      //每一页中第一个数据在所有数据的位置
      default: 0
    },
    count: {
      //所有数据的总数
      default: 0
    },
    pageSize: {
      //每一页的数据容量：一页包含多少数据
      default: 10
    },
    size: {
      // 分页工具中，最多显示多少个页数：2×size+1;
      default: 3
    }
  },
  computed: {
    first: function() {
      /**用于计算第一页页码 */
      if (this.count != 0) {
        return 1;
      }
      return 0;
    },
    end: function() {
      /**用于计算最后一页的页码 */
      return Math.ceil(this.count / this.pageSize);
    },
    pageNo: function() {
      /**返回当前页码 */
      if (this.count == 0) return 0;
      return Math.ceil(this.index / this.pageSize);
    },
    pageCount: function() {
      /**返回所有页码的数量，理论上应该与end相同 */
      return Math.ceil(this.count / this.pageSize);
    },
    pageItemList: function() {
      /**显示的页码列表 */
      if (this.count == 0) return [];
      let first = 1;
      let end = Math.ceil(this.count / this.pageSize);
      let afirst = this.pageNo - this.size;
      let d = 0;
      if (afirst <= 0) {
        d = 1 - afirst;
        afirst = 1;
      }
      let aend = this.pageNo + this.size + d;
      if (aend > end) {
        aend = end;
      }
      if (aend - afirst < 2 * this.size) {
        if (this.pageCount - this.pageNo < 3 && afirst != 1) {
          afirst -= 2 * this.size - aend + afirst;
          if (afirst < 1) {
            afirst = 1;
          }
        }
      }
      let list = [];
      for (let i = afirst; i <= aend; i++) {
        list.push(i);
      }
      return list;
    }
  },
  methods: {
    gotoPage: function(no) {
      /**点击页码函数 */
      if (no == this.pageNo) return;
      /**自定义跳转函数 */
      this.$emit("gotopage", no);
    }
  }
};
</script>
<style scoped>
.page-item {
  padding: 0.67em 1em;
  border: 1px solid #9cd0d8;
  border-radius: 7px;
  cursor: pointer;
}
.pages,
.page-item {
  list-style: none;
  margin: 0 4px;
  display: inline-block;
  font-size: 14px;
  font-weight: 700;
  vertical-align: middle;
}
.active {
  background-color: #9ca0d8;
  cursor: default;
}
.pages {
  padding: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>


