<template>
    <el-select v-model="data.selectValue" placeholder="请选择" @change="select">
        <el-option v-for="item in data.initOption" :key="item.value" :value="item.value" :label="item.label"></el-option>
    </el-select>
</template>
<script>
import { reactive, onMounted } from '@vue/composition-api';
export default {
    name: "",
    props: {
        config: {
            type: Object,
            default: () => {}
        },
        selectData: {
            type: Object,
            default: () => {}
        }
    },
    setup(props, { root, emit }){
        const data = reactive({
            selectValue: "",
            initOption: [],
            option: [
                { value: "truename", label: "姓名" },
                { value: "phone", label: "手机号" },
                { value: "email", label: "邮箱" },
                { value: "id", label: "ID" },
                { value: "title", label: "标题" },
            ]
        });

        /**
         * 初始化下拉选择
         */
        const initOption = () => {
            let initData = props.config.init;
            let optionArr = [];
            // 数据检验
            if(initData.length === 0) {
                console.log("config的参数是空的，无法显示下拉菜单；");
                return false;
            }
            initData.forEach(item => {
                let arr = data.option.filter(elem => elem.value == item); // filter匹配成功后是一个数组，需要取下标第一个
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
            data.initOption = optionArr;
            // 初始化搜索类型
            data.selectValue = optionArr[0].value;
            // 返回初始值
            emit("update:selectData", optionArr[0]);
        }

        /**
         * 选择触发
         */
        const select = (val) => {
            let filterData = data.option.filter(item => item.value == val)[0]
            emit("update:selectData", filterData);
        }
        /**
         * 组件挂载完成时
         */
        onMounted(() => {
            initOption()
        })
        return {
            data,
            select
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