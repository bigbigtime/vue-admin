<template>
    <div>
        <el-row :gutter="14">
            <el-col :span="4">
                <div class="label-wrap category">
                    <label for="">分类：</label>
                    <div class="warp-content">
                        <el-select v-model="category_value" placeholder="请选择" style="width: 100%;">
                            <el-option
                                v-for="item in options.category"
                                :key="item.id"
                                :label="item.category_name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>
            <el-col :span="7">
                <div class="label-wrap date">
                    <label for="">日期：&nbsp;&nbsp;</label>
                    <div class="warp-content">
                        <el-date-picker
                            style="width: 100%;"
                            v-model="date_value"
                            type="datetimerange"
                            format="yyyy 年 MM 月 dd 日"
                            value-format="yyyy-MM-dd HH:mm:ss"
                            align="right"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :default-time="['12:00:00', '08:00:00']">
                        </el-date-picker>
                    </div>
                </div>
            </el-col>
            <el-col :span="3">
                <div class="label-wrap key-work">
                    <label for="">关键字：&nbsp;&nbsp;</label>
                    <div class="warp-content">
                        <SelectVue :config="data.configOption"/>
                    </div>
                </div>
            </el-col>
            <el-col :span="3">
                <el-input v-model="search_keyWork" placeholder="请输入内容" style="width: 100%;"></el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="danger" style="width: 100%;" @click="getList">搜索</el-button>
            </el-col>
            <el-col :span="3">&nbsp;</el-col>
            <el-col :span="2">
                <el-button type="danger" class="pull-right" style="width: 100%;" @click="dialog_info = true"  v-if="btnPerm('info:add')">新增</el-button>
            </el-col>
        </el-row>
        <!-- 表格数据 -->
        <div class="black-space-30"></div>
        <el-table :data="table_data.item" border v-loading="loadingData" @selection-change="handleSelectionChange" style="width: 100%">
            <el-table-column type="selection" width="45"></el-table-column>
            <el-table-column prop="title" label="标题" width="750"></el-table-column>
            <el-table-column prop="categoryId" label="类型" width="130" :formatter="toCategory"></el-table-column>
            <el-table-column prop="createDate" label="日期" width="237" :formatter="toData"></el-table-column>
            <el-table-column prop="user" label="管理员" width="115"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" v-btnPerm="'info:del'" class="hiden-button">自定义指令测试</el-button>
                    <el-button type="danger" size="mini" @click="deleteItem(scope.row.id)" v-btnPerm="'info:del'" class="hiden-button">删除</el-button>
                    <el-button type="success" size="mini" @click="editInfo(scope.row.id)" v-btnPerm="'info:edit'" class="hiden-button">编辑</el-button>
                    <el-button type="success" size="mini" @click="detailed(scope.row)" v-btnPerm="'info:detailed'" class="hiden-button">编辑详情</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="black-space-30"></div>
        <!--底部分页-->
        <el-row>
            <el-col :span="12">
                <el-button size="medium" @click="deleteAll">批量删除</el-button>
            </el-col>
            <el-col :span="12">
                <el-pagination
                    class="pull-right"
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :page-sizes="[10, 20, 50, 100]"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                >
                </el-pagination>
            </el-col>
        </el-row>
        <!--新增弹窗-->
        <DialogInfo :flag.sync="dialog_info" :category="options.category" @getListEmit="getList" />
        <!--修必弹窗-->
        <DialogEditInfo :flag.sync="dialog_info_edit" :id="infoId" :category="options.category" @getListEmit="getList" />
    </div>
