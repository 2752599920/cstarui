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

`<c-table></c-table>` or `<CTable></CTable>` 

```html
 <CTable
      :columns="columns"
      :datas="datas"
      :pagination="pagination"
      :options="options"
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
        // {
        //   type: "index",
        //   width: 55,
        //   fixed: "left",
        //   align: "center",
        // },
        {
          label: "ID",
          prop: "id",
          align: "center"
        },
        {
          label: "名称",
          prop: "name",
          align: "center"
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
        border:true,
        pagination:true,
        stripe:false,
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

| 参数         | 说明      |   类型   |          可选项           | 默认值                                      |
| :--------- | :------ | :----: | :--------------------: | ---------------------------------------- |
| columns    | 列表配置项   | Array  |  详细配置见CTable Columns   | []                                       |
| datas      | 表格数据    | Array  |           --           | []                                       |
| options    | 扩展配置    | Object |  详细配置见CTable Options   | {pagination: true,border: true,stripe: false} |
| pagination | 分页选择器配置 | Object | 详细配置见CTable Pagination | {page: 1,size: 10,total: 0,sizes: [5, 10, 15, 20, 25, 30],background: true,layout: "total, sizes, prev, pager, next, jumper",} |
| ...待更新     | ...     |  ...   |          ...           | ...                                      |

### CTable  Columns

| 参数     | 说明                                       |      类型       |          可选项           | 默认值  |
| ------ | ---------------------------------------- | :-----------: | :--------------------: | :--: |
| type   | 对应列的类型。如果设置了 `selection` 则显示多选框；如果设置了 `index` 则显示该行的索引（从 1 开始计算）；如果设置了 `expand` 则显示为一个可展开的按钮 |    String     | selection/index/expand |  --  |
| label  | 显示的标题                                    |    String     |           --           |  --  |
| prop   | 对应列内容的字段名（可使用插槽自定义）                      |    String     |           --           |  --  |
| width  | 对应列的宽度                                   | String/Number |           --           |  --  |
| slot   | 自定义插槽（使用参考 CTable  Slot）                 |    String     |           --           |  --  |
| ...待更新 | ...                                      |      ...      |          ...           | ...  |

### CTable  Options

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

| 事件名              | 说明                  | 参数         |
| ---------------- | ------------------- | ---------- |
| selection-change | 当选择项发生变化时会触发该事件     | selection  |
| size-change      | 当`size`发生变化的时候触发该事件 | pagination |
| current-change   | 当`page`发生变化的时候触发该事件 | pagination |
| ...待更新           | ...                 | ...        |

### CTable  Slot 

```html
<template v-slot:[自定义的插槽值（只能是prop/slot设置的值）]="{ row,index,column }">
        <span>索引{{index}}</span>
        <span>行数据{{row}}</span>
        <span>列数据{{column}}</span>
</template>
```