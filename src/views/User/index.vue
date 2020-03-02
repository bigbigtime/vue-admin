<template>
    <div>
        <el-row>
            <el-col :span="20">
                <div class="label-wrap">
                    <label>关键字：</label>
                    <div class="warp-content">
                        <el-row :gutter="16">
                            <el-col :span="3">
                                <SelectVue :config="data.configOption" />
                            </el-col>
                            <el-col :span="5">
                                <el-input placeholder="请输入搜索的关键字"></el-input>
                            </el-col>
                            <el-col :span="15">
                                <el-button type="danger">搜索</el-button>
                            </el-col>
                        </el-row>
                    </div>
                </div>
            </el-col>
            <el-col :span="4">
                <el-button type="danger" class="pull-right">添加用户</el-button>
            </el-col>
        </el-row>
        <div class="black-space-30"></div>
        <TableVue :config="data.configTable">
            <template v-slot:status="slotData">
                <el-switch v-model="slotData.data.name" active-color="#13ce66" inactive-color="#ff4949"></el-switch>
            </template>
            <template v-slot:operation="slotData">
                <el-button size="small" type="danger" @click="operation(slotData.data)">删除</el-button>
                <el-button size="small" type="success" @click="operation(slotData.data)">编辑</el-button>
            </template>
        </TableVue>
    </div>
</template>
<script>
import { reactive, ref, watch, onMounted } from '@vue/composition-api';
// 组件
import SelectVue from "@c/Select";
import TableVue from "@c/Table";
export default {
    name: 'userIndex',
    components: { SelectVue, TableVue },
    setup(props) {
        const data = reactive({
            configOption: {
                init: ["name", "phone"]
            },
            // table组件配置参数
            configTable: {
                // 多选框
                selection: false,
                // 表头
                tHead: [
                    { 
                        label: "邮箱/用户名",
                        field: "title",
                        width: 200
                    },
                    { 
                        label: "真实姓名",
                        field: "name",
                        width: 120
                    },
                    { 
                        label: "手机号",
                        field: "phone"
                    },
                    { 
                        label: "地区",
                        field: "address"
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

        /**
         * methods
         */
        let operation = (params) => {
            console.log(params);
        }

        return {
            data, 
            operation
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