# vue-admin-template

> 这是一个极简的 vue admin 管理后台。它只包含了 Element UI & axios & iconfont & permission control & lint，这些搭建后台必要的东西。

[国内访问](https://panjiachen.gitee.io/vue-admin-template)

## Build Setup

```bash
# 安装依赖
npm install

# 建议不要直接使用 cnpm 安装以来，会有各种诡异的 bug。可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm run dev
```

浏览器访问 [http://localhost:9528](http://localhost:9528)

## 发布

```bash
# 构建测试环境
npm run build:stage

# 构建生产环境
npm run build:prod

# 大包大小检测
npm run analyz
```

## 其它

```bash
# 预览发布环境效果
npm run preview

# 预览发布环境效果 + 静态资源分析
npm run preview -- --report

# 代码格式检查
npm run lint

# 代码格式检查并自动修复
npm run lint -- --fix
```


https://github.com/PanJiaChen/vue-element-admin/blob/master/README.zh-CN.md

富文本编辑器：vue+ueditor，沿用之前的富文本编辑器

导出excel：要导出所有数据，只能后端传文件，前端a标签下载

table更多下拉框：Dropdown 下拉菜单，自定义

vuex持久化：路由和权限部分，发现没有vuex后重新从接口拉数据

页面路由：后台传值，即时渲染

角色拥有路由权限：树形结构控制，将选中的内容，meta: { title: 'menu2', roles: ['edito'] }添加删除权限
	之前的权限管理，页面权限已经配置，按钮的权限是否需要逐个配置还需商议

路由渲染：根据权限，重新对比路由表，然后显示

接口：baseURL: 'http://localhost:1234' + process.env.VUE_APP_BASE_API, // url = base url + request url
