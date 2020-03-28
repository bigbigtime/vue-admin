<template>
  <div>
    <el-table :data="data.tableData" border style="width: 100%" @selection-change="thatSelectCheckbox">
      <!--多选框-->
      <el-table-column v-if="data.tableConfig.selection" type="selection" width="55"></el-table-column>
      <template v-for="item in data.tableConfig.tHead">
        <!--v-slot-->
        <el-table-column
          :key="item.field"
          :prop="item.field"
          :label="item.label"
          :width="item.width"
          v-if="item.columnType === 'slot'"
        >
          <template slot-scope="scope">
            <slot :name="item.slotName" :data="scope.row"></slot>
          </template>
        </el-table-column>
        <!--文本数据渲染-->
        <el-table-column
          :key="item.field"
          :prop="item.field"
          :label="item.label"
          :width="item.width"
          v-else
        ></el-table-column>
      </template>
    </el-table>
    <div class="table-footer">
        <el-row>
            <el-col :span="4">
                <slot name="tableFooterLeft"></slot>
            </el-col>
            <el-col :span="20">
                <el-pagination
                    class="pull-right"
                    v-if="data.tableConfig.paginationShow"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageData.currentPage"
                    :page-sizes="pageData.pageSizes"
                    :page-size="pageData.pageSize"
                    :layout="data.tableConfig.paginationLayout"
                    :total="pageData.total"
                    background
                ></el-pagination>
            </el-col>
        </el-row>
    </div>
    
  </div>
</template>
<script>
import { reactive, onBeforeMount, onMounted, watch } from '@vue/composition-api';
import { loadData } from "./tableLoadData";
import { paginationHook } from "./paginationHook"
export default {
    name: "tableVue",
    props: {
        config: {
            type: Object,
            default: () => {}
        },
        tableRow: {
            type: Object,
            default: () => {}
        }
    },
    setup(props, { root, emit }){
        // 加载数据
        const { tableData, tableLoadData } = loadData({ root });
        // 页码
        const { pageData, handleSizeChange, handleCurrentChange, totalCount } = paginationHook();
        // 组件变量
        const data = reactive({
            tableConfig: {
                selection: true,
                recordCheckbox: false,
                requestData: {},
                tHead: [],
                paginationLayout: "total, sizes, prev, pager, next, jumper",
                paginationShow: true
            },
            tableData: []
        });
        /**
         * vue3.0 业务逻辑的折分及组合，还有复用性
         */
        // 数据渲染
        watch([
            () => tableData.item,
            () => tableData.total
        ], ([tableData, total]) => {
            data.tableData = tableData;
            totalCount(total);
        });
        // 页码监听
        watch([
            () => pageData.currentPage,
            () => pageData.pageSize
        ], ([currentPage, pageSize]) => {
            let requestData = data.tableConfig.requestData;
            if(requestData.data) {
                requestData.data.pageNumber = currentPage;
                requestData.data.pageSize = pageSize;
                tableLoadData(data.tableConfig.requestData);
            }
        })
        /**
         * 方法 mehtods
         */
        // 初始化table配置项 // const声明对象或 数组
        // 匹配相同的key，如果存在，则替换
        const initTableConfig = () => {
            let configData = props.config;
            let keys = Object.keys(data.tableConfig);
            for(let key in configData) {
                if(keys.includes(key)){  //  ["selection", "recordCheckbox", "requestUrl", "tHead"].includes("selection")
                    data.tableConfig[key] = configData[key];
                }
            }
        }
        // 勾选checkbox时触发
        const thatSelectCheckbox = (val) => {
            let rowData = {
                idItem: val.map(item => item.id)
            }
            emit("update:tableRow", rowData);
        }
        // 刷新数据
        const refreshData = () => {
            tableLoadData(data.tableConfig.requestData);
        }
        // 带参数刷新数据
        const paramsLoadData = (params) => {
            let requestData = Object.assign({}, params, {
                pageNumber: 1,
                pageSize: 10
            })
            data.tableConfig.requestData.data = requestData
            tableLoadData(data.tableConfig.requestData);
        }

        onBeforeMount(() => {
            initTableConfig();
            tableLoadData(data.tableConfig.requestData);
        })

        return {
            data, pageData, 
            handleSizeChange, handleCurrentChange, thatSelectCheckbox, refreshData, paramsLoadData
        }
    }
}
</script>
<style lang="scss" scoped>
.table-footer { padding: 15px 0; }
</style>

<!--
初始化的数据，不需要监听，
可以在挂载之前预先处理。
-->

<!--
v-slot插槽：父组件传内容到子组件显示
1、匿名插槽：没有指定某一个插槽，全部都显示
2、具名插槽：指定插槽显示内容
3、作用域插槽：可以进行数据绑定，父子组件通讯
-->