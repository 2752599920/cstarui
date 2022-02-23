# cstarui

[TOC]

## 安装

```
npm install cstarui
```

## 引入组件


```js
// main.js 
import Vue from "vue";
import App from "./App.vue";

// 全局引入
import cstarui from "cstarui/packages";
Vue.use(cstarui);

...其他业务逻辑
```



## CTable 使用

本组件基于 `el-table ` 二次开发

`<c-table></c-table>` or `<CTable></CTable>` 

```html
 <CTable
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
	  <!-- 展开行 案例 -->
      <template v-slot:expand="{ row }">
        <div
          style="display: flex; align-items: center; justify-content: center"
        >
          <span>用户名称：</span>
          <span>{{ row.name }}</span>
        </div>
      </template>
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
    </CTable>
...
<script>
  ... 省略部分代码
data() {
    return {
      columns: [
        {
          type: "selection",
          width: 55,
          fixed: "left",
          align: "center"
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
		  "min-width": "200px", // 或者 minWidth:"200px",
        },
        {
          label: "操作",
          slot: "operate",
          fixed: "right",
          align: "center"
        }
      ],
      datas: [
        {
          id: 1,
          name: "test1"
        },
        {
          id: 2,
          name: "test2"
        }
      ],
      options:{
        border: true,
        headerCellStyle: {
          backgroundColor: '#409eff',
          color: '#fff',
        },
        pagination: true,
        stripe: true,
        // 支持 el-table除data的所有Attr
        // 如 ： 使用max-height的话，可以配置maxHeight或者"max-height" 
        // 包含 - 符号的属性 需要驼峰写法或者加双引号
	  },
      pagination: {
        page: 1,
        size: 10,
        total: 2,
        sizes: [5, 10, 15, 20, 25, 30],
        background: true,
        layout: "total, sizes, prev, pager, next, jumper"
      },
    };
  },
    ...
   methods: {
        ...
          // 选择状态变化事件
          handleChangeSelect(val) {
            console.log(val);
          },
          // 表格显示数据量变化事件
          handleSizeChange(val) {
            this.pagination.size = val.size;
          },
          // 表格页码变化事件
          handleCurrentChange(val) {
            this.pagination.page = val.page;
          }
  		...
   }
</script>
```

### CTable  Attributes

| 参数         | 说明      |   类型   |                   可选项                    | 默认值                                      |
| :--------- | :------ | :----: | :--------------------------------------: | ---------------------------------------- |
| columns    | 列表配置项   | Array  | 详细配置见 [CTable  Columns](#CTable  Columns) | []                                       |
| datas      | 表格数据    | Array  |                    --                    | []                                       |
| options    | 扩展配置    | Object | 详细配置见 [CTable  Options](#CTable  Options) | {pagination: true,border: true,stripe: false} |
| pagination | 分页选择器配置 | Object | 详细配置见[CTable Pagination](#CTable  Pagination) | {page: 1,size: 10,total: 0,sizes: [5, 10, 15, 20, 25, 30],background: true,layout: "total, sizes, prev, pager, next, jumper",} |
| ...待更新     | ...     |  ...   |                   ...                    | ...                                      |

### CTable  Columns

`基于 element ui table-column 的除 slot 外的所有 Attributes`

| 参数     | 说明                                       |      类型       |          可选项           | 默认值  |
| ------ | ---------------------------------------- | :-----------: | :--------------------: | :--: |
| type   | 对应列的类型。如果设置了 `selection` 则显示多选框；如果设置了 `index` 则显示该行的索引（从 1 开始计算）；如果设置了 `expand` 则显示为一个可展开的按钮 |    String     | selection/index/expand |  --  |
| label  | 显示的标题                                    |    String     |           --           |  --  |
| prop   | 对应列内容的字段名（可使用插槽自定义）                      |    String     |           --           |  --  |
| width  | 对应列的宽度                                   | String/Number |           --           |  --  |
| slot   | 自定义插槽（使用参考 [CTable  Slot](#CTable  Slot) ） |    String     |           --           |  --  |
| ...待更新 | ...                                      |      ...      |          ...           | ...  |

### CTable  Options  

`基于 element ui table 的除 data 外的所有 Attributes ,增加了pagination 属性`

| 参数         | 说明           |   类型    |    可选项     |  默认值  |
| ---------- | ------------ | :-----: | :--------: | :---: |
| pagination | 是否需要分页器      | Boolean | true/false | true  |
| border     | 是否带有纵向边框     | Boolean | true/false | true  |
| stripe     | 是否为斑马纹 table | Boolean | true/false | false |
| ...待更新     | ...          |   ...   |    ...     |  ...  |

### CTable  Pagination

| 参数         | 说明      |   类型    |    可选项     |                   默认值                   |
| ---------- | ------- | :-----: | :--------: | :-------------------------------------: |
| page       | 当前页码    | Number  |     --     |                    1                    |
| size       | 当前页面数据量 | Number  |     --     |                   10                    |
| total      | 数据总数    | Number  |     --     |                    0                    |
| sizes      | 页面数据量选项 |  Array  |     []     |         [5, 10, 15, 20, 25, 30]         |
| background | 是否填充背景  | Boolean | true/false |                  true                   |
| layout     | 分页器布局   | String  |     --     | total, sizes, prev, pager, next, jumper |
| ...待更新     | ...     |   ...   |    ...     |                   ...                   |

### CTable  Events

`基于 element ui table 的所有 Events,增加了 size-change 和 current-change事件`

| 事件名              | 说明                  | 参数         |
| ---------------- | ------------------- | ---------- |
| selection-change | 当选择项发生变化时会触发该事件     | selection  |
| size-change      | 当`size`发生变化的时候触发该事件 | pagination |
| current-change   | 当`page`发生变化的时候触发该事件 | pagination |
| ...待更新           | ...                 | ...        |

### CTable  Slot 

| name               | 说明                                       | 插槽属性                 |
| ------------------ | ---------------------------------------- | :------------------- |
| ${prop/slot}Header | 表头插槽                                     | { index,column }     |
| --                 | 自定义插槽插槽名只能是slot属性或者prop属性的值，如果同一列这两个属性同时拥有，优先生效该列配置的slot属性对应的插槽 | { row,index,column } |
| expand             | 展开行插槽                                    | { row,index,column } |
| append             | 插入至表格最后一行之后的内容，若表格有合计行，该 slot 会位于合计行之上。  | --                   |

```html
<!-- 假设有一列配置为{prop:'id'} 则可设置如下插槽 -->
<template v-slot:idHeader="{ column,index }">
  <span style="color: #ffaaee">
    <span>表头标题{{ column.label }}</span>
    <span>表头索引{{ index }}</span>
  </span>
</template>
<template v-slot:id="{ row,index,column }">
  <span>索引{{index}}</span>
  <span>行数据{{row}}</span>
  <span>列数据{{column}}</span>
</template>
<!-- 假设有一列配置为{type:'expand'} 则可设置如下插槽 -->
<template v-slot:expand="{ row,index,column }">
  <span>索引{{index}}</span>
  <span>行数据{{row}}</span>
  <span>列数据{{column}}</span>
</template>
<!-- 插入至表格最后一行之后的内容 -->
<template slot="append">
  <div style="padding: 20px">
    append插槽
    插入至表格最后一行之后的内容，如果需要对表格的内容进行无限滚动操作，可能需要用到这个
    slot。若表格有合计行，该 slot 会位于合计行之上。
  </div>
</template>
```