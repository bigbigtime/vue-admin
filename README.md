# VUE3.0体验版API，实战大公司级管理后台开发，正规军开发流程，了解各个角色开发环节


> 手把手撸码前端 专注于0基础入门教学，vue.js 3.0+Vuex+Router+Axios+ElementUI开发管理后台，建立在公司项目开发的基础上，以真实开发流程讲解项目，并将公司日常开发经验带到教学中。学习项目开发整体流程，原形、测试用例、团队协作，真实API业务接口，由0到1搭建管理后台，及各职位角色负责内容。并学习VUE.js API：Vue指令、组件、状态管理、脚手架、性能等核心功能；

手把手撸码前端 系列教程，专注于0基础入门教程，以公司实际上班场景开发项目，将工作场景带入视频教学中。

手把手撸码前端，课程内容由 HTML5+CSS3 0基础入门、响应式、javascript、vue、react、小程序等系列视频录制；涵盖web前端技术大部分企业实际应用项目；

***项目地址：https://github.com/bigbigtime/vue-admin***

***项目预览：http://vue-admin.web-jshtml.cn***

***官网：http://www.web-jshtml.cn***


## 功能描述

- [x] 登录、注册
- [x] 信息管理：列表、新增、编辑、删除
- [x] 文章详情页展示
- [x] 用户模块：列表、新增、编辑、删除
- [x] 动态路由：菜单权限（根据功能、角色分配）、按钮级权限
- [x] 七牛云图片第三方管理
- [x] vue组件化开发（核心）
- [x] axios拦截器
- [x] Elementui二次封装组件
- [x] ....

## 技术栈

- [x] vue
- [x] vuex
- [x] vue-router
- [x] elementUI
- [x] sass
- [x] axios
- [x] qiniu-js
- [x] sha1
- [x] nginx

## 视频录制内容

### 第1节 - 了解项目开发流程

- 第1学时 了解产品从0到1的开发流程，产品经理、UI设计师、研发部、测试工程师

### 第2节 - 构建vue项目、代码仓库管理

- 第2学时 安装node.js、vue3.0脚手架、创建github代码管理仓库、构建vue项目
- 第3学时 2.0与3.0的差异，vue.config.js、引入全局样式、router重定向、elementui依赖，git命令提交文件
- 第4学时 vue文件标准结构、v-for遍历、key、v-bind属性、@click事件、绑定class、基础数据类型、引用数据类型区别

### 第3节 - 登录功能、注册功能开发

- 第5学时 熟悉element-ui组件、制作表单验证、了解组件的用法
- 第6学时 封装校验js文件、webpack目录配置指向、export暴露方法、import引用、指令v-show、v-if的区别
- 第7学时 2.0语法转3.0、setup函数、reactive函数、ref函数、isRef、toRefs方法
- 第8学时 axios拦截器，模块管理API，export、export default的区别
- 第9学时 axios跨域配置、环境变量、接口文档
- 第10学时 登录接口接调试、响应拦截、elementui message、root参数
- 第10-1学时 登录接口接调试、响应拦截、elementui message、root参数
- 第11学时 按测试用例流程开发项目、注册接口联调、倒计时setTimeout、setInterval、超时timeout
- 第11-1学时
- 第11-2学时 登录接口调试、定时器知识点
- 第12学时 了解基础的Promise的方法、resolve、reject、all、race、then、catch
- 第13学时 请求头拦截、Request Headers添加参数、登录密码sha1加密、前端台加密流程、代码优化封装方法

### 第4节 - 了解学习内容

- 第14学时 简单了解vue学习目标，具体学习什么东西，了解基础的指令

### 第5节 后台管理框架搭建

- 第15学时 后台首页搭建、router路由跳转、children属性、components组件、局部组件引入
- 第16学时 elementui的el-menu组件生成路由菜单、定义全局elemenui样式表、修改组个样式
- 第17学时 svgIcon制作、全局组件Vue.component、父子组件传值props、propsData、计算属性computed
- 第17-1学时 完善后台首页布局

### 第6节 Vuex状态管理仓库、token登录检验

- 第18学时 Vuex、State、Getters、Mutations、菜单导航收起、展开
- 第18-1学时 cookie存储，sessionStorage存储、localStorage存储、JSON.parse、JSON.stringify
- 第18-2学时 Vuex的action异步、同步、modules模块管理状态数据
- 第19学时 router.beforeEach路由守卫，检测toKen是否非法进入后台，to、from参数、next方法、Vuex命名空间
- 第19-1学时 登录存储token、token存在基础逻辑进入后台
- 第19-2学时 退出后台清除token、防止非法进入、GIT代码合并、提交当天开发的代码

### 第7节 信息管理UI制作

- 第20学时 设计稿UI制作、element-ui组件、el-select、el-row、el-col、el-button
- 第20-1学时 设计稿UI制作、element-ui组件、el-table、el-pagination
- 第20-2学时 设计稿UI制作、element-ui组件、el-dialog、父子组件回调emit、修饰器sync、vue2.0、3.0写法、watch
- 第20-3学时 设计稿UI制作、element-ui组件、el-messageBox、自定义全局方法export install、VUE3.0组件重命名、watch
- 第20-4学时 设计稿UI制作、信息分类UI制作

