<template>
    <div id="category">
        <el-button type="danger" @click="addFirst({type: 'category_first_add'})">添加一级分类</el-button>
        <hr class="hr-e9e9e9" />
        <div>
            <el-row :gutter="30">
                <el-col :span="8">
                    <div class="category-wrap">
                        <div class="category" v-for="firstItem in category.item" :key="firstItem.id">
                            <!--一级分类-->
                            <h4>
                                <svg-icon icon-class="plus"></svg-icon>
                                {{ firstItem.category_name }}
                                <div class="button-group">
                                    <el-button size="mini" type="danger" @click="editCategory({ data: firstItem, type: 'category_first_edit' })" round>编辑</el-button>
                                    <el-button size="mini" type="success" round @click="handlerAddChildren({ data: firstItem, type: 'category_children_add' })">添加子级</el-button>
                                    <el-button size="mini" round @click="deleteCategoryComfirm(firstItem.id)">删除</el-button>
                                </div>
                            </h4>
                            <!--子级分类-->
                            <ul v-if="firstItem.children">
                                <li v-for="childrenItem in firstItem.children" :key="childrenItem.id">
                                    {{ childrenItem.category_name}}
                                    <div class="button-group">
                                        <el-button size="mini" type="danger" round>编辑</el-button>
                                        <el-button size="mini" round>删除</el-button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </el-col>
                <el-col :span="16">
                    <h4 class="menu-title">一级分类编辑</h4>
                    <el-form label-width="142px" class="from-wrap" ref="categoryFrom">
                        <el-form-item label="一级分类名称：" prop="categoryName" v-if="category_first_input">
                            <el-input v-model="form.categoryName" :disabled="category_first_disabled"></el-input>
                        </el-form-item>
                        <el-form-item label="二级分类名称：" prop="secCategoryName" v-if="category_children_input">
                            <el-input v-model="form.secCategoryName" :disabled="category_children_disabled"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" @click="submit" :loading="submit_button_loading" :disabled="submit_button_disabled">确定</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import { AddFristCategory, GetCategory, DeleteCategory, EditCategory, AddChildrenCategory } from "@/api/news";
