<template>
  <div class="table">
    <c-table
      :columns="columns"
      :datas="datas"
      :options="{
        border:true,
      }"
      :pagination="pagination"
      @selection-change="handleChangeSelect"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    >
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
    </c-table>
  </div>
</template>

<script>
export default {
  name:'Table',
  data() {
    return {
      columns: [
        {
          type: "selection",
          width: 55,
          fixed: "left",
          align: "center",
        },
        // {
        //   type: "index",
        //   width: 55,
        //   fixed: "left",
        //   align: "center",
        // },
        {
          label: "ID",
          prop: "id",
          align: "center",
          minWidth:'80px'
        },
        {
          label: "名称",
          prop: "name",
          align: "center",
          'min-width':'200px'
        },
        {
          label: "操作",
          slot: "operate",
          fixed: "right",
          align: "center",
        },
      ],
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
        if (page == 1) {
          size = res.total;
        } else {
          size = res.total - (page - 1) * size;
        }
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

}
</script>

<style>

</style>