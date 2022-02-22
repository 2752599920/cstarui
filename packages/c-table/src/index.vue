<template>
  <div class="c-table">
    <el-table
      :data="datas"
      style="width: 100%"
      :border="options.border"
      :stripe="options.stripe"
      @selection-change="handleChangeSelect"
    >
      <template>
        <template v-for="(col, ci) in columns">
          <span :key="ci">
            <el-table-column
              v-if="col.type"
              :type="col.type"
              :width="col.width || 55"
              :fixed="col.fixed || false"
              :align="col.align || 'left'"
            ></el-table-column>
            <el-table-column
              v-else-if="col.slot"
              :label="col.label"
              :width="col.width"
              :fixed="col.fixed || false"
              :align="col.align || 'left'"
            >
              <template v-slot="scope">
                <slot
                  :name="col.slot"
                  :row="scope.row"
                  :column="col"
                  :index="ci"
                />
              </template>
            </el-table-column>
            <el-table-column
              v-else-if="col.prop"
              :label="col.label"
              :width="col.width"
              :fixed="col.fixed || false"
              :align="col.align || 'left'"
            >
              <template v-slot="scope">
                <slot
                  :name="col.prop"
                  :row="scope.row"
                  :column="col"
                  :index="ci"
                >
                  {{ scope.row[col.prop] }}
                </slot>
              </template>
            </el-table-column>
          </span>
        </template>
      </template>
    </el-table>
    <template v-if="options.pagination">
      <div class="c-pagination">
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
    </template>
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
  mounted() {},
  methods: {
    handleChangeSelect(...args){
      // console.log(...args);
      this.$emit('selection-change',...args)
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