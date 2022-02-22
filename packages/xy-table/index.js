// 导入组件，组件必须声明 name
import XyTable from './src'

// 为组件提供 install 安装方法，供按需引入
XyTable.install = function (Vue) {
  Vue.component(XyTable.name, XyTable)
}

// 导出组件
export default XyTable