### 第8节 信息管理功能开发、接口联调

- 第21学时 信息管理模块，一级分类接口、获取分类接口、onMounted、相关优化
- 第21-1学时 信息管理模块，删除接口、修改接口
- 第21-2学时 接口封装，vue3.0封装方式，vuex的actions方式，为后期维护方便
- 第21-3学时 添加信息接口、获取列表接口、分页处理请求数据、获取分类优化，变量优化
- 第21-4学时 单记录、批量删除接口、table组件数据加载优化、formatter属性返回值、日期组件配置数据格式、筛选条件处理
- 第21-5学时 信息编辑接口、添加子级分类接口、请求全部分类接口

### 第9节 项目原型学习、git命令

- 第21-6学时 原型学习、原型版本查看、GIT命令控制代码版本迭代、合并代码、创建新分支

### 第10节 信息管理详情页开发、接口联调

- 第22学时 router路由跳转、5种传参方式、vuex配合HTML5本地储存
- 第22-1学时 详细页数据读取、初始化数据、富文本编辑器、vue devTool依赖
- 第22-2学时 elementui upload组件结合七牛云第三方储存，七牛云建立空间、域名绑定、解析
- 第22-3学时 elementUI组件二次封装开发，组件封装的一些问题思考，什么时候需要watch，传参动态配置数据

### 第11节 用户管理功能开发

- 第23学时 用户管理功能迭代、git分支创建、日常工作中的日报、周报总结、项目的管理
- 第23-1学时 用户管理UI制作、elementUI el-select组件封装、参数配置、组件命名冲突

### 第12节 组件化开发模式

- 第23-2学时 真正理解vue组件化开发、组件概念、优势、全局组件component、局部组件import、从源头解决BUG
- 第23-3学时 vue生命周期，组件生命周期，3.0改写2.0组件
- 第23-4学时 vue3.0生命周期，封装el-table组件
- 第23-5学时 封装el-table组件，v-slot插槽3种方式，数据绑定
- 第23-6学时 封装el-table组件，数据请求，整合url请求地址，统一api文件夹管理
- 第23-7学时 封装el-table组件，业务逻辑的拆分、组合
- 第23-8学时 elementUI 页码组件、业务逻辑拆分页码，配置项
- 第23-9学时 vue2.0 mixins混入、按需混入、全局混入

### 第13节 用户管理功能

- 第24学时 省、市、区、街道组件封装、业务逻辑抽离
- 第24-1学时 省、市、区、街道组件封装、业务逻辑抽离
- 第24-2学时 省市区数据返回，el-radio、el-checkbox、获取角色管理API
- 第24-3学时 用户添加接口、json对象深拷贝、浅拷贝用法及注意事项
- 第24-4学时 组件通讯开始篇.sync、elemntUI Switch组件、用户列表、删除接口联调
- 第24-5学时 组件通讯完整版（重点知识）
- 第24-6学时 用户状态接口、编辑接口、搜索接口联调（上）
- 第24-7学时 用户状态接口、编辑接口、搜索接口联调（下）

### 第14节 动态路由开发

- 第25学时 动态路由开发，以系统分配路由，系统列表接口
- 第25-1学时 动态路由开发，以角色分配路由
- 第25-2学时 按钮级权限
- 第25-3学时 按钮级权限，自定义指令处理

### 第15节 缓存、性能、优化

- 第26学时 组件缓存keep-alive、接口优化避免资源浪费
- 第26-1学时 BUG修复、监听路由变化、环境变量参数配置
- 第26-2学时 404页面
- 第26-3学时 404页面问题修复，退出接口联调
- 第27学时 BUG修复过程、优先级排序、项目流程阶段、一些啰嗦的话语

### 第16节 部署项目，nginx配置

- 第28学时 ECS云服务器购买、了解服务器的基础结构、nginx安装、端口配置、防火墙
- 第28-1学时 nginx配置、多项目部署、单项目部署、iptables安装配置
- 第28-2学时 nginx配置、日志查看，proxy_pass指向配置、调通接口数据、域名解析访问项目

### 第17节 课程收尾、后续课程

- 第29学时 VUE3.0后台系统开发结束语、后续学习的系列课程



### 完成录制的课程

- 0基础入门HTML5+CSS3 https://www.bilibili.com/video/BV12741127Fw
- VUE3.0体验版API，实战大公司级管理后台开发 https://www.bilibili.com/video/BV1zJ411g7Fx

### 正在录制的课程

- javascript入门、初级、中级 https://www.bilibili.com/video/BV11p4y1C7K9
- VUE3.0重制VUE2.0版本
- 原生HTML5+CSS3响应式
- React 公司级小型人事管理系统

### 了解更多

- ***关注手把手撸码前端官网：http://www.web-jshtml.cn***

## 交流

***扫码关注我的个人微信公众号，分享更多原创文章。点击交流学习加我微信、qq群。一起学习，一起进步***

![wx](http://www.web-jshtml.cn/public/images/wechat.png)

---

欢迎加入：

手把手撸码前端群：680499707 

