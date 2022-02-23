<template>
  <div class="table">
    <c-table
      :columns="columns"
      :datas="datas"
      :options="options"
      :pagination="pagination"
      @selection-change="handleChangeSelect"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
      <!-- 自定义 表头 -->
      <!-- 
          使用规则 columns 配置项的 slot/prop 属性加 Header 即 v-slot:[`${slot}Header`] / `${prop}Header` 
          如：columns:[{prop:'name',label:'名称'},{slot:'operate',label:'操作'}]
          使用自定义表头插槽示例 
          <template v-slot:nameHeader="{column}">
          </template>
          <template v-slot:operateHeader="{column}">
          </template>
       -->
      <template v-slot:idHeader="{ column }">
        <span style="color: #ffaaee">
          {{ column.label }}
        </span>
      </template>
      <template v-slot:nameHeader="{ column }">
        测试自定义表头： {{ column.label }}
      </template>
      <template v-slot:operateHeader="{ column }">
        测试自定义表头： {{ column.label }}
      </template>
      <!-- 展开行 案例 -->
      <template v-slot:expand="{ row }">
        <div
          style="display: flex; align-items: center; justify-content: center"
        >
          <span>用户名称：</span>
          <span>{{ row.name }}</span>
        </div>
      </template>
      <!-- 插槽 案例 -->
      <template v-slot:operate="{ row }">
        <div
          style="
            width: 200px;
            background: #409eff;
            color: #fff;
            padding: 4px 8px;
            border-radius: 4px;
            cursor: pointer;
            user-select: none;
          "
        >
          自定义操作插槽{{ row.id }}
        </div>
      </template>
      <template slot="append">
        <div style="padding: 20px">
          append插槽
          插入至表格最后一行之后的内容，如果需要对表格的内容进行无限滚动操作，可能需要用到这个
          slot。若表格有合计行，该 slot 会位于合计行之上。
        </div>
      </template>
    </c-table>
  </div>
</template>

<script>
export default {
  name: "Table",
  data() {
    return {
      columns: [
        {
          type: "selection",
          width: 55,
          fixed: "left",
          align: "center",
        },
        {
          type: "expand",
          width: 55,
          fixed: "left",
          align: "center",
        },
        {
          label: "ID",
          prop: "id",
          align: "center",
          minWidth: "80px",
          sortable:true,
          formatter: (row, column, cellValue, index) => {
            return `测试 formatter：${row.id}_${index}`;
          },
        },
        {
          label: "名称",
          prop: "name",
          align: "center",
          "min-width": "200px",
        },
        {
          label: "操作",
          slot: "operate",
          fixed: "right",
          align: "center",
        },
      ],
      options:{
        border: true,
        headerCellStyle: {
          backgroundColor: '#409eff',
          color:'#fff'
        },
        pagination: true,
        stripe: true,
      },
      datas: [
        {
          id: 1,
          name: "test1",
        },
        {
          id: 2,
          name: "test2",
        },
      ],
      pagination: {
        page: 1,
        size: 10,
        total: 100,
        sizes: [5, 10, 15, 20, 25, 30],
        background: true,
        layout: "total, sizes, prev, pager, next, jumper",
      },
      test: [],
    };
  },
  created() {
    this.test = new Array(100)
      .fill(null)
      .map((e, i) => (e = { id: i + 1, name: `test_${i + 1}` }));
    this.datas = this.pageSplit({
      page: this.pagination.page,
      size: this.pagination.size,
      arr: this.test,
    }).list;
  },
  methods: {
    pageSplit({ page = 1, size = 10, arr = [] }, log = true) {
      // 拷贝需要分页的数组
      const tmp = JSON.parse(JSON.stringify(arr));
      // 初始化返回对象
      const res = {
        list: [],
        page: page,
        size: size,
        total: 0,
      };
      // 获取原始数据(Array)长度
      res.total = arr.length;
      // 控制页码（最小是1）
      page = page >= 1 ? page : 1;
      // 控制数量（最小是1）
      size = size >= 1 ? size : 1;
      // 精准控制返回数据记录数量
      if (page * size > res.total) {
        size = page == 1 ? res.total : res.total - (page - 1) * size;
      }
      // 截取返回数据长度
      res.list = tmp.splice((res.page - 1) * res.size, size);
      // 打印放回内容（默认打印）
      if (log) {
        console.log(res);
      }
      return res;
    },
    handleChangeSelect(val) {
      console.log(val);
    },
    // 表格显示数据量变化事件
    handleSizeChange(val) {
      this.pagination.size = val.size;
      this.datas = this.pageSplit({
        page: this.pagination.page,
        size: this.pagination.size,
        arr: this.test,
      }).list;
    },
    // 表格页码变化事件
    handleCurrentChange(val) {
      this.pagination.page = val.page;
      this.datas = this.pageSplit({
        page: this.pagination.page,
        size: this.pagination.size,
        arr: this.test,
      }).list;
    },
  },
};
</script>

<style>
</style>