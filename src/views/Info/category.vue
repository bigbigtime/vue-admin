<template>
    <div id="category">
        <el-button type="danger" @click="addFirst">添加一级分类</el-button>
        <hr class="hr-e9e9e9" />
        <div>
            <el-row :gutter="30">
                <el-col :span="8">
                    <div class="category-wrap">
                        <div class="category" v-for="firstItem in category.item" :key="firstItem.id">
                            <h4>
                                <svg-icon icon-class="plus"></svg-icon>
                                {{ firstItem.category_name}}
                                <div class="button-group">
                                    <el-button size="mini" type="danger" round>编辑</el-button>
                                    <el-button size="mini" type="success" round>添加子级</el-button>
                                    <el-button size="mini" round>删除</el-button>
                                </div>
                            </h4>
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
                            <el-input v-model="form.categoryName"></el-input>
                        </el-form-item>
                        <el-form-item label="二级分类名称：" prop="secCategoryName" v-if="category_children_input">
                            <el-input v-model="form.secCategoryName"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="danger" @click="submit" :loading="submit_button_loading">确定</el-button>
                        </el-form-item>
                    </el-form>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
import { AddFristCategory, GetCategory } from "@/api/news";
import { reactive, ref, onMounted } from "@vue/composition-api";
export default {
    name: 'category',
    setup(props, { root, refs }) {
        /**
         * reactive
         */
        const form = reactive({
          categoryName: '',
          secCategoryName: ''
        })
        const category = reactive({
            item: []
        })
        // ref
        const submit_button_loading = ref(false);
        const category_first_input = ref(true);
        const category_children_input = ref(true);

        /**
         * methods v2.0
         */
        const submit = () => {
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
        const addFirst = () => {
            category_first_input.value = true
            category_children_input.value = false
        }
        const getCategory = () => {
            GetCategory({}).then(response => {
                let data = response.data.data.data
                category.item = data
            }).catch(error => {

            })
        }
        /**
         * 生命周期
         */
        // 挂载完成时执行，（页面DOM元素完成时，实例完成）
        onMounted(() => {
            getCategory()
        })

        return  {
            // ref
            category_first_input, category_children_input, submit_button_loading,
            // reactive
            form, category,
            // methods
            submit, addFirst
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