<template>
    <el-select v-model="selectValue" placeholder="请选择">
        <el-option v-for="item in initOptionData" :key="item.value" :value="item.value" :label="item.label"></el-option>
    </el-select>
</template>
<script>
import { reactive, onMounted } from '@vue/composition-api';
export default {
    name: "",
    data(){
        return {
            selectValue: "",
            initOptionData: [],
            option: [
                { value: "name", label: "姓名" },
                { value: "phone", label: "手机号" },
                { value: "email", label: "邮箱" },
                { value: "id", label: "ID" },
                { value: "title", label: "标题" },
            ]
        }
    },
    beforeCreate(){console.log(1111);},
    // watch(){},
    created(){ 
        console.log(2222);
    },
    beforeMount(){ console.log(3333); },
    mounted(){ 
        // 已经被渲染 1次
        console.log(44444);
        this.initOption();
        // 2
    },
    methods: {
        /**
         * 初始化下拉选择
         */
        initOption(){
            let initData = this.config.init;
            let optionArr = [];
            // 数据检验
            if(initData.length === 0) {
                console.log("config的参数是空的，无法显示下拉菜单；");
                return false;
            }
            initData.forEach(item => {
                let arr = this.option.filter(elem => elem.value == item); // filter匹配成功后是一个数组，需要取下标第一个
                if(arr.length > 0) {
                    optionArr.push(arr[0]);
                }
            })
            // 数据检验
            if(optionArr.length === 0) {
                console.log("匹配的数据为空！");
                return false;
            }
            // 初始化赋值
            this.initOptionData = optionArr;
            // 初始化搜索类型
            this.selectValue = optionArr[0].value;
        }
    },
    props: {
        config: {
            type: Object,
            default: () => {}
        }
    },
    watch: {
        config: {
            handler(newValue, oldValue){
                console.log(55555);
                this.initOption();
            },
            immediate: true  // 组件初始化时，马上对config监听。
        }
    }
}
</script>
<style scoped>

</style>
<!--
组件目录位置：sre > components > Select > index.vue;
组件引用方式：import SelectVue from "@c/Select";
template：<SelectVue :config="data.configOption" />

参数配置：
configOption: {
    init: ["name", "phone"]
}
configOption: {
    init: []
    aa: ""
}
init：
    数据类型: Array; 
    可配置的数据："name", "phone", "email", "id", "title"

aa：
    数据类型：String
    可配置的数据：任意字符串
-->