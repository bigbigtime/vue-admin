<template>
    <div>
        <el-row>
            <el-col :span="20">
                <div class="label-wrap">
                    <label>关键字：</label>
                    <div class="warp-content">
                        <el-row :gutter="16">
                            <el-col :span="3">
                                <SelectVue :config="data.configOption" :selectData.sync="data.selectData" />
                            </el-col>
                            <el-col :span="5">
                                <el-input v-model="data.key_word" placeholder="请输入搜索的关键字"></el-input>
                            </el-col>
                            <el-col :span="15">
                                <el-button type="danger" @click="search">搜索</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
            <el-col :span="4">
                <el-button type="danger" class="pull-right" @click="handlerAdd">添加用户</el-button>
            </el-col>
        </el-row>
        <div class="black-space-30"></div>
        <TableVue ref="userTable" :config="data.configTable" :tableRow.sync="data.tableRow">
            <!--插槽-->
            <template v-slot:status="slotData">
                <el-switch @change="handlerSwitch(slotData.data)" v-model="slotData.data.status" active-value="2"  inactive-value="1" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </template>
            <template v-slot:operation="slotData">
                <el-button size="small" type="danger" @click="handlerDel(slotData.data)">删除</el-button>
                <el-button size="small" type="success" @click="handlerEdit(slotData.data)">编辑</el-button>
            </template>
            <template v-slot:tableFooterLeft>
                <el-button size="small" @click="handlerBatchDel()">批量删除</el-button>
            </template>
            <!--插槽-->
        </TableVue>
        <!--子组件-->
        <DialogAdd :flag.sync="data.dialog_add" :editData="data.editData" @refreshTabelData="refreshData" />
    </div>
</template>
<script>
import { reactive, ref, watch, onMounted, provide } from '@vue/composition-api';
import { UserDel, UserActives } from "@/api/user";
// 组件
import SelectVue from "@c/Select";
import TableVue from "@c/Table";
import DialogAdd from "./dialog/add";
// 3.0抽离的方法
import { global } from "@/utils/global_V3.0";
export default {
    name: 'userIndex',
    components: { SelectVue, TableVue, DialogAdd },
    setup(props, { root, refs }) {
        const { confirm } = global();
        const userTable = ref(null);
        const data = reactive({
            // table选择的数据
            tableRow: {},
            cityPickerData: {},
            dialog_add: false,
            dialog_edit: false,
            editData: {},
            configOption: {
                init: ["truename", "phone"]
            },
            // 下接菜单的数据
            selectData: {},
            // 搜索关键字
            key_word: "",
            // 阻止状态
            updateUserStatusFlag: false,
            // table组件配置参数
            configTable: {
                // 表头
                tHead: [
                    { 
                        label: "邮箱/用户名",
                        field: "username",
                        width: 200
                    },
                    { 
                        label: "真实姓名",
                        field: "truename",
                        width: 120
                    },
                    { 
                        label: "手机号",
                        field: "phone"
                    },
                    { 
                        label: "地区",
                        field: "region"
                    },
                    { 
                        label: "角色",
                        field: "role"
                    },
                    { 
                        label: "禁启用状态",
                        field: "status",
                        columnType: "slot",
                        slotName: "status"
                    },
                    { 
                        label: "操作",
                        columnType: "slot",
                        slotName: "operation"
                    }
                ],
                // 请求接口URL
                requestData: {
                    url: "getUserList",
                    data: {
                        pageNumber: 1,
                        pageSize: 10
                    }
                }
            }
        });

        const search = () => {
            console.log(data.selectData.value)
            let requesttData = {
                [data.selectData.value] : data.key_word
            }
            refs.userTable.paramsLoadData(requesttData);
        }

        const handlerBatchDel = () => {
            let userId = data.tableRow.idItem
            if(!userId || userId.length === 0) {
                root.$message({
                    message: "请勾选需要删除的用户！！",
                    type: "error"
                })
                return false;
            }
            confirm({
                content: "确认删除当前信息，确认后将无法恢复！！",
                tip: "警告",
                fn: userDelete
            })
            
        }
        // 删除用户
        const userDelete = () => {
            UserDel({ id: data.tableRow.idItem }).then(response => {
                // 其中一种写法
                // refs.userTable.refreshData()
                // 第二种写法
                refreshData()
            })
        }

        const refreshData = () => {
            userTable.value.refreshData()
        }

        /**
         * methods
         */
        const handlerDel = (params) => {
            data.tableRow.idItem = [params.id]
            confirm({
                content: "确认删除当前信息，确认后将无法恢复！！",
                tip: "警告",
                fn: userDelete
            })
        }

        /**
         * 添加用户
         */
        const handlerAdd = () => {
            data.dialog_add = true;
            // 子组件赋值
            data.editData = Object.assign({});
        }

        /**
         * 编辑
         */
        const handlerEdit = (params) => {
            data.dialog_add = true;
            // 子组件赋值
            data.editData = Object.assign({}, params);
        }

        /**
         * 修改用户状态
         */
        const handlerSwitch = (params) => {
            if(data.updateUserStatusFlag) { return false }
            data.updateUserStatusFlag = true
            UserActives({ id: params.id, status: params.status }).then(response => {
                root.$message({
                    message: response.data.message,
                    type: "success"
                })
                data.updateUserStatusFlag = !data.updateUserStatusFlag
            }).catch(error => {
                data.updateUserStatusFlag = !data.updateUserStatusFlag
            })
        }

        onMounted(() => {})

        return {
            data,
            handlerDel,
            handlerBatchDel, userTable, refreshData, handlerSwitch, handlerEdit, handlerAdd, search
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";
.label-wrap {
    @include labelDom(left, 60, 40);
}
</style>