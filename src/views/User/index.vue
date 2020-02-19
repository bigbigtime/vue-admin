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
    </div>
</template>
<script>
import { reactive, ref, watch, onMounted } from '@vue/composition-api';
// 组件
import SelectVue from "@c/Select";
export default {
    name: 'userIndex',
    components: { SelectVue },
    setup(props) {
        const data = reactive({
            configOption: ["name", "phone"],
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