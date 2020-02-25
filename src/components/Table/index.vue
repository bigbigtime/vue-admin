<template>
    <el-table :data="data.tableData" border style="width: 100%">
        <!--多选框-->
        <el-table-column v-if="data.tableConfig.selection" type="selection" width="55"></el-table-column>
        <!--文本数据渲染-->
        <el-table-column 
            v-for="item in data.tableConfig.tHead" 
            :key="item.field" 
            :prop="item.field" 
            :label="item.label"
            :width="item.width"
        >
        </el-table-column>
    </el-table>
</template>
<script>
import { reactive, onBeforeMount, onMounted } from '@vue/composition-api';
export default {
    name: "tableVue",
    props: {
        config: {
            type: Object,
            default: () => {}
        }
    },
    setup(props, { root }){
        const data = reactive({
            tableConfig: {
                selection: true,
                recordCheckbox: false,
                tHead: []
            },
            tableData: [
                {
                    email: '2016-05-02',
                    name: '王小虎',
                    phone: 1358888888,
                    address: "广东少",
                    role: "超管"
                },
                {
                    email: '2016-05-02',
                    name: '王小虎',
                    phone: 1358888888,
                    address: "广东少",
                    role: "超管"
                },
            ]
        });

        /**
         * 方法 mehtods
         */
        // 初始化table配置项
        const initTableConfig = () => {
            let configData = props.config;
            for(let key in configData) {
                if(data.tableConfig[key]) {
                    data.tableConfig[key] = configData[key];
                }
            }
        }


        onBeforeMount(() => {
            initTableConfig();
        })

        return {
            data
        }
    }
}
</script>
<style lang="scss" scoped>

</style>