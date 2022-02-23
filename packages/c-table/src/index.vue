<template>
  <div class="c-table">
    <el-table
      ref="CTable"
      :data="datas"
      style="width: 100%"
      v-bind="removeOtherAttr({ obj: options, remove: ['pagination'] })"
      v-on="
        removeOtherAttr({
          obj: $listeners,
          remove: ['size-change', 'current-change'],
        })
      "
    >
      <template v-for="(col, ci) in columns">
        <el-table-column v-if="col.type" :key="ci" v-bind="col">
          <template v-slot="scope" v-if="col.type == 'expand'">
            <slot
              name="expand"
              :row="scope.row"
              :column="col"
              :index="scope.$index"
            />
          </template>
        </el-table-column>
        <el-table-column
          v-else-if="col.slot"
          :key="ci"
          v-bind="removeOtherAttr({ obj: col, remove: ['slot'] })"
        >
          <template slot="header" slot-scope="scope">
            <slot
              :name="`${col.slot}Header`"
              :column="col"
              :index="scope.$index"
            >
              {{ col.label }}
            </slot>
          </template>
          <template v-slot="scope">
            <slot
              :name="col.slot"
              :row="scope.row"
              :column="col"
              :index="scope.$index"
            />
          </template>
        </el-table-column>
        <el-table-column v-else-if="col.prop" :key="ci" v-bind="col">
          <template slot="header" slot-scope="scope">
            <slot
              :name="`${col.prop}Header`"
              :column="col"
              :index="scope.$index"
            >
              {{ col.label }}
            </slot>
          </template>
          <template v-slot="scope" v-if="!col.formatter">
            <slot
              :name="col.prop"
              :row="scope.row"
              :column="col"
              :index="scope.$index"
            >
              <template v-if="col.prop">
                {{ scope.row[col.prop] }}
              </template>
            </slot>
          </template>
        </el-table-column>
      </template>
      <template v-slot:append>
        <slot name='append'/>
      </template>
    </el-table>
    <div class="c-pagination" v-if="options.pagination">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pagination.page"
        :page-sizes="pagination.sizes"
        :page-size="pagination.size"
        :background="pagination.background"
        :layout="pagination.layout"
        :total="pagination.total"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { Table, TableColumn, Pagination } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
export default {
  name: "CTable",
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Pagination.name]: Pagination,
  },
  props: {
    columns: {
      type: Array,
      default: () => {
        return [];
      },
    },
    datas: {
      type: Array,
      default: () => {
        return [];
      },
    },
    options: {
      type: Object,
      default: () => {
        return {
          pagination: true,
          border: true,
          stripe: false,
        };
      },
    },
    pagination: {
      type: Object,
      default: () => {
        return {
          page: 1,
          size: 10,
          total: 0,
          sizes: [5, 10, 15, 20, 25, 30],
          background: true,
          layout: "total, sizes, prev, pager, next, jumper",
        };
      },
    },
  },
  methods: {
    // 移除不需要的属性
    removeOtherAttr({ obj = {}, remove = [] }) {
      const tmp = { ...obj };
      remove.map((attr) => {
        delete tmp[attr];
      });
      return tmp;
    },
    // 用于多选表格，清空用户的选择
    clearSelection(){
      return this.$refs.CTable.clearSelection();
    },
    // 用于多选表格，切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
    toggleRowSelection(...args){
      return this.$refs.CTable.toggleRowSelection(...args);
    },
    // 用于多选表格，切换所有行的选中状态
    toggleAllSelection(){
      return this.$refs.CTable.toggleAllSelection();
    },
    // 用于可展开表格与树形表格，切换某一行的展开状态，如果使用了第二个参数，则是设置这一行展开与否（expanded 为 true 则展开）
    toggleRowExpansion(...args){
      return this.$refs.CTable.toggleRowExpansion(...args);
    },
    // 用于单选表格，设定某一行为选中行，如果调用时不加参数，则会取消目前高亮行的选中状态。
    setCurrentRow(...args){
      return this.$refs.CTable.setCurrentRow(...args);
    },
    // 用于清空排序条件，数据会恢复成未排序的状态
    clearSort(){
      return this.$refs.CTable.clearSort();
    },
    // 不传入参数时用于清空所有过滤条件，数据会恢复成未过滤的状态，也可传入由columnKey组成的数组以清除指定列的过滤条件
    clearFilter(...args){
      return this.$refs.CTable.clearFilter(...args);
    },
    // 对 Table 进行重新布局。当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法
    doLayout(){
      return this.$refs.CTable.doLayout();
    },
    // 手动对 Table 进行排序。参数prop属性指定排序列，order指定排序顺序。
    sort(...args){
      return this.$refs.CTable.sort(...args);
    },
    // 表格显示数据量变化事件
    handleSizeChange(val) {
      const pagination = { ...this.pagination };
      pagination.size = val;
      this.$emit("size-change", pagination);
    },
    // 表格页码变化事件
    handleCurrentChange(val) {
      const pagination = { ...this.pagination };
      pagination.page = val;
      this.$emit("current-change", pagination);
    },
  },
};
</script>

<style lang='scss' scoped>
.c-table {
  .c-pagination {
    width: 100%;
    margin-top: 10px;
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
}
</style>