</template>
<script>
import { GetCategory, GetList, DeleteInfo } from "@/api/news";
import DialogInfo from "./dialog/info";
import DialogEditInfo from "./dialog/edit";
import { global } from "@/utils/global_V3.0";
import { reactive, ref, watch, onMounted, onActivated } from '@vue/composition-api';
import { timestampToTime } from "@/utils/common";
// 组件
import SelectVue from "@c/Select";
export default {
    name: 'infoIndex',
    components: { DialogInfo, DialogEditInfo, SelectVue },
    setup(props, { root }) {
        const { str: aaa, confirm } = global();
        /**
         * 数据
         */
        const data = reactive({
            configOption: {
                init: ["id", "title"]
            },
        });
        const dialog_info = ref(false);  // true、false
        const dialog_info_edit = ref(false);  // true、false
        const search_key = ref('id');
        const category_value = ref('');
        const date_value = ref('');
        const search_keyWork = ref('');
        const total = ref(0);
        const deleteInfoId = ref('');
        const infoId = ref("");
        // loading
        const loadingData = ref(false);

        const options = reactive({
            category: []
        });
        // 搜索关键字
        const search_option = reactive([
            { value: "id", label: "ID"},
            { value: "title", label: "标题"},
        ])
        // 页码
        const page = reactive({
            pageNumber: 1,
            pageSize: 10
        })
        // 表格数据
        const table_data = reactive({
            item: []
        })
        /**
         * vue2.0 methods
         */
        const handleSizeChange = (val) => {
            page.pageSize = val
        }
        const handleCurrentChange = (val) => {
            page.pageNumber = val
            getList()
        }
        /**
         * 搜索条件处理
         */
        const formatData = () => {
            let requestData = {
                pageNumber: page.pageNumber,
                pageSize: page.pageSize
            };
            // 分类ID
            if(category_value.value) { requestData.categoryId = category_value.value }
            // 日期
            if(date_value.value.length > 0) {
                requestData.startTiem = date_value.value[0]
                requestData.endTime = date_value.value[1]
            }
            // 关键字
            if(search_keyWork.value) { requestData[search_key.value] = search_keyWork.value; }
            return requestData;
        }

        const editInfo = (id) => {
            infoId.value = id;
            dialog_info_edit.value = true;
        }

        /**
         * 详情页
         */
        const detailed = (data) => {
            // 预先存值
            // root.$store.commit("infoDetailed/SET_ID", data.id);
            // root.$store.commit("infoDetailed/SET_TITLE", data.title);
            root.$store.commit("infoDetailed/UPDATE_STATE_VALUE", {
                id: {
                    value: data.id,
                    sessionKey: "infoId",
                    session: true
                },
                title: {
                    value: data.title,
                    sessionKey: "infoTitle",
                    session: true
                }
            });
            // 跳转页面
            root.$router.push({
                name: "InfoDetailed",
                params: {
                    id: data.id, 
                    title: data.title
                }
            })
        }
        
        const getList = () => {
            // 单独处理数据
            let requestData = formatData();
            // 加载状态
            loadingData.value = true;
            GetList(requestData).then(response => {
                let data = response.data.data
                // 更新数据
                table_data.item = data.data
                // 页面统计数据
                total.value = data.total
                // 加载状态
                loadingData.value = false;
            }).catch(error => {
                loadingData.value = false;
            })
        }
        /**
         * 删除数据
         */
        const deleteItem = (id) => {
            deleteInfoId.value = [id];
            confirm({
                content: "确认删除当前信息，确认后将无法恢复！！",
                tip: "警告",
                fn: confirmDelete
            })
        }
        const deleteAll = () => {
            if(!deleteInfoId.value || deleteInfoId.value.length == 0) {
                root.$message({
                    message: "请选择要删除的数据！！",
                    type: "error"
                })
                return false;
            }
            confirm({
                content: "确认删除选择的数据，确认后将无法恢复！",
                tip: "警告",
                fn: confirmDelete
            })
        }
      
        const confirmDelete = (value) => {
            DeleteInfo({id: deleteInfoId.value}).then(response => {
                deleteInfoId.value = '';
                getList()
            })
        }

        const getInfoCategory = () => {
            root.$store.dispatch('common/getInfoCategory').then(response => {
                options.category = response
            })
        }

        const toData = (row, column, cellValue, index) => {
            return timestampToTime(row.createDate);
        }

        const toCategory = (row) => {
            // 调用一个函数，返回一个新的值，替换原始值
            let categoryId = row.categoryId;
            let categoryData = options.category.filter(item => item.id == categoryId)[0];
            if(!categoryData) { return false; }
            return categoryData.category_name;
        }

        const handleSelectionChange = (val) => {
            let id = val.map(item => item.id);
            deleteInfoId.value = id
        }


        /**
         * 阻塞、BUG导致整个业务流程不能进行，这个BUG，
         * 
         */


        
        /**
         * 生命周期
         */
        onMounted(() => {
            // 获取分类
            getInfoCategory();
            // 获取列表
            getList();
        })

        onActivated(() => {

        })

        return {
            // ref
            date_value, search_key, search_keyWork, dialog_info, category_value, total, loadingData, dialog_info_edit, infoId,
            // reactive
            data, table_data, options, search_option,
            // vue2.0 methdos
            handleSizeChange, handleCurrentChange, deleteItem, deleteAll, toData, toCategory, handleSelectionChange, getList, editInfo, detailed
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";
.label-wrap {
    &.category { @include labelDom(left, 60, 40); }
    &.date { @include labelDom(right, 93, 40); }
    &.key-work { @include labelDom(right, 99, 40); }
}
</style>
<style>
button.hiden-button { display: none; }
button.show-button { display: inline-block; }
</style>