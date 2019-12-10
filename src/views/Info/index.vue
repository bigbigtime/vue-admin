<template>
    <div>
        <el-row :gutter="14">
            <el-col :span="4">
                <div class="label-wrap category">
                    <label for="">类型：</label>
                    <div class="warp-content">
                        <el-select v-model="category_value" placeholder="请选择" style="width: 100%;">
                            <el-option
                                v-for="item in options"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
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
                        <el-select v-model="search_key" style="width: 100%;">
                            <el-option 
                            v-for="item in search_option" 
                            :key="item.value"
                            :value="item.value"
                            :label="item.label"
                            ></el-option>
                        </el-select>
                    </div>
                </div>
            </el-col>
            <el-col :span="3">
                <el-input v-model="search_keyWork" placeholder="请输入内容" style="width: 100%;"></el-input>
            </el-col>
            <el-col :span="2">
                <el-button type="danger" style="width: 100%;">搜索</el-button>
            </el-col>
            <el-col :span="3">&nbsp;</el-col>
            <el-col :span="2">
                <el-button type="danger" class="pull-right" style="width: 100%;" @click="dialog_info = true">新增</el-button>
            </el-col>
        </el-row>

        <!-- 表格数据 -->
        <div class="black-space-30"></div>
        <el-table :data="table_data" border style="width: 100%">
            <el-table-column type="selection" width="45"></el-table-column>
            <el-table-column prop="title" label="标题" width="830"></el-table-column>
            <el-table-column prop="category" label="类型" width="130"></el-table-column>
            <el-table-column prop="date" label="日期" width="237"></el-table-column>
            <el-table-column prop="user" label="管理员" width="115"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button type="danger" size="mini" @click="deleteItem">删除</el-button>
                    <el-button type="success" size="mini" @click="dialog_info = true">编辑</el-button>
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
                    :total="1000"
                >
                </el-pagination>
            </el-col>
        </el-row>
        <!--新增弹窗-->
        <DialogInfo :flag.sync="dialog_info" />
    </div>
</template>
<script>
import DialogInfo from "./dialog/info";
import { global } from "@/utils/global_V3.0"
import { reactive, ref, watch, onMounted } from '@vue/composition-api';
export default {
    name: 'infoIndex',
    components: { DialogInfo },
    setup(props, { root }) {
        const { str: aaa, confirm: cAAA } = global();
        /**
         * 数据
         */
        const dialog_info = ref(false);  // true、false
        const search_key = ref('id');
        const category_value = ref('');
        const date_value = ref('');
        const search_keyWork = ref('');

        const options = reactive([{
          value: 1,
          label: '国际信息'
        }, {
          value: 2,
          label: '国内信息'
        }, {
          value: 3,
          label: '行业信息'
        }]);
        // 搜索关键字
        const search_option = reactive([
            { value: "id", label: "ID"},
            { value: "title", label: "标题"},
        ])
        // 表格数据
        const table_data = reactive([
            {
                title: '纽约市长白思豪宣布退出总统竞选 特朗普发推回应',
                category: '国内信息',
                date: '2019-09-10 19:31:31',
                user: '管理员'
            },
            {
                title: '习近平在中央政协工作会议暨庆祝中国人民政治协商会议成立70周年大会上发表重要讲话',
                category: '国内信息',
                date: '2019-09-10 19:31:31',
                user: '管理员'
            },
            {
                title: '基里巴斯与台当局"断交" 系蔡当局上台后断交第7国',
                category: '国内信息',
                date: '2019-09-10 19:31:31',
                user: '管理员'
            },
            {
                title: '不选了！纽约市长白思豪宣布退出2020美国大选',
                category: '国内信息',
                date: '2019-09-10 19:31:31',
                user: '管理员'
            }
        ])
        /**
         * vue2.0 methods
         */
        const handleSizeChange = (val) => {
            console.log(val)
        }
        const handleCurrentChange = (val) => {
            console.log(val)
        }
        const deleteItem = () => {
            cAAA({
                content: "确认删除当前信息，确认后将无法恢复！！",
                tip: "警告",
                fn: confirmDelete,
                id: '22222'
            })
        }
        const deleteAll = () => {
            cAAA({
                content: "确认删除选择的数据，确认后将无法恢复！",
                tip: "警告",
                fn: confirmDelete,
                id: '1111'
            })
        }
      
        const confirmDelete = (value) => {
            console.log(value)
        }

        return {
            // ref
            date_value, search_key, search_keyWork, dialog_info, category_value,
            // reactive
            table_data, options, search_option,
            // vue2.0 methdos
            handleSizeChange, handleCurrentChange, deleteItem, deleteAll
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