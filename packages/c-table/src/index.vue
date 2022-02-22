<template>
  <div class="c-table">
    <el-table
      :data="datas"
      style="width: 100%"
      v-bind="removePaginationAttr(options)"
      v-on="removePaginationEvent($listeners)"
    >
      <!-- @selection-change="handleChangeSelect" -->
      <template v-for="(col, ci) in columns">
        <el-table-column v-if="col.type" :key="ci" v-bind="col">
        </el-table-column>
        <el-table-column
          v-else-if="col.slot"
          :key="ci"
          v-bind="removeSlotAttr(col)"
        >
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
          <template v-slot="scope">
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
  data() {
    return {};
  },
  created() {},
  mounted() {
    console.log(this.$listeners);
  },
  methods: {
    removeSlotAttr(col = {}) {
      const tmp = JSON.parse(JSON.stringify(col));
      delete tmp.slot;
      return tmp;
    },
    removePaginationAttr(options = {}) {
      const tmp = JSON.parse(JSON.stringify(options));
      delete tmp.pagination;
      return tmp;
    },
    removePaginationEvent(event = {}) {
      const tmp = JSON.parse(JSON.stringify(event));
      delete tmp["size-change"];
      delete tmp["current-change"];
      return tmp;
    },
    // handleChangeSelect(...args) {
    //   // console.log(...args);
    //   this.$emit("selection-change", ...args);
    // },
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