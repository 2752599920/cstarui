// 导入组件，组件必须声明 name
import CTable from './src'

// 为组件提供 install 安装方法，供按需引入
CTable.install = function (Vue) {
  Vue.component(CTable.name, CTable)
}

// 导出组件
export default CTable