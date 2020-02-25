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
        <TableVue :config="data.configTable" />
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
                // 翻页记录checkbox 
                recordCheckbox: true,
                // 表头
                tHead: [
                    { 
                        label: "邮箱/用户名",
                        field: "email",
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
                    }
                ]
            }
        });

        return {
            data
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