import { reactive, ref, onMounted, watch } from "@vue/composition-api";
import { global } from "@/utils/global_V3.0";
import { common } from "@/api/common";
export default {
    name: 'category',
    setup(props, { root, refs }) {
        // global
        const { confirm } = global();
        const { getInfoCategory, getInfoCategoryAll, categoryItem } = common();
        /**
         * reactive
         */
        const form = reactive({
          categoryName: '',
          secCategoryName: ''
        })
        const category = reactive({
            item: [],
            current: []
        })
        // ref
        const subit_button_type = ref('');
        const submit_button_loading = ref(false);
        const category_first_input = ref(true);
        const category_children_input = ref(true);
        const category_first_disabled = ref(true);
        const category_children_disabled = ref(true);
        const submit_button_disabled = ref(true);
        const deleteId = ref('');

        /**
         * methods v2.0
         */
        const submit = () => {
            if(subit_button_type.value == 'category_first_add') { addFirstCategory(); }
            if(subit_button_type.value == 'category_first_edit') { editFirstCategory(); }
            if(subit_button_type.value == 'category_children_add') { addChildrenCategory(); }
            
        }
        const addFirstCategory = () => {
            if(!form.categoryName) {
                root.$message({
                    message: "分类名称不能为空",
                    type: "error"
                })
                return false;
            }
            // 按钮加载状态
            submit_button_loading.value = true
            AddFristCategory({ categoryName: form.categoryName }).then(response => {
                let data = response.data
                if(data.resCode === 0) {
                    root.$message({
                        message: data.message,
                        type: "success"
                    });
                    /**
                     * 两种处理方法
                     * 1、请求接获取分类接口（缺点：浪费资源）
                     * 2、直接push，请求接口后返回的数据
                     */
                    category.item.push(response.data.data)
                    // 数组的方法，添加数组末尾
                }
                submit_button_loading.value = false
                form.categoryName = ''
                form.secCategoryName = ''
            }).catch(error => {
                submit_button_loading.value = false
                form.categoryName = ''
                form.secCategoryName = ''
            })
        }
        const addFirst = (params) => {
            subit_button_type.value = params.type
            category_first_input.value = true
            category_children_input.value = false
            category_first_disabled.value = false
            submit_button_disabled.value = false
            // 按alt + 左右方向键，可以返回光标上次，或下次的位置
        }
        const handlerAddChildren = (params) => {
            // 更新确定按钮类型
            subit_button_type.value = params.type
            // 存储数据
            category.current = params.data
            // 禁用一级输入框
            category_first_disabled.value = true
            // 启用确定按钮
            submit_button_disabled.value = false
            // 启用子级输入框
            category_children_disabled.value = false
            // 显示子级输入框
            category_children_input.value = true
            // 显示一级分类文本
            form.categoryName = params.data.category_name
        }
        const addChildrenCategory = () => {
            if(!form.secCategoryName) {
                root.$message({
                    message: "子级分类名称不能为空！！",
                    type: "error"
                })
                return false;
            }
            let requestData = {
                categoryName: form.secCategoryName,
                parentId: category.current.id
            }
            AddChildrenCategory(requestData).then(response => {
                let responseData = response.data;
                root.$message({
                    message: responseData.message,
                    type: "success"
                })
                // 调用分类列表接口
                getInfoCategoryAll()
                // 清空子级输入框内容
                form.secCategoryName = "";
            })
        }
        // 删除
        const deleteCategoryComfirm = (categoryID) => {
            deleteId.value = categoryID;
            confirm({
                content: "确认删除当前信息，确认后将无法恢复！！",
                tip: "警告",
                fn: deleteCategory,
                catchFn: () => {
                    deleteId.value = '';
                }
            })
        }
        const deleteCategory = () => {
            DeleteCategory({ categoryId: deleteId.value }).then(response => {
                // 操作数组 
                /**
                 * 两个参数的时候是删除，三个参数是替换\插入
                 * splice(指定起始位置, 数据的数量, 新数据)
                 * splice(1, 2, {})
                 * [
                 * {id: "132", category_name: "sdf df "},
                 * {}
                 * ]
                 */
                /**
                 * es6 findIndex
                 * filter
                 */
                // let index = category.item.findIndex(item => item.id == deleteId.value);
                // // 删除数组指定元素
                // category.item.splice(index, 1);
                let newData = category.item.filter(item => item.id != deleteId.value);
                category.item = newData;
            }).catch(error => {

            })
        }
        // 修改
        const editCategory = (params) => {
            subit_button_type.value = params.type
            category_children_input.value = false
            category_first_disabled.value = false
            submit_button_disabled.value = false
            // 一级名称输入还原名称
            form.categoryName = params.data.category_name
            // 储存当前数据对象
            category.current = params.data
        }
        const editFirstCategory = () => {
            if(category.current.length == 0) {
                root.$message({
                    message: "未选择分类！！",
                    type: "error"
                })
                return false
            }
            let requestData = {
                id: category.current.id,
                categoryName: form.categoryName
            }
            EditCategory(requestData).then(response => {
                let responseData = response.data
                root.$message({
                    message: responseData.message,
                    type: "success"
                })
                category.current.category_name = responseData.data.data.categoryName;
                // 清空输入框
                form.categoryName = '';
                category.current = [];
            })
        }
        /**
         * 生命周期
         */
        // 挂载完成时执行，（页面DOM元素完成时，实例完成）
        onMounted(() => {
            getInfoCategoryAll()
        })
        /**
         * watch
         */
        watch(() => categoryItem.item, (value) => {
            category.item = value
        })

        return  {
            // ref
            category_first_input, category_children_input, submit_button_loading, category_first_disabled, category_children_disabled, submit_button_disabled,
            // reactive
            form, category,
            // methods
            submit, addFirst, deleteCategory, deleteCategoryComfirm, editCategory, handlerAddChildren, addChildrenCategory
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../../styles/config.scss";
.category-wrap {
    div:first-child {
        &:before { top: 20px; }
    }
    div:last-child {
        &:before { bottom: 21px; }
    }
}
.menu-title {
    line-height: 44px;
    padding-left: 22px;
    background-color: #f3f3f3;
}
.category {
    position: relative;
    line-height: 44px;
    cursor: pointer;
    &:before {
        content: '';
        position: absolute;
        left: 22px;
        top: 0;
        bottom: 0;
        width: 32px;
        border-left: 1px dotted #000;
    }
    h4 {
        position: relative;
        padding-left: 40px;
    }
    svg {
        position: absolute;
        left: 14px;
        top: 15px;
        background-color: #fff;
        font-size: 17px;
    }
    li {
        position: relative;
        padding-left: 36px;
        margin-left: 24px;
        &:before {
            content: '';
            position: absolute;
            left: 0;
            top: 22px;
            width: 32px;
            border-bottom: 1px dotted #000;
        }
    }
    li, h4 {
        @include webkit(transition, all .5s ease 0s);
        &:hover {
            background-color: #f3f3f3;
            .button-group { display: block; }
        }
    }
}
.button-group {
    display: none;
    position: absolute;
    z-index: 2;
    right: 11px;
    top: -1px;
    button { font-size: 12px; }
}
.from-wrap {
    width: 410px;
    padding-top: 26px;
}
.hr-e9e9e9 {
    width: calc(100% + 60px);
    margin-left: -30px;
    border: none;
    margin-top: 30px;
    margin-bottom: 30px;
    border-bottom: 1px solid #e9e9e9;
}
